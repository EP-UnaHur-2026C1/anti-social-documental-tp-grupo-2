const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  followedId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Follow = mongoose.model('Follow', followSchema);
module.exports = Follow;