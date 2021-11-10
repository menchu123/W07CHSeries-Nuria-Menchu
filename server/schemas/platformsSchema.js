const { Joi } = require("express-validation");

const createPlatformSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

const updatePlatformSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

module.exports = { createPlatformSchema, updatePlatformSchema };
