const { Comment, Post, User } = require("../../models");

const getAll = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        { association: "author", attributes: ["nickname"] },
        { association: "post", attributes: ["id", "description"] },
      ],
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        { association: "author", attributes: ["nickname"] },
        { association: "post", attributes: ["id", "description"] },
      ],
    });
    if (!comment) return res.status(404).json({ error: "Comentario no encontrado" });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const post = await Post.findByPk(req.body.postId);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });
    const user = await User.findByPk(req.body.userId);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comentario no encontrado" });
    await comment.update(req.body);
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comentario no encontrado" });
    await comment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
