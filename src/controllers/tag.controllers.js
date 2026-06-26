const Tag  = require('../../models/Tag');
const Post = require('../../models/Post');
const { createClient } = require('redis');

// Configuración de redis
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error:', err));
redisClient.connect().catch(console.error);

const CACHE_KEY = 'all_tags';
const CACHE_TTL = 86400; // tiempo de vida.

const invalidateCache = async () => {
  try {
    await redisClient.del(CACHE_KEY);
  } catch (error) {
    console.error('Error al limpiar la caché:', error);
  }
};

// GET /tags
const getAll = async (req, res) => {
  try {
    const cachedTags = await redisClient.get(CACHE_KEY);
    if (cachedTags) {
      return res.status(200).json(JSON.parse(cachedTags));
    }

    // Si no está en cache va a Mongo
    const tags = await Tag.find({});
    
    // Guardar en Redis 
    await redisClient.setEx(CACHE_KEY, CACHE_TTL, JSON.stringify(tags));

    res.status(200).json(tags);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// GET /tags/:id  — incluye los posts asociados
const getById = async (req, res) => {
  try {
    const posts = await Post.find({ tags: req.tag._id }, 'description publishedAt');
    res.status(200).json({ ...req.tag.toObject(), posts });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}

// POST /tags
const create = async (req, res) => {
  try {
    const tag = await Tag.create({ name: req.body.name });
    await invalidateCache();
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
    await invalidateCache();
    res.status(200).json({ message: 'Tag actualizado', tag: req.tag });
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'El nombre del tag ya existe' });
    res.status(500).json({ error: e.message });
  }
};

// DELETE /tags/:id
const remove = async (req, res) => {
  try {
    await Tag.findByIdAndDelete(req.tag._id);
    await Post.updateMany({ tags: req.tag._id }, { $pull: { tags: req.tag._id } });
    await invalidateCache();
    
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
