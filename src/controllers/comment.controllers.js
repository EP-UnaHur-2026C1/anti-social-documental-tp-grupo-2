const Comment = require('../../models/Comment');
const Post    = require('../../models/Post');
const User    = require('../../models/User');
 
// GET /comments
const getAll = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate('userId', '-password')
      .populate('postId', 'description');
    res.status(200).json(comments);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// GET /comments/:id
const getById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate('userId', '-password')
      .populate('postId', 'description');
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.status(200).json(comment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// POST /comments/:postId
const create = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
 
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
 
    const comment = await Comment.create({
      content: req.body.content,
      userId:  req.body.userId,
      postId:  post._id,
    });
    res.status(201).json(comment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// PUT /comments/:id
const update = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { content: req.body.content },
      { new: true, runValidators: true }
    );
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' });
    res.status(200).json(comment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /comments/:id
const remove = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado' });
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
    remove
};