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
    const user = await User.findOne({ nickname: req.params.nickname }, '-password');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(user);
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
    const user = await User.findOneAndUpdate(
      { nickname: req.params.nickname },
      req.body,
      { new: true, runValidators: true, projection: '-password' }
    );
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'El nickname o email ya está en uso' });
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /users/:nickname
const remove = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ nickname: req.params.nickname });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// POST /users/:nickname/following/:followedNickname
const follow = async (req, res) => {
  try {
    const follower = await User.findOne({ nickname: req.params.nickname });
    if (!follower) return res.status(404).json({ error: 'Usuario seguidor no encontrado' });
 
    const followed = await User.findOne({ nickname: req.params.followedNickname });
    if (!followed) return res.status(404).json({ error: 'Usuario a seguir no encontrado' });
 
    if (follower._id.equals(followed._id))
      return res.status(400).json({ error: 'Un usuario no puede seguirse a sí mismo' });
 
    const relation = await Follow.create({ followerId: follower._id, followedId: followed._id });
    res.status(201).json(relation);
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'Ya seguís a este usuario' });
    res.status(500).json({ error: e.message });
  }
};
 
// DELETE /users/:nickname/following/:followedNickname
const unfollow = async (req, res) => {
  try {
    const follower = await User.findOne({ nickname: req.params.nickname });
    if (!follower) return res.status(404).json({ error: 'Usuario no encontrado' });
 
    const followed = await User.findOne({ nickname: req.params.followedNickname });
    if (!followed) return res.status(404).json({ error: 'Usuario no encontrado' });
 
    const deleted = await Follow.findOneAndDelete({ followerId: follower._id, followedId: followed._id });
    if (!deleted) return res.status(404).json({ error: 'No seguís a este usuario' });
 
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// GET /users/:nickname/followers
const getFollowers = async (req, res) => {
  try {
    const user = await User.findOne({ nickname: req.params.nickname });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
 
    const follows = await Follow.find({ followedId: user._id }).populate('followerId', '-password');
    res.status(200).json(follows.map(f => f.followerId));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
 
// GET /users/:nickname/following
const getFollowing = async (req, res) => {
  try {
    const user = await User.findOne({ nickname: req.params.nickname });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
 
    const follows = await Follow.find({ followerId: user._id }).populate('followedId', '-password');
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
