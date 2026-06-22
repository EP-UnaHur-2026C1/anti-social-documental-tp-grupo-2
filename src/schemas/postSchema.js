const Joi = require('joi');
 
const postSchema = Joi.object({
  description: Joi.string().min(1).required(),
});
 
const postUpdateSchema = Joi.object({
  description: Joi.string().min(1),
}).min(1);
 
const postTagSchema = Joi.object({
  tagId: Joi.string().hex().length(24).required(),
});
 
module.exports = { 
    postSchema,
    postUpdateSchema,
    postTagSchema
};