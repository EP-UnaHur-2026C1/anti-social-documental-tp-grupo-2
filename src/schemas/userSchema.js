const Joi = require('joi');
 
const userSchema = Joi.object({
  nickname: Joi.string().min(3).max(50).required(),
  name:     Joi.string().min(2).max(100).required(),
  email:    Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
 
const userUpdateSchema = Joi.object({
  nickname: Joi.string().min(3).max(50),
  name:     Joi.string().min(2).max(100),
  email:    Joi.string().email(),
  password: Joi.string().min(8),
}).min(1);
 
module.exports = { 
    userSchema,
    userUpdateSchema
};