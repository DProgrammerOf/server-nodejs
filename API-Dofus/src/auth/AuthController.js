const mongoose = require('mongoose');
const jwt = require('jwt-simple');

const Users = mongoose.model("User");

async function authentication(req, res){
    if(req.body.email && req.body.password){
        let inemail = req.body.email;
        let inpassword = req.body.password;
        //console.log(inpassword);
        const UserReal = await Users.findOne({email:inemail});
        //console.log(UserReal.name);

        await Users.findOne({email:inemail}, (err, user) => {
            if(err)
                res.sendStatus(401);

            if(user)
                res.json({
                    token: jwt.encode({id:user._id}, 'Secr3t')
                });
            else
                res.sendStatus(401);
        });
    } else{
        res.sendStatus(401);
    }
}

module.exports = { authentication }