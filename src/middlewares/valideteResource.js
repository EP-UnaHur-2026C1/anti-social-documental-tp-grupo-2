const Comment = require('../../models/Comment');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Tag = require('../../models/Tag');

const validateCommentExists = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: 'Comentario no encontrado, prueba cambiando el id' });
    req.comment = comment;
    next();
  } catch(e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}

const validatePostExists = async (req, res, next) => {
  try {
    const postId = req.params.postId || req.params.id; // Soporta tanto /posts/:id como /comments/:postId
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({error: 'Post no encontrado, prueba cambiando el id'});
    req.post = post
    next();
  } catch(e) {
    console.error(e);
    res.status(500).json({error: e.message})
  }
}

const validateUserExists = async (req, res, next) => {
  try {
    const user = await User.findOne({ nickname: req.params.nickname });
    if (!user) return res.status(404).json({error: 'User no encontrado, prueba cambiando el nickname'});
    req.user = user;
    next();
  } catch(e) {
    console.error(e);
    res.status(500).json({error: e.message})
  }
}

const validateFollowedUserExists = async(req, res, next) => {
  try {
    const user = await User.findOne({nickname: req.params.followedNickname});
    if(!user) return res.status(404).json({error: "Usuarios a seguir no encontrado"})
    req.followed = user;
    next()
  } catch(e) {
    res.status(500).json({error: e.message})
  }
}

const validateImageExists = async (req, res, next) => {
  try {
    const image = req.post.images.id(req.params.imageId);
    if (!image) return res.status(404).json({ error: 'Imagen no encontrada' });
    req.image = image;
    next();
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};

const validateTagExists = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.tagId);
    if (!tag) return res.status(404).json({ error: 'Tag no encontrado' });
    req.tag = tag;
    next();
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
};

// Validar que el tag NO esté ya asociado (para addTag)
const validateTagNotAssociated = async (req, res, next) => {
  if (req.post.tags.includes(req.tag._id))
    return res.status(409).json({ error: 'El tag ya está asociado a este post' });
  next();
};

// Validar que el tag SÍ esté asociado (para removeTag)
const validateTagAssociated = async (req, res, next) => {
  const isAssociated = req.post.tags.some(t => t.toString() === req.params.tagId);
  if (!isAssociated)
    return res.status(404).json({ error: 'El tag no estaba asociado a este post' });
  next();
};

const validateUserIdExists = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).json({error: 'Usuario no encontrado'});
    req.userFromBody = user;
    next();
  } catch(e) {
    console.error(e);
    res.status(500).json({error: e.message})
  }
}

module.exports = {
  validateCommentExists,
  validatePostExists,
  validateUserExists,
  validateFollowedUserExists,
  validateImageExists,
  validateTagExists,
  validateTagNotAssociated,
  validateTagAssociated,
  validateUserIdExists
}