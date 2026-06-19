const Joi = require("joi");

const postImageSchema = Joi.object({
  url: Joi.string().uri().required(),
});

module.exports = { postImageSchema };
