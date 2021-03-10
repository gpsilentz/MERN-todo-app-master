const validator = require('express-validator');

const todo_name = validator.check('name', 'Todo name is required').not().isEmpty();
const todo_description = validator.check('description', 'Todo description is required').not().isEmpty();

const todo_checker = [todo_name, todo_description];

module.exports = todo_checker;