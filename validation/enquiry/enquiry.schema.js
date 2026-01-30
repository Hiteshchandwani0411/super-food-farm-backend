const joi = require("@hapi/joi");

const schema = {
  enquiry: joi.object({
    company_name: joi.string().required(),
    username: joi.string().required(),
    mobile: joi.string().required(), 
    email: joi.string().email().required(),

    source: joi.string().optional().allow(""),
    tag: joi.string().optional().allow(""),
    status: joi.string().valid('pending', 'active', 'closed').default('pending'),

    city: joi.string().required(),
    pin_code: joi.string().required(),
    state: joi.string().required(),
    budget: joi.number().required(),
    industry: joi.string().required(),
    designation: joi.string().required(),
    quantity: joi.number().required(),
    event_date: joi.date().required(),
    keyword: joi.string().optional().allow(""),
    created_by: joi.string().optional().allow(""),
  }),
};

module.exports = schema;
