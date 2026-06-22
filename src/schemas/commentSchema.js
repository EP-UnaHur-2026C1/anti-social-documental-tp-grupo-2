const Joi = require('joi');
 
const commentSchema = Joi.object({
  content: Joi.string().min(1).required(),
  userId:  Joi.string().hex().length(24).required(),
});
 
const commentUpdateSchema = Joi.object({
  content: Joi.string().min(1),
}).min(1);
 
module.exports = { 
    commentSchema, 
    commentUpdateSchema
};