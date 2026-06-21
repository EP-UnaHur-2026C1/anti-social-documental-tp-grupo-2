const Comment = require('../../models/Comment');
const Post = require('../../models/Post')

const getAll = (req, res) => {
    try {

    } catch(e) {
        console.error(e);
        res.status(500).json({e: "Error al obtener los comentarios"})
    }
}

const getById = async(req, res) => {
    try {
        const id = req.params
        const comment = Comment.findById(id);
        res.status(200).json(comment)
    } catch(e) {
        console.error(e);
        res.status(500).json({e: "Error al obtener los comentarios del post"})
    }
}

const create = async(req, res) => {
    try {
        const idPost = req.body.postId
        const post = Post.findById(idPost)
    } catch(e) {
        console.error(e);
        res.status(500).json({e: "Error al crear el comentario"})
    }
}

module.exports = {
    getAll,
    getById,
    create
}