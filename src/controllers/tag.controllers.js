const Tag  = require('../../models/Tag');
const Post = require('../../models/Post');
 
// GET /tags
const getAll = async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.status(200).json(tags);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// GET /tags/:id  — incluye los posts asociados
const getById = async (req, res) => {
  try {
    const posts = await Post.find({ tag: req.tag._id }, 'description publishedAt');
    res.status(200).json({ ...req.tag.toObject(), posts });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
 
// POST /tags
const create = async (req, res) => {
  try {
    const tag = await Tag.create({ name: req.body.name });
    res.status(201).json(tag);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'El nombre del tag ya existe' });
    res.status(500).json({ error: e.message });
  }
};
 
// PUT /tags/:id
const update = async (req, res) => {
  try {
    Object.assign(req.tag, { name: req.body.name });
    await req.tag.save();
    res.status(200).json(req.tag);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'El nombre del tag ya existe' });
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /tags/:id
const remove = async (req, res) => {
  try {
    await Tag.findByIdAndDelete(req.tag._id);
    // Desasociar el tag de todos los posts que lo tengan
    await Post.updateMany({ tags: req.tag._id }, { $pull: { tags: req.tag._id } });
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