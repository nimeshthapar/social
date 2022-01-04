const { Schema, model, Types } = require('mongoose');

const msgSchema = new Schema(
  {
    message: {
      required: true,
      type: String,
    },
    creatorId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = model('Message', msgSchema);
