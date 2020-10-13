const express = require("express");
const RegisterRouter = express.Router();
const UserService = require("../../Services/UserService/UserService");

RegisterRouter
    .route("/register")
    .post((req, res)=>{
        const {
            first_naame,
            last_name,
            address,
            suite,
            city,
            state,
            zip_code,
            email,
            mobile_number,
            password
        } = req.body;

        const newUser = {
            first_naame,
            last_name,
            address,
            suite,
            city,
            state,
            zip_code,
            email,
            mobile_number,
            password
        };

        for( const [ key, value] of Object.entries(newUser)){
            if(value === undefined){

                return res.status(400).json({
                    error:  `Missing ${key} in body request`
                });
            };
        };

        UserService.getUser( req.app.get("db"), newUser.email)
            .then( dbUser => {

                if(dbUser){

                    return res.status(400).json({
                        error: `User with email: ${newUser.email} already exists`
                    });
                };

                UserService.hashPassword(newUser.password)
                    .then( hashedpassword => {
                        newUser.password = hashedpassword;

                        UserService.createUser( req.app.get("db"), newUser)
                        .then( createdUser => {

                            const subject = newUser.email;
                            const payload = {
                                user: newUser.email
                            };

                            console.log("Created user: ", createdUser);

                            return res.status(200).json({
                                token: UserService.createToken( subject, payload)
                            });
                        });
                    });
            });

    });

module.exports = RegisterRouter;