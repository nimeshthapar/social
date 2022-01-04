const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema(
  {
    caption: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    feeling: {
      type: String,
    },
    location: {
      type: String,
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: Types.ObjectId,
        required: true,
        ref: 'Comment',
      },
    ],
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Posts = model('Post', postSchema);

module.exports = Posts;
