const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { APP_SECRET_KEY } = require('../constants/config');

const saveUser = async(req, res) => {
    try {
        const { username } = req.body;

        let user = await User.findOne({ username });

        if (user) {
            return res.json({
                success: false,
                message: 'Username already exists.'
            });
        }

        let hashedPass = await bcrypt.hash(req.body.password, 10);

        user = new User({
            ...req.body,
            password: hashedPass
        });

        await user.save();

        return res.json({
            success: true,
            message: 'User added.'
        });
    } catch (err) {
        return res.json({
            success: false,
            message: `An error occured: ${err}`
        });
    }
};

const authUser = async(req, res) => {
    try {
        const { username, password } = req.body;

        let user = await User.findOne({ username });
    
        if (!user) {
            return res.json({
                success: false,
                message: 'Username is incorrect'
            });
        }

        let isMatched = await bcrypt.compare(password, user.password);

        if (isMatched) {
            let token = await jsonwebtoken.sign({
                id: user._id,
                username: user.username,
                isAdmin: user.isAdmin
            }, APP_SECRET_KEY, { 
                expiresIn: '31 days' 
            });

            return res.json({
                success: true,
                message: 'Successfully authenticated',
                user: {
                    id: user._id, 
                    isAdmin: user.isAdmin, 
                    username: user.username, 
                    token: `Bearer ${token}`
                }
            });
        } else {
            return res.json({
                success: false,
                message: 'Username or password is incorrect'
            });
        }
    } catch (err) {
        return res.json({
            success: false,
            message: 'An error occured'
        });
    }
};

const findUser = async(req, res) => {
    try {
        const { username } = req.user;

        const user = await User.findOne({ username });

        if (user) {
            return res.json({
                success: true,
                message: 'User found'
            });
        }

        return res.json({
            success: true,
            message: 'User not found'
        });
    } catch (err) {
        return res.json({
            success: false,
            message: `An error occured ${err}`
        });
    }
};

module.exports = {
    saveUser,
    authUser,
    findUser
};