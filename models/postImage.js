const mongoose = require('mongoose');

const postImageSchema = new mongoose.Schema({
  url: {type: String, required: true},
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
});

const PostImage = mongoose.model('PostImage', postImageSchema);
module.exports = PostImage;