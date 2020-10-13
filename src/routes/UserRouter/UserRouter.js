const express = require("express");
const UserRouter = express.Router();
const UserService = require("../../Services/UserService/UserService");

UserRouter
    .route("/users")
    .get((req, res)=>{
        UserService.getUser(req.app.get("db"), req.user.id)
            .then( user => {

                if(!user){

                    return res.status(404).json({
                        error: `User: ${req.user.id} does not exist`
                    });
                };

                delete user["password"];

                return res.status(200).json({
                    user
                });
            });
    });

UserRouter
    .route("/users/:id")
    .patch((req, res)=> {
        UserService.getUser( req.app.get("db"), req.params.id)
            .then( dbUser => {

                if(!dbUser){

                    return res.status(404).json({
                        error: `User with id ${req.params.id}  does not exist.`
                    });
                };

                UserService.updateUser( req.app.get("db"), req.body, req.params.id)
                    .then( updatedUser => {

                        return res.status(200).json({
                            success: `User: ${req.params.id} has been updated.`
                        });
                    });             
            });
    });

module.exports = UserRouter;