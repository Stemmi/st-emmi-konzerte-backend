const db = require("../databases/db.js");
const userDB = require("../databases/userDB.js");

async function allUsersHandler(req, res) {
    try {
        db.startTransaction();
        const count = await userDB.countUsers();
        const users = await userDB.getUsers();
        db.commit();

        const results = users.map(function(user) {
            return {
                id: user.id,
                name: user.name,
                image: user.image
            }
        });
        const response = {
            count: count,
            results: results
        }
        
        res.json(response);
    } catch (error) {
        db.rollback();
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function userByIdHandler(req, res) {
    try {
        const user = await userDB.getUserById(req.params.id);
        const response = {
            id: user.id,
            name: user.name,
            image: user.image,
        }

        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    allUsersHandler,
    userByIdHandler
}