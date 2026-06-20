const moongose = require('mongoose');

const commentSchema = new moongose.Schema({
})

const Comment = mongoose.model('Comment');
module.exports = Comment;