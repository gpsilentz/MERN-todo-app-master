const express = require('express');
const { userAuthenticated } = require('../utils/auth');

const TodoValidator = require('../validators/todoValidator');
const Validator = require('../middlewares/validationmw');

const todoController = require('../controllers/todoController');

const router = express.Router();

router.post('/save', userAuthenticated, TodoValidator, Validator, todoController.saveTodo);
router.get('/get', userAuthenticated, todoController.getTodos);
router.post('/set/:id', userAuthenticated, todoController.completedTodo);
router.post('/delete/:id', userAuthenticated, todoController.deleteTodo);
router.get('/getcompleted', userAuthenticated, todoController.getCompletedTodos);

module.exports = router;