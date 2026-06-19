const Joi = require("joi");

const tagSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
});

const tagUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(50),
}).min(1);

module.exports = { tagSchema, tagUpdateSchema };
