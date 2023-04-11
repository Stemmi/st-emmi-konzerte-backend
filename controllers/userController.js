const users = require("../data/users.json");

async function allUsersHandler(req, res) {
    try {
        res.json(users.users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function userByIdHandler(req, res) {
    try {
        
        res.json(users.users[req.params.id]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    allUsersHandler,
    userByIdHandler
}