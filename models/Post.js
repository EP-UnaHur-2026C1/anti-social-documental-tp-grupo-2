const mongoose = require('mongoose');
 
// Las imagenes se incrustan, siempre se consultan con el post y no existen por si solas
const postSchema = new mongoose.Schema({
  description: { type: String, required: true },
  publishedAt:  { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Incrustacion -> array de urls directamente en el post
  images: [{ url: { type: String, required: true } }],
  // Referencia -> los tags existen de forma independiente y se comparten entre posts
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
});
 
const Post = mongoose.model('Post', postSchema);
module.exports = Post;