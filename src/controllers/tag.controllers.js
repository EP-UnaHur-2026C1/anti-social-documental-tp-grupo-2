const { Tag, Post } = require("../../models");

const getAll = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ association: "posts", attributes: ["id", "description"] }],
    });
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "Tag name already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    await tag.update(req.body);
    res.json(tag);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "Tag name already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) return res.status(404).json({ error: "Tag not found" });
    await tag.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
