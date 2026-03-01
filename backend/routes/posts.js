const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', auth, upload.single('media'), postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.post('/:id/like', postController.likePost);
router.post('/:id/comment', postController.addComment);
router.delete('/:id/comment/:commentId', auth, postController.deleteComment);

module.exports = router;
