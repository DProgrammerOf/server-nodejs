const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const mongoose = require('mongoose');

module.exports = 
    function(){
        const Users = mongoose.model('User');
        const opts = {};
        opts.secretOrKey = "Secr3t";
        opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        
        passport.use(new Strategy(opts, async (payload, done) => {
            //console.log(payload.id);    
            await Users.findById(payload.id, 
           (err, user) => {
               if(err)
                done(err, false);

                if(user){ return done(null, user); }
                return done(null, false);
            });
        }));


        return {
            initialize: () => passport.initialize(),
            authenticate: () => passport.authenticate('jwt', {session: false})
        }
};