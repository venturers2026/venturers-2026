import { type Response } from 'express';
import { Admin } from '../models/Admin';
import { Participant } from '../models/Participant';
import { Permission } from '../types/enums';
import { type AuthRequest } from '../middlewares/auth';

// Required Permission: SHARE_ACCESS
export const getPendingRequests = async (req: AuthRequest, res: Response) => {
    try {
        const pendingAdmins = await Admin.find({ isApproved: false })
            .select('id email permissions isApproved')
            .sort({ id: 1 });
        res.json(pendingAdmins.map((a) => a.toJSON()));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching requests' });
    }
};

// Required Permission: SHARE_ACCESS
export const grantAccess = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const rawAdminId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const adminId = Number.parseInt(rawAdminId ?? '', 10);
        const { permissions } = req.body;

        if (isNaN(adminId)) return res.status(400).json({ error: 'Invalid admin ID' });

        const admin = await Admin.findOne({ id: adminId });
        if (!admin) return res.status(404).json({ error: 'Admin not found' });

        const nextPermissions: Permission[] =
            permissions !== undefined && permissions !== null && Array.isArray(permissions)
                ? permissions.filter((p): p is Permission => Object.values(Permission).includes(p as Permission))
                : admin.permissions;

        const updatedAdmin = await Admin.findOneAndUpdate(
            { id: adminId },
            {
                isApproved: true,
                permissions: nextPermissions,
            },
            { new: true, select: 'id email isApproved permissions' }
        );

        if (!updatedAdmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        res.json({ message: 'Access granted successfully', admin: updatedAdmin.toJSON() });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error granting access' });
    }
};

// Required Permission: VIEW
export const getParticipants = async (req: AuthRequest, res: Response) => {
    try {
        const participants = await Participant.find().sort({ id: 1 });
        res.json(participants.map((p) => p.toJSON()));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching participants' });
    }
};

// Required Permission: MODIFY
export const verifyParticipant = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const rawParticipantId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const participantId = Number.parseInt(rawParticipantId ?? '', 10);
        if (isNaN(participantId)) return res.status(400).json({ error: 'Invalid participant ID' });

        const participant = await Participant.findOne({ id: participantId });
        if (!participant) return res.status(404).json({ error: 'Participant not found' });

        participant.isVerified = !participant.isVerified;
        await participant.save();

        res.json({
            message: 'Participant verification status toggled',
            participant: participant.toJSON()
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error verifying participant' });
    }
};
