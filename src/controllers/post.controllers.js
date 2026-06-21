const Post = require("../../models/Post")
const User = require("../../models/User");

const getAll = async(req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts)
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Error al obtener todos los posts"})
    }
}

const getById = async(req,res) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id).populate('userId', '-pasword');
        res.status(200).json(post);
    } catch(e) {
        console.error(e);
        res.status(500).json({error: "Error al obtener el post por id"})
    }
}

const create = async(req, res) => {
    try {
        const {nickname} = req.params
        const {description} = req.body
        const user = await User.findOne({nickname})
        if (!user) {
            res.status(400).json({error: "Usuario no encontrado"})
            return
        } 
        const newPost = await Post.create({
            description,
            userId: user._id
        })
        res.status(200).json(newPost)
    } catch (e) {
        console.error(e);
        res.status(500).json({error: "Error al crear un post"})
    }
}

const remove = async(req, res) => {
    try {
        const {id} = req.params
        await Post.findByIdAndDelete(id)
        // Falta hacer que elimine sus comnetarios asociados
    } catch (e) {
        console.error(e);
        res.status(500).json({e: "Error al remover el usuario"})
    }
}

const update = async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        await Post.findByIdAndUpdate({id, description})
    } catch(e) {
        console.error(e);
        res.status(500).json({error: "Error al actualizar el post"})
    }
}

// Pendientes 

const addImage = async(req, res) => {
    try {

    } catch(e) {
        console.error(e);
        res.status(500).json({e: "Error al asociar imágen al post"})
    }
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
}