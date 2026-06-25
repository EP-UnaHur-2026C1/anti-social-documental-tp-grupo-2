const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  followedId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

followSchema.index({ followerId: 1, followedId: 1 }, { unique: true });

const Follow = mongoose.model('Follow', followSchema);
module.exports = Follow;
