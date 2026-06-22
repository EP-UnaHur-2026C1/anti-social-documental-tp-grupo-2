const User = require('../../models/User');
const Follow = require('../../models/Follow');
 
const MONTHS_LIMIT = parseInt(process.env.COMMENT_MONTHS_LIMIT) || 6;
 
// GET /users
const getAll = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// GET /users/:nickname
const getByNickname = async (req, res) => {
  try {
    const { password, ...userWithoutPassword } = req.user.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// POST /users
const create = async (req, res) => {
  try {
    const { nickname, name, email, password } = req.body;
    const user = await User.create({ nickname, name, email, password });
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'El nickname o email ya está en uso' });
    res.status(500).json({ error: e.message });
  }
};
 
// PUT /users/:nickname
const update = async (req, res) => {
  try {
    Object.assign(req.user, req.body);
    await req.user.save();
    const { password, ...userWithoutPassword } = req.user.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'El nickname o email ya está en uso' });
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /users/:nickname
const remove = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.user._id });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// POST /users/:nickname/following/:followedNickname
const follow = async (req, res) => {
  try {
    if (req.user._id.equals(req.followed._id))
      return res.status(400).json({ error: 'Un usuario no puede seguirse a sí mismo' });

    const relation = await Follow.create({ followerId: req.user._id, followedId: req.followed._id });
    res.status(201).json(relation);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'Ya seguís a este usuario' });
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /users/:nickname/following/:followedNickname
const unfollow = async (req, res) => {
  try {
    const deleted = await Follow.findOneAndDelete({ followerId: req.user._id, followedId: req.followed._id });
    if (!deleted) return res.status(404).json({ error: 'No seguís a este usuario' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// GET /users/:nickname/followers
const getFollowers = async (req, res) => {
  try {
    const follows = await Follow.find({ followedId: req.user._id }).populate('followerId', '-password');
    res.status(200).json(follows.map(f => f.followerId));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// GET /users/:nickname/following
const getFollowing = async (req, res) => {
  try {
    const follows = await Follow.find({ followerId: req.user._id }).populate('followedId', '-password');
    res.status(200).json(follows.map(f => f.followedId));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
module.exports = {
  getAll,
  getByNickname,
  create,
  update, 
  remove, 
  follow, 
  unfollow, 
  getFollowers, 
  getFollowing
};
