import express from 'express';
import { test, upload, updateProfilePicture } from '../controllers/user.controller.js';
const router = express.Router();
router.get('/',test );
router.post('/profile-picture', upload.single('profilePicture'), updateProfilePicture);
export default router;