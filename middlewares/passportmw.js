const { Strategy, ExtractJwt } = require('passport-jwt');
const { APP_SECRET_KEY } = require('../constants/config');
const User = require('../models/User');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: APP_SECRET_KEY
};

const psp = async(passport) => {
    passport.use(new Strategy(opts, async(payload, done) => {
        try {
            const user = await User.findById(payload.id);

            if (user)
                return done(null, user);
    
            return done(null, false);
        } catch (err) {
            return done(null, false);
        }
    }));
};

module.exports = psp;