const Joi = require("joi");

// Estos son los schemas para validar los posibles parámetros que pueden venir en la URL, como el id de un usuario, el id de una imagen o el id de un tag. 

const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

const postImageParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  imageId: Joi.number().integer().positive().required(),
});

const postTagParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
  tagId: Joi.number().integer().positive().required(),
});

const userFollowParamSchema = Joi.object({
  nickname: Joi.string().min(3).max(50).required(),
  followedId: Joi.string().min(3).max(50).required(),
});

const nicknameParamSchema = Joi.object({
  nickname: Joi.string().min(3).max(50).required(),
});

module.exports = { idParamSchema, postImageParamSchema, postTagParamSchema, userFollowParamSchema, nicknameParamSchema };
