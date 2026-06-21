const User = require("../../models/User");

const getAll = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
}

const getByNickname = async (req, res) => {
  try {
    const user = await User.findOne({ nickname: req.params.nickname });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: "Error al obtener el usuario por nickname" });
  }
}

const create = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    const newUser = new User({ nickname, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
}

const remove = async (req, res) => {
  try {
    const {nickname} = req.params
    const user = await User.findOneAndDelete({nickname})
    res.status(200).json(user);
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: "Error al eliminar al usuario" });
  }
}

const update = async (req, res) => {
  try {
    const {nickname, email, password} = req.body;
    const user = await User.findOneAndUpdate({nickname}, {nickname, email, password})
  } catch (e) {
    console.error(e);
    res.status(500).json({error: "Error al actualizar al usuario"})
  }
}

module.exports = {
  getAll,
  getByNickname,
  create,
  update,
  remove
}
