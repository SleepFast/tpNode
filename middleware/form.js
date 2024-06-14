const { body, validationResult } = require('express-validator');

const loginValidationRules = () => {
    return [
        body('email').trim().isEmail().withMessage('Email malformed').notEmpty().withMessage('Email is required'),
        body('password').trim().notEmpty().withMessage('Password is required')
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
};

module.exports = {
    loginValidationRules,
    validate,
};
