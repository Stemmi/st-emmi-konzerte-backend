const usersDB = require("../database/usersDB.js");

async function getUsers() {
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
        count,
        results
    }        
    return response;
}

async function getUserById(id) {
    const user = await usersDB.getUserById(id);
    const response = {
        id: user.id,
        name: user.name,
        image: user.image,
    }
    return response;
}

module.exports = {
    getUsers,
    getUserById
}