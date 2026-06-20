const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  description: {type: String, required: true},
  publishedAt: {type: Date, default: Date.now},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;