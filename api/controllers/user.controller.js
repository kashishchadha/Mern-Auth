import User from '../modals/user.model.js';
import cloudinary from 'cloudinary';
import multer from 'multer';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup for single file upload
const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const test = (req, res) => {
  res.json({
    message: 'User controller is working!'
  });
};

// Controller to update profile picture
export const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.body.userId; // or req.user.id if using auth middleware
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload_stream({
      folder: 'profileImages',
      resource_type: 'image',
    }, async (error, result) => {
      if (error) return res.status(500).json({ message: 'Cloudinary error', error });
      // Update user in DB
      const user = await User.findByIdAndUpdate(userId, { profilePicture: result.secure_url }, { new: true });
      res.json({ profilePicture: user.profilePicture });
    });
    // Pipe the buffer to Cloudinary
    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};