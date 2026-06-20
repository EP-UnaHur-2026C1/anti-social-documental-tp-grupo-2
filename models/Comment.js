const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  isVisible: {type: Boolean, default: true, required: true},
  content: {type: String, required: true},
  config: {type: Number, required: true},
  publishedAt: {type: Date, default: Date.now},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;