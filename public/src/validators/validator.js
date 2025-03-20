const Joi = require('joi');
const ErrorHandling = require('../utils/errors/errorHandling');

const schema = Joi.object({
    userId: Joi.number().integer().positive().required().messages({
        'number.base': '"userId" must be a number.',
        'any.required': '"userId" is required.',
        'number.positive': '"userId" must be a positive number.',
        'number.integer': '"userId" must be an integer.',
    }),
    amount: Joi.number().not(0).required().messages({
        'number.base': '"amount" must be a number.',
        'any.required': '"amount" is required.',
        'number.positive': '"amount" must be a positive or negative number (not 0).',
        'number.not': '"amount" cannot be 0.',
    }),
});

const validateUpdateBalance = (data) => {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
        throw new ErrorHandling(
            `Validation Error: ${error.details.map((err) => err.message).join("; ")}`
        );

    }
};

module.exports = {validateUpdateBalance}