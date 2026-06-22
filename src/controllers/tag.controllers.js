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
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
 
    const posts = await Post.find({ tags: tag._id }, 'description publishedAt');
    res.status(200).json({ ...tag.toObject(), posts });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
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
    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true }
    );
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
    res.status(200).json(tag);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'El nombre del tag ya existe' });
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /tags/:id
const remove = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
    // Desasociar el tag de todos los posts que lo tengan
    await Post.updateMany({ tags: tag._id }, { $pull: { tags: tag._id } });
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