const {User, Follower} = require('../../models')

const getAll = async(req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: ["nickname", "name", "email"]
    })
    res.status(200).json(usuarios);
  } catch(e) {
    res.status(500).json({
      error: e.message
    })
  }
}

const getByNickname = async(req, res) => {
  try {
    const usuario = await User.findOne({
      where: { nickname: req.params.nickname },
      attributes: ["nickname", "name", "email"],
    });
    if (!usuario) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(usuario);
  } catch (e) {
    res.status(500).json({
      error: e.message
    })
  }
}

const create = async (req, res) => {
  try {
    const {nickname, name, email, password} = req.body;
    const usuario = await User.create({
      nickname, 
      name,
      email,
      password
    })
    res.status(201).json(usuario)
  } catch(e) {
    res.status(500).json({
      error: e.message
    })
  }
}

const update = async(req, res) => {
  try {
    const {nickname, name, email, password} = req.body;
    const usuario = await User.findByPk(req.params.nickname);
    if (!usuario) {
      return res.status(404).json({ error: "User not found" });
    }
    await usuario.update({
      nickname, name, email, password
    });
    res.status(200).json(usuario);
  } catch(e) {
    res.status(500).json({
      error: e.message
    })
  }
}

const remove = async(req, res) => {
  try {
    const usuario = await User.findByPk(req.params.nickname);
    if (!usuario) {
      return res.status(404).json({ error: "User not found" });
    }
    await usuario.destroy();
    res.status(200).json({
      message: "Usuario eliminado con éxito."
    });
  } catch(e) {
    res.status(500).json({
      error: e.message
    })
  }
}

// Seguir a un usuario.

const follow = async (req, res) => {
  try {
    const followerId = req.params.nickname;
    const followedId = req.params.followedId;

    if (followerId === followedId) {
      return res.status(400).json({ error: "A user cannot follow themselves" });
    }

    const follower = await User.findByPk(followerId);
    if (!follower) return res.status(404).json({ error: "Follower user not found" });

    const followed = await User.findByPk(followedId);
    if (!followed) return res.status(404).json({ error: "Followed user not found" });

    const relation = await Follower.create({ followerId, followedId });

    res.status(201).json(relation);
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "Follow relation already exists" });
    }
    res.status(500).json({ error: e.message });
  }
};

// Dejar de seguir a un usuario

const unfollow = async (req, res) => {
  const followerId = req.params.nickname;
  const followedId = req.params.followedId;

  const deleted = await Follower.destroy({
    where: { followerId, followedId },
  });

  if (!deleted) {
    return res.status(404).json({ error: "Follow relation not found" });
  }

  res.status(204).send();
};

// Obtener los usuarios que siguen a un usuario

const getFollowers = async (req, res) => {
  const user = await User.findByPk(req.params.nickname, {
    include: [{
      association: "followers",
      attributes: ["nickname", "name", "email"],
      through: { attributes: [] },
    }],
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user.followers);
};

// Obtener los usuarios que un usuario sigue.

const getFollowing = async (req, res) => {
  const user = await User.findByPk(req.params.nickname, {
    include: [{
      association: "following",
      attributes: ["nickname", "name", "email"],
      through: { attributes: [] },
    }],
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user.following);
};

module.exports = {
  create,
  getByNickname,
  getAll,
  update,
  remove,
  follow,
  unfollow,
  getFollowers,
  getFollowing
}
