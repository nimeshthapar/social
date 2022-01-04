const express = require('express');
const { body } = require('express-validator');

const postController = require('../controllers/post-controllers');
const fileUpload = require('../middlerware/file-upload');
const isAuth = require('../middlerware/is-auth');

const router = express.Router();

router.get('/', isAuth, postController.getPosts);

router.get('/:pid', isAuth, postController.getPostById);

router.post('/', isAuth, fileUpload.single('image'), postController.createPost);

router.patch('/:pid', isAuth, postController.updatePost);

router.delete('/:pid', isAuth, postController.deletePost);

router.get('/comments/:pid', isAuth, postController.getComments);

router.post(
  '/comments',
  isAuth,
  [
    body('comment').trim().isLength({ min: 1 }),
    body('name').isLength({ min: 5 }),
    body('postId').not().isEmpty(),
  ],
  postController.createComment
);

router.patch(
  '/likes/:pid',
  isAuth,
  [body('userId').not().isEmpty()],
  postController.updateLikes
);

module.exports = router;
