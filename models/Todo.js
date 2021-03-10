const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    created_by: {
        default: 'none',
        type: String
    },
    created_at: {
        default: Date.now(),
        type: Date
    },
    completed: {
        default: false,
        type: Boolean
    }
});

module.exports = mongoose.model('todos', TodoSchema);