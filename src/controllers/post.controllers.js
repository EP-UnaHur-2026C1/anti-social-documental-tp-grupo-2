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
    const post = await req.post
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
    const post = await Post.create({ description: req.body.description, userId: req.user._id });
    res.status(201).json(post);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// PUT /posts/:id
const update = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(
      req.post._id,
      { description: req.body.description },
      { new: true, runValidators: true }
    );
    res.status(200).json(req.post);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /posts/:id
const remove = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.post._id);
    // Elimina comentarios asociados al post
    await Comment.deleteMany({ postId: req.post._id });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// POST /posts/:id/images  — agrega una imagen incrustada
const addImage = async (req, res) => {
  try {
    req.post.images.push({ url: req.body.url });
    await req.post.save();
    res.status(201).json(req.post.images[req.post.images.length - 1]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /posts/:id/images/:imageId  — elimina una imagen incrustada por su _id
const removeImage = async (req, res) => {
  try {
    req.image.deleteOne();
    await req.post.save();
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};
 
// POST /posts/:id/tags  — asocia un tag existente al post
const addTag = async (req, res) => {
  try {
    req.post.tags.push(req.tag._id);
    await req.post.save();
    res.status(201).json({ message: 'Tag agregado al post' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /posts/:id/tags/:tagId
const removeTag = async (req, res) => {
  try {
    req.post.tags = req.post.tags.filter(t => t.toString() !== req.params.tagId);
    await req.post.save();
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