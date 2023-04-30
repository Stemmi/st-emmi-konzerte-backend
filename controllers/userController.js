const userService = require("../services/userService.js");

async function allUsersHandler(req, res) {
    try {
        const response = userService.getUsers();
        res.json(response);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function userByIdHandler(req, res) {
    try {
        const response = userService.getUserById(req.params.id);
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