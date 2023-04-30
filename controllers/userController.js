const usersDB = require("../databases/usersDB.js");

async function allUsersHandler(req, res) {
    try {
        const count = await usersDB.countUsers();
        const users = await usersDB.getUsers();

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
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function userByIdHandler(req, res) {
    try {
        const user = await usersDB.getUserById(req.params.id);

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