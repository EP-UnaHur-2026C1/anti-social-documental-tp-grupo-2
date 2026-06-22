const Post = require('../../models/Post');
const User = require('../../models/User');
const Tag  = require('../../models/Tag');
const Comment = require('../../models/Comment');
 
const MONTHS_LIMIT = parseInt(process.env.COMMENT_MONTHS_LIMIT) || 6;
 
// GET /posts
const getAll = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('userId', '-password')
      .populate('tags');
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// GET /posts/:id  — incluye comentarios filtrando por fecha
const getById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('userId', '-password')
      .populate('tags');
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
 
    const dateLimit = new Date();
    dateLimit.setMonth(dateLimit.getMonth() - MONTHS_LIMIT);
 
    const comments = await Comment.find({
      postId: post._id,
      commentedAt: { $gte: dateLimit },
    }).populate('userId', '-password');
 
    res.status(200).json({ ...post.toObject(), comments });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// POST /posts/:nickname
const create = async (req, res) => {
  try {
    const user = await User.findOne({ nickname: req.params.nickname });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
 
    const post = await Post.create({ description: req.body.description, userId: user._id });
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// PUT /posts/:id
const update = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { description: req.body.description },
      { new: true, runValidators: true }
    );
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /posts/:id
const remove = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    // Elimina comentarios asociados al post
    await Comment.deleteMany({ postId: post._id });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// POST /posts/:id/images  — agrega una imagen incrustada
const addImage = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
 
    const url = req.body.url;
    if (!url) return res.status(400).json({ error: 'Se requiere una URL de imagen' });
 
    post.images.push({ url });
    await post.save();
    res.status(201).json(post.images[post.images.length - 1]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /posts/:id/images/:imageId  — elimina una imagen incrustada por su _id
const removeImage = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
 
    const image = post.images.id(req.params.imageId);
    if (!image) return res.status(404).json({ error: 'Imagen no encontrada' });
 
    image.deleteOne();
    await post.save();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// POST /posts/:id/tags  — asocia un tag existente al post
const addTag = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
 
    const tag = await Tag.findById(req.body.tagId);
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
 
    if (post.tags.includes(tag._id))
      return res.status(409).json({ error: 'El tag ya está asociado a este post' });
 
    post.tags.push(tag._id);
    await post.save();
    res.status(201).json({ message: 'Tag agregado al post' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /posts/:id/tags/:tagId
const removeTag = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
 
    const originalLength = post.tags.length;
    post.tags = post.tags.filter(t => t.toString() !== req.params.tagId);
 
    if (post.tags.length === originalLength)
      return res.status(404).json({ error: 'El tag no estaba asociado a este post' });
 
    await post.save();
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
module.exports = { 
    getAll, 
    getById, 
    create, 
    update, 
    remove, 
    addImage,
    removeImage, 
    addTag, 
    removeTag
};