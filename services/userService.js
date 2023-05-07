const usersDB = require("../database/usersDB.js");

async function getUsers() {
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
            count,
            results
        }        
        return response;

    } catch (error) {
        throw error;
    }
}

async function getUserById(id) {
    try {
        const user = await usersDB.getUserById(id);
        const response = {
            id: user.id,
            name: user.name,
            image: user.image,
        }
        return response;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUsers,
    getUserById
}