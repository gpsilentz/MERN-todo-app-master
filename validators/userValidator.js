const validator = require('express-validator');

const username = validator.check('username', 'Username is required').not().isEmpty();
const password = validator.check('password', 'Password minimum lenght is 3').isLength({ min: 3 });
const email = validator.check('email').isEmail();

const authValidation = [username, password];
const registerValidation = [username, password, email];

module.exports = {
    authValidation,
    registerValidation
};