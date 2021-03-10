const { validationResult } = require('express-validator');

const validator = (req, res, next) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
    }

    next();
};

module.exports = validator;
