const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const io = require('../socket');
const Messages = require('../models/Messages');
const Users = require('../models/Users');
const HttpError = require('../models/http-error');

exports.getMessages = async (req, res, next) => {
  const curPage = req.query.page || 1;
  const perPage = 5;

  let totalItems;
  let messages;
  try {
    totalItems = await Messages.find().estimatedDocumentCount();
    messages = await Messages.find()
      .populate('creatorId', 'name')
      .sort({ createdAt: -1 })
      .skip((curPage - 1) * perPage)
      .limit(perPage);
  } catch (err) {
    return next(new HttpError('Fetching message Failed', 404));
  }

  res.json({
    messages: messages.map((m) => m.toObject({ getters: true })),
    totalPages: Math.ceil(totalItems / perPage),
  });
};

exports.createMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() });
    return next(new HttpError('Invalid Credentials', 422));
  }

  const { message, creatorId } = req.body;

  const createdMessage = new Messages({
    message,
    creatorId,
  });

  let user;
  try {
    user = await Users.findById(creatorId);
  } catch (Err) {
    return next(new HttpError('Finding user for message Failed', 500));
  }

  if (!user) {
    return next(new HttpError("Couldn't find user for given id", 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdMessage.save({ session });
    user.messages.push(createdMessage);
    await user.save({ session });
    await session.commitTransaction();
  } catch (Err) {
    return next(new HttpError("Couldn't save the message", 404));
  }

  io.getIO().emit('new-message', {
    message: {
      ...createdMessage.toObject({ getters: true }),
      creatorId: { name: user.name },
    },
  });

  res.json({ message: createdMessage.toObject({ getters: true }) });
};
