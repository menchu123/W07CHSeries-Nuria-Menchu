const { Joi } = require("joi-oid");

const createPlatformSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

const updatePlatformSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    id: Joi.objectId().required(),
  }),
};

module.exports = { createPlatformSchema, updatePlatformSchema };
