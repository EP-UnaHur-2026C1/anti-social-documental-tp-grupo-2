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
    res.status(200).json(comment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// POST /comments/:postId
const create = async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      userId: req.userFromBody._id,
      postId: req.post._id,
    });
    res.status(201).json(comment);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// PUT /comments/:id
const update = async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(
      req.comment._id,
      { content: req.body.content },
      { new: true, runValidators: true }
    );
    res.status(200).json({ message: 'Comentario modificado', comment: req.comment });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /comments/:id
const remove = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.comment._id);
    res.status(204).json({ message: 'Comentario borrado' }).send();
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