const express = require('express');
const { body } = require('express-validator');

const msgController = require('../controllers/msg-controllers');
const isAuth = require('../middlerware/is-auth');

const router = express.Router();

router.get('/', isAuth, msgController.getMessages);

router.post(
  '/',
  isAuth,
  [body('message').isLength({ min: 1 })],
  msgController.createMessage
);

module.exports = router;
