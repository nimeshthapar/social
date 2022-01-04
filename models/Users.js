const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    relationship: {
      type: String,
    },
    bio: {
      type: String,
    },
    school: {
      type: String,
    },
    college: {
      type: String,
    },
    occupation: {
      type: String,
    },
    at: {
      type: String,
    },
    friends: [{ type: Types.ObjectId, required: true, ref: 'User' }],
    messages: [
      {
        type: Types.ObjectId,
        required: true,
        ref: 'Message',
      },
    ],
    posts: [
      {
        type: Types.ObjectId,
        required: true,
        ref: 'Post',
      },
    ],
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
