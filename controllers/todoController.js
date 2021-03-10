const Todo = require('../models/Todo');

const saveTodo = async(req, res) => {
    try {
        const { name, description } = req.body;

        const newTodo = new Todo({ name, description, created_by: req.user.username });

        await newTodo.save();

        return res.json({
            success: true,
            message: 'A new todo has been added.'
        });
    } catch (err) {
        return res.json({
            success: false,
            message: 'An error has occured.'
        });
    }
};

const getTodos = async(req, res) => {
    try {
        const todos = await Todo.find({ created_by: req.user.username });
        const filterTodos = await todos.filter(todo => todo.completed === false);

        return res.json(filterTodos);
    } catch (err) {
        return res.json({
            success: false,
            message: 'An error has occured.'
        });
    }
};

const getCompletedTodos = async(req, res) => {
    try {
        const todos = await Todo.find({ created_by: req.user.username });
        const filterTodos = await todos.filter(todo => todo.completed === true);

        return res.json(filterTodos);
    } catch (err) {
        return res.json({
            success: false,
            message: 'An error has occured.'
        });
    }
};

const completedTodo = async(req, res) => {
    try {
        const userTodo = await Todo.findById(req.params.id);

        if (userTodo.created_by !== req.user.username) {
            return res.json({
                success: false,
                message: 'This todo does not belong to you.'
            });
        }

        userTodo.completed = true;
        
        await userTodo.save();

        return res.json({
            success: true,
            message: 'Todo has been succesfully completed.'
        });
    } catch (err) {
        return res.json({
            success: false,
            message: `An error has occured. ${err}`
        })
    }
};

const deleteTodo = async(req, res) => {
    try {
        const userTodo = await Todo.findOne({ _id: req.params.id });

        if (userTodo.created_by !== req.user.username) {
            return res.json({
                success: false,
                message: 'This todo does not belong to you.'
            });
        }
        
        await userTodo.remove();

        return res.json({
            success: true,
            message: 'The todo has been deleted.'
        });
    } catch (err) {
        return res.json({
            success: false,
            message: `An error has occured. ${err}`
        });
    }
};

module.exports = {
    saveTodo,
    getTodos,
    completedTodo,
    getCompletedTodos,
    deleteTodo
}