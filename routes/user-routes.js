const express = require('express');
const { body } = require('express-validator');

const fileUpload = require('../middlerware/file-upload');
const userController = require('../controllers/user-controllers');
const isAuth = require('../middlerware/is-auth');

const router = express.Router();

router.get('/suggested/:uid', isAuth, userController.getSuggestedUsers);

router.get('/:uid', isAuth, userController.getUserById);

router.patch('/:uid', isAuth, userController.updateUser);

router.post(
  '/signup',
  fileUpload.single('image'),
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 6 }),
  ],
  userController.postSignUp
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').isLength({ min: 6 })],
  userController.postLogin
);

router.get('/friends/:uid', isAuth, userController.getFriends);

router.patch(
  '/friends/add/:uid',
  isAuth,
  [body('friendId').not().isEmpty()],
  userController.addFriend
);

router.patch(
  '/logout/:uid',
  isAuth,
  [body('isActive').isBoolean()],
  userController.logout
);

module.exports = router;
