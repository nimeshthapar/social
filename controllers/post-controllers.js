const fs = require('fs');

const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const Post = require('../models/Posts');
const HttpError = require('../models/http-error');
const Comments = require('../models/Comments');
const Users = require('../models/Users');
const io = require('../socket');

exports.getPosts = async (req, res, next) => {
  const curPage = req.query.page || 1;
  const perPage = 2;

  let posts;
  let totalItems;
  try {
    totalItems = await Post.find().estimatedDocumentCount();
    posts = await Post.find()
      .populate('userId', 'name image')
      .sort({ createdAt: -1 })
      .skip((curPage - 1) * perPage)
      .limit(perPage);
  } catch (Err) {
    return next(new HttpError('Fetching Posts Failed', 500));
  }

  if (!posts && posts.length === 0) {
    return next(new HttpError('No post Found', 404));
  }

  res.status(200).json({
    posts: posts.map((p) => p.toObject({ getters: true })),
    message: 'Fetched Posts Successfully',
    totalPages: Math.ceil(totalItems / perPage),
  });
};

exports.getPostById = async (req, res, next) => {
  const { pid } = req.params;

  let post;
  try {
    post = await Post.findById(pid);
  } catch (Err) {
    return next(new HttpError('Fetching Post Failed', 500));
  }

  if (!post) {
    return next(new HttpError('No post Found by given Id', 404));
  }

  res.status(200).json({
    post: post.toObject({ getters: true }),
    message: 'Fetched Post Successfully',
  });
};

exports.createPost = async (req, res, next) => {
  const { caption, feeling, location, userId } = req.body;

  let imageURL;
  if (req.file) {
    imageURL = req.file.path.replace(/\\/g, '/');
  }
  if (!(caption || imageURL)) {
    return next(new HttpError("Can't Create The post", 422));
  }

  const createdPost = new Post({
    caption: caption === 'undefined' ? undefined : caption,
    imageURL: imageURL ? imageURL : undefined,
    feeling: feeling === 'undefined' ? undefined : feeling,
    location: location === 'undefined' ? undefined : location,
    userId: userId,
    comments: [],
    likes: [],
  });

  let user;
  try {
    user = await Users.findById(userId);
  } catch (err) {
    return next(
      new HttpError('Creating new Post Failed, Please Try Again', 500)
    );
  }

  if (!user) {
    return next(
      new HttpError("Couldn't create post for provided user ID", 422)
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPost.save({ session });
    user.posts.push(createdPost);
    await user.save({ session });
    await session.commitTransaction();
  } catch (Err) {
    return next(new HttpError("Couldn't save the created Post", 404));
  }

  io.getIO().emit('create-post', {
    post: {
      ...createdPost.toObject({ getters: true }),
      userId: { image: user.image, name: user.name },
    },
  });

  res.status(201).json({ post: createdPost.toObject({ getters: true }) });
};

exports.updatePost = async (req, res, next) => {
  const { pid } = req.params;
  const { caption, location } = req.body;

  let updatedPost;
  try {
    updatedPost = await Post.findById(pid);
  } catch (Err) {
    return next(new HttpError("Couldn't update Post", 404));
  }

  if (!updatedPost) {
    return next(new HttpError('There is no post with this id', 404));
  }

  if (updatedPost.userId.toString() !== req.userData.userId) {
    return next('You are not allowed to update this post', 403);
  }

  updatedPost.caption = caption;
  updatedPost.location = location;

  let savedPost;
  try {
    savedPost = await updatedPost.save();
  } catch (Err) {
    return next(new HttpError("Couldn't save the updated Post", 404));
  }

  res.status(201).json({ post: savedPost.toObject({ getters: true }) });
};

exports.deletePost = async (req, res, next) => {
  const { pid } = req.params;

  let post;
  try {
    post = await Post.findById(pid).populate('userId');
  } catch (err) {
    return next(new HttpError("Couldn't delete this post with given id", 500));
  }

  if (!post) {
    return next(new HttpError("Couldn't find post for provided ID", 404));
  }

  if (post.userId._id.toString() !== req.userData.userId) {
    return next('You are not allowed to delete this post', 403);
  }

  if (post.comments.length > 0) {
    let comments;
    try {
      comments = await Comments.deleteMany({ postId: pid });
    } catch (err) {
      return next(new HttpError('Deleting comments failed', 500));
    }

    if (!comments) {
      return next(new HttpError("Couldn't delete comment", 404));
    }

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      post.remove({ session });
      post.userId.posts.pull(post);
      await post.userId.save({ session });
      await session.commitTransaction();
    } catch (err) {
      return next(
        new HttpError('Deleting new Post Failed, Please Try Again', 500)
      );
    }
  } else {
    await post.remove();
  }

  const imagePath = post.imageURL;

  if (imagePath) {
    fs.unlink(imagePath, (err) => {
      console.log(err);
    });
  }

  io.getIO().emit('delete', pid);

  res.json({ msg: 'deleted' });
};

exports.getComments = async (req, res, next) => {
  const postId = req.params.pid;

  let posts;
  try {
    posts = await Post.findById(postId).populate('comments');
  } catch (err) {
    return next(
      new HttpError('Deleting new Place Failed, Please Try Again', 500)
    );
  }

  res.json({
    comments: posts.comments.map((c) => c.toObject({ getters: true })),
  });
};

exports.createComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() });
    return next(new HttpError('Invalid Credentials', 422));
  }
  const { name, comment, postId, image } = req.body;

  const createComment = new Comments({
    name,
    comment,
    image: image,
    postId,
  });

  let post;
  try {
    post = await Post.findById(postId);
  } catch (Err) {
    return next(new HttpError('Finding Post Failed for comments', 500));
  }

  if (!post) {
    return next(new HttpError('Finding Post for given id failed', 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createComment.save({ session });
    post.comments.push(createComment);
    await post.save({ session });
    await session.commitTransaction();
  } catch (Err) {
    return next(new HttpError("Couldn't save the comment", 404));
  }

  io.getIO().emit('update-comment', {
    comment: createComment.toObject({ getters: true }),
  });

  res.json({ comment: createComment.toObject({ getters: true }) });
};

exports.updateLikes = async (req, res, next) => {
  const { pid } = req.params;

  const { userId } = req.body;

  let post;
  try {
    post = await Post.findById(pid);
  } catch (Err) {
    return next(new HttpError('Liking Post Failed', 500));
  }

  let isLiked;
  if (post.likes.find((u) => u.toString() === userId.toString())) {
    post.likes.pull(userId);
    isLiked = false;
  } else {
    post.likes.push(userId);
    isLiked = true;
  }

  let updatedPost = await post.save();

  res.status(201).json({ likes: updatedPost.likes.length });
};
