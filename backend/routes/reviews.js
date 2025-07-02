// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import Review from '../models/Review.js';
// import { authMiddleware } from '../middleware/auth.js';

// const router = express.Router();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });
// const upload = multer({ storage });

// // GET product reviews
// router.get('/:productId', async (req, res) => {
//   const reviews = await Review.find({ productId: req.params.productId }).sort({ timestamp: -1 });
//   res.json({ success: true, data: reviews });
// });

// // POST a review
// router.post('/:productId', authMiddleware, upload.single('image'), async (req, res) => {
//   const { message } = req.body;
//   const imgPath = req.file ? `/uploads/${req.file.filename}` : null;

//   const review = new Review({
//     productId: req.params.productId,
//     userId: req.user._id,
//     userName: req.user.name,
//     message,
//     image: imgPath
//   });

//   await review.save();
//   res.json({ success: true, data: review });
// });

// export default router;
