const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/', postController.createPost);
router.post('/likes', postController.likesCount);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.get('/my-posts/:id', postController.getPostByUserEmail);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
