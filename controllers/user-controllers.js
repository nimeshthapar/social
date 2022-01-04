const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const Users = require('../models/Users');

exports.getSuggestedUsers = async (req, res, next) => {
  const { uid } = req.params;

  let users;
  try {
    users = await Users.find({}, 'name friends isActive image').populate(
      'friends',
      'name friends isActive'
    );
  } catch (err) {
    return next(new HttpError('Fetching Users with given id Failed', 500));
  }

  if (!users && users.length === 0) {
    return next(new HttpError("Couldn't find Users", 500));
  }

  let user;
  try {
    user = await Users.findById(uid, 'name friends isActive image').populate(
      'friends',
      'name friends isActive image'
    );
  } catch (err) {
    return next(new HttpError('Fetching Users with given id Failed', 500));
  }

  if (!user) {
    return next(new HttpError("Couldn't find User", 500));
  }

  const suggestedUsers = _.differenceWith(
    [...users.map((u) => ({ ...u._doc, friends: undefined }))],
    [
      { ...user._doc, friends: undefined },
      ...user.friends.map((f) => ({ ...f._doc, friends: undefined })),
    ],
    _.isEqual
  );

  res.json({
    suggestedUsers,
  });
};

exports.getUserById = async (req, res, next) => {
  const { uid } = req.params;

  let user;
  try {
    user = await Users.findById(uid, '-password').populate('posts');
  } catch (Err) {
    return next(new HttpError("Couldn't find User with given id", 404));
  }

  if (!user) {
    return next(new HttpError('User not found', 404));
  }

  res.json({
    user: user.toObject({ getters: true }),
    posts: user.posts.map((p) => ({
      ...p._doc,
      id: p._doc._id.toString(),
      userId: { id: user.id, image: user.image, name: user.name },
    })),
  });
};

exports.postSignUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() });
    return next(new HttpError('Invalid Credentials', 422));
  }

  const {
    email,
    password,
    name,
    relationship,
    bio,
    school,
    college,
    occupation,
    at,
  } = req.body;

  let user;
  try {
    user = await Users.find({ email });
  } catch (err) {
    return next(new HttpError('Finding User Failed', 500));
  }

  if (user.length > 0) {
    return next(new HttpError('User already Exist with given email', 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError('Hashing Password Failed', 500));
  }

  let image;
  if (req.file) {
    image = req.file.path.replace(/\\/g, '/');
  }

  const createUser = new Users({
    email,
    password: hashedPassword,
    name,
    relationship: relationship === 'undefined' ? undefined : relationship,
    bio: bio === 'undefined' ? undefined : bio,
    school: school === 'undefined' ? undefined : school,
    college: college === 'undefined' ? undefined : college,
    occupation: occupation === 'undefined' ? undefined : occupation,
    at: at === 'undefined' ? undefined : at,
    image: image ? image : undefined,
    posts: [],
    friends: [],
    messages: [],
    isActive: true,
  });

  try {
    await createUser.save();
  } catch (Err) {
    return next(new HttpError('Creating User Failed', 422));
  }

  let token;
  try {
    token = jwt.sign({ userId: createUser.id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
  } catch (err) {
    return next(new HttpError('Something went wrong, Please Try Again', 500));
  }

  res.status(201).json({
    msg: 'Signed up',
    userData: {
      name: createUser.name,
      image: createUser.image,
      id: createUser._id.toString(),
      isActive: true,
    },
    token: token,
  });
};

exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() });
    return next(new HttpError('Invalid Credentials', 422));
  }

  const { email, password } = req.body;

  let identifeidUser;
  try {
    identifeidUser = await Users.find({ email: email });
  } catch (err) {
    return next(new HttpError('Finding User with email Failed', 500));
  }

  if (!identifeidUser) {
    return next(new HttpError("Email doesnt't exist", 422));
  }

  let matchPassword;
  try {
    matchPassword = await bcrypt.compare(password, identifeidUser[0].password);
  } catch (Err) {
    return next(new HttpError('Comparing Password Failed', 500));
  }

  if (!matchPassword) {
    return next(new HttpError('Password Incorrect', 422));
  }

  const data = identifeidUser[0].toObject({ getters: true });

  let user;
  try {
    user = await Users.findById(data.id);
    user.isActive = true;
    await user.save();
  } catch (Err) {
    return next(new HttpError('Setting User Status Failed', 500));
  }

  let token;
  try {
    token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
  } catch (err) {
    return next(new HttpError('Something went wrong, Please Try Again', 500));
  }

  res.status(201).json({
    msg: 'Logged In',
    userData: {
      name: data.name,
      id: data.id,
      image: data.image,
      isActive: true,
    },
    token: token,
  });
};

exports.updateUser = async (req, res, next) => {
  const { uid } = req.params;

  const { relationship, bio, school, occupation, at, college } = req.body;

  let user;
  try {
    user = await Users.findById(uid);
  } catch (Err) {
    return next(new HttpError("Couldn't find user by given Id", 404));
  }

  if (!user) {
    return next(new HttpError('User not found'), 404);
  }

  user.college = college;
  user.relationship = relationship;
  user.bio = bio;
  user.school = school;
  user.occupation = occupation;
  user.at = at;

  let updatedUser;
  try {
    updatedUser = await user.save();
  } catch (Err) {
    return next(new HttpError('Updating user failed'), 404);
  }

  res.json({ user: updatedUser.toObject({ getters: true }), msg: 'Logged In' });
};

exports.getFriends = async (req, res, next) => {
  const { uid } = req.params;

  let user;
  try {
    user = await Users.findById(uid, 'friends').populate(
      'friends',
      'name image isActive'
    );
  } catch (Err) {
    return next(new HttpError('Finding User Failed', 500));
  }

  if (!user) {
    return next(new HttpError('User not found'), 404);
  }

  res.status(200).json({ friends: user.friends });
};

exports.addFriend = async (req, res, next) => {
  const { uid } = req.params;

  const { friendId } = req.body;

  let user;
  let friendUser;
  try {
    user = await Users.findById(uid);
    friendUser = await Users.findById(friendId);
  } catch (Err) {
    return next(new HttpError('Finding User Failed', 500));
  }

  if (!user) {
    return next(new HttpError('User not found'), 404);
  }

  const foundFriend = user.friends.find((f) => f.toString() === friendId);

  const foundFriendForAnother = friendUser.friends.find(
    (f) => f.toString() === uid
  );

  if (foundFriend && foundFriendForAnother) {
    user.friends.pull(foundFriend);
    friendUser.friends.pull(foundFriendForAnother);
  } else {
    user.friends.push(friendId);
    friendUser.friends.push(uid);
  }

  try {
    await user.save();
    await friendUser.save();
  } catch (err) {
    return next(new HttpError('Adding Friend Failed', 500));
  }

  res.status(200).json({ msg: foundFriend ? 'Unfriended' : 'Friended' });
};

exports.logout = async (req, res, next) => {
  const { uid } = req.params;

  const { isActive } = req.body;

  let user;
  try {
    user = await Users.findById(uid);
  } catch (err) {
    return next(new HttpError('Fetching User with given id Failed', 500));
  }

  if (!user) {
    return next(new HttpError("Couldn't find User with given id Failed", 404));
  }

  user.isActive = isActive;

  try {
    await user.save();
  } catch (err) {
    return next(new HttpError('Saving Status Failed', 500));
  }

  res.status(200).json({ msg: 'Successfully Logout' });
};
