const joi = require("@hapi/joi");

const schema = {
  product: joi.object({
    tag: joi.string().required(),
    category: joi.string().required(),
    title: joi.string().required(), 
    star: joi.number().required(),
    product_sold: joi.string().valid("true", "false").required(),
    product_desc: joi.string().required(),
    actual_price: joi.number().required(),
    discounted_price: joi.number().required(),
    created_by: joi.string().required(),
  }),
};

module.exports = schema;