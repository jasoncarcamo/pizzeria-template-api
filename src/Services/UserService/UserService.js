const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../../../config");

function lowercase(obj){
    let newObj = {

    };

    for( const [key, value] of Object.entries(obj)){
        newObj.prototype[key] = (key).toString().toLowerCase();
    };
    console,log(newObj)
    return obj;
}

const UserService = {
    getUser( db, email){

        return db.select().from("users").where({ email }).first();
    },
    createUser( db, user){
        return db.insert(user).from("users").returning("*").then( ([newUser]) => newUser);
    },
    updateUser( db, updateUser, id){

        return db.update(updateUser).from("users").where({ id }).returning("*").then(([updatedUser]) => updatedUser);
    },
    deleteUser( db, id){

        return db.delete().from("users").where({ id });
    },
    hashPassword(password){

        return bcrypt.hash( password, 12);
    },
    comparePassword(password, dbPassword){

        return bcrypt.compare( password, dbPassword);
    },
    createToken( subject, payload){

        return jwt.sign( payload, JWT_SECRET, {
            subject,
            algorithm: "HS256"
        });
    }
};

module.exports = UserService;