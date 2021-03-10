const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    isAdmin: {
        default: false,
        type: Boolean
    },
    created_at: {
        default: Date.now(),
        type: Date
    }
});

module.exports = mongoose.model('users', UserSchema);