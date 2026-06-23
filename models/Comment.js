const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  isVisible: {type: Boolean, default: true, required: true},
  content: {type: String, required: true},
  // Configuración para saber si el comentario es visible o no
  config: { type: Number, default: parseInt(process.env.COMMENT_MONTHS_LIMIT)  },
  publishedAt: {type: Date, default: Date.now},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;