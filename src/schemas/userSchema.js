const Joi = require("joi");

const userSchema = Joi.object({
  nickname: Joi.string().min(3).max(50).required(),
  name: Joi.string().min(2).max(100).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
});

const userUpdateSchema = Joi.object({
  nickname: Joi.string().min(3).max(50),
  name: Joi.string().min(2).max(100),
  password: Joi.string().min(8),
  email: Joi.string().email(),
}).min(1);

module.exports = { userSchema, userUpdateSchema };
