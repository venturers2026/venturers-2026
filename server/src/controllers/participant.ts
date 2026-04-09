import { type Request, type Response } from 'express';
import { MongoServerError } from 'mongodb';
import { Participant } from '../models/Participant';
import { PassTier } from '../types/enums';
import { getNextSequence } from '../utils/nextSequence';

// 1. Define event limits
const EVENT_LIMITS: Record<string, number> = {
    'Wolf of Wall Street': 20, // Stock Market
    'Cric Auction': 24,
    'Shark Tank': 14,
    'Game of Brands': 16,
    'Zero to One': 30,
};

// 2. New endpoint to fetch current availability
export const getEventAvailability = async (req: Request, res: Response) => {
    try {
        const availability: Record<string, { limit: number, registered: number, available: number }> = {};

        for (const [eventName, limit] of Object.entries(EVENT_LIMITS)) {
            const count = await Participant.countDocuments({ eventsApplied: eventName });
            availability[eventName] = {
                limit,
                registered: count,
                available: Math.max(0, limit - count)
            };
        }

        return res.status(200).json(availability);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch event availability' });
    }
};

export const registerParticipant = async (req: Request, res: Response) => {
    const { email, firstName, lastName, institute, phoneNumber, passTier, eventsApplied, billingAmount, paymentSSLink } = req.body;

    try {
        const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
        const normalizedFirstName = typeof firstName === 'string' ? firstName.trim() : '';
        const normalizedLastName = typeof lastName === 'string' ? lastName.trim() : '';
        const normalizedInstitute = typeof institute === 'string' ? institute.trim() : '';
        const normalizedPhoneNumber = typeof phoneNumber === 'string' ? phoneNumber.trim() : '';

        if (!normalizedEmail || !normalizedFirstName || !normalizedLastName || !normalizedInstitute || !normalizedPhoneNumber) {
            return res.status(400).json({ error: 'Missing required registration fields.' });
        }

        if (passTier !== PassTier.Premium && passTier !== PassTier.Customized) {
            return res.status(400).json({ error: 'Invalid pass tier selected.' });
        }

        const normalizedEventsApplied = Array.isArray(eventsApplied)
            ? eventsApplied.map((entry) => String(entry).trim()).filter(Boolean)
            : typeof eventsApplied === 'string'
                ? eventsApplied.split(',').map((entry) => entry.trim()).filter(Boolean)
                : [];

        if (normalizedEventsApplied.length === 0) {
            return res.status(400).json({ error: 'At least one event must be selected.' });
        }

        // 3. CHECK LIMITS BEFORE REGISTERING
        for (const event of normalizedEventsApplied) {
            if (EVENT_LIMITS[event] !== undefined) {
                const count = await Participant.countDocuments({ eventsApplied: event });
                if (count >= EVENT_LIMITS[event]) {
                    return res.status(400).json({ error: `Registrations are closed for "${event}" as it has reached its capacity limit.` });
                }
            }
        }

        const normalizedBillingAmount = Number.parseFloat(String(billingAmount));
        if (!Number.isFinite(normalizedBillingAmount) || normalizedBillingAmount < 0) {
            return res.status(400).json({ error: 'Invalid billing amount.' });
        }

        let normalizedPaymentSSLink = typeof paymentSSLink === 'string' ? paymentSSLink : '';

        if (normalizedBillingAmount > 0 && !normalizedPaymentSSLink) {
            return res.status(400).json({ error: 'Payment screenshot is required for paid passes.' });
        }

        const id = await getNextSequence('Participant');
        const newParticipant = await Participant.create({
            id,
            email: normalizedEmail,
            firstName: normalizedFirstName,
            lastName: normalizedLastName,
            institute: normalizedInstitute,
            phoneNumber: normalizedPhoneNumber,
            passTier,
            eventsApplied: normalizedEventsApplied,
            billingAmount: normalizedBillingAmount,
            paymentSSLink: normalizedPaymentSSLink,
        });

        return res.status(201).json(newParticipant);
    } catch (error) {
        if (error instanceof MongoServerError && error.code === 11000) {
            return res.status(409).json({ error: 'A participant with this email already exists.' });
        }

        if (error instanceof Error) {
            return res.status(500).json({ error: `An error occurred while registering the participant: ${error.message}` });
        } else {
            return res.status(500).json({ error: 'An unknown error occurred while registering the participant.' });
        }
    }
};