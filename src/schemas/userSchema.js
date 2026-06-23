const Joi = require('joi');
 
const userSchema = Joi.object({
  nickname: Joi.string().min(3).max(50).required(),
  email:    Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
 
const userUpdateSchema = Joi.object({
  nickname: Joi.string().min(3).max(50),
  email:    Joi.string().email(),
  password: Joi.string().min(8),
}).min(1);
 
module.exports = { 
    userSchema,
    userUpdateSchema
};