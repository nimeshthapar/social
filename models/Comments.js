const { Schema, model, Types } = require('mongoose');

const cmntSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    comment: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    postId: {
      type: Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Comment', cmntSchema);
