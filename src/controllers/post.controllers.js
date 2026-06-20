const { Op } = require("sequelize");
const { Post, User, PostImage, Comment, Tag } = require("../../models");

const MONTHS_LIMIT = parseInt(process.env.COMMENT_MONTHS_LIMIT) || 6;

const getAll = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { association: "author", attributes: ["nickname", "name"] },
        { association: "images" },
        { association: "tags" },
      ],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const dateLimit = new Date();
    dateLimit.setMonth(dateLimit.getMonth() - MONTHS_LIMIT);

    const post = await Post.findByPk(req.params.id, {
      include: [
        { association: "author", attributes: ["nickname", "name"] },
        { association: "images" },
        { association: "tags" },
        {
          association: "comments",
          where: { commentedAt: { [Op.gte]: dateLimit } },
          required: false,
          include: [{ association: "author", attributes: ["nickname"] }],
        },
      ],
    });
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    await post.update(req.body);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un post y los comentarios que se hayan hecho en él.

const remove = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    await Comment.destroy({ where: { postId: post.id } });
    await post.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agregar imagen a un post
const addImage = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const localUrl = `/assets/${req.file.filename}`;

    const image = await PostImage.create({ url: localUrl, postId: post.id });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar imagen de un post
const removeImage = async (req, res) => {
  try {
    const image = await PostImage.findOne({
      where: { id: req.params.imageId, postId: req.params.id },
    });
    if (!image) return res.status(404).json({ error: "Image not found" });
    await image.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Asociar tag a un post
const addTag = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const tag = await Tag.findByPk(req.body.tagId);
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    await post.addTag(tag);
    res.status(201).json({ message: "Tag added to post" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Quitar tag de un post
const removeTag = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    const tag = await Tag.findByPk(req.params.tagId);
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    await post.removeTag(tag);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove, addImage, removeImage, addTag, removeTag };
