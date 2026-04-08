import { Router } from 'express';
import { registerParticipant, getEventAvailability } from '../controllers/participant';
import { upload, uploadImage } from '../utils/uploadImage';

const router = Router();

// Add this GET route for availability
router.get('/availability', getEventAvailability);

router.post('/register', upload.single('paymentSS'), uploadImage, registerParticipant);

export default router;