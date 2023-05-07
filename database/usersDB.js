const db = require("./db.js");

async function countUsers() {
    const dbQuery = "SELECT COUNT(id) AS total FROM users;";
    const results = await db.query(dbQuery);
    return results[0].total;
}

async function getUsers() {
    const dbQuery = "SELECT * FROM users;";
    const results = await db.query(dbQuery);
    return results;
}

async function getUsersByIds(ids) {
    const dbQuery = `SELECT * FROM users WHERE id in (?);`;
    const results = await db.query(dbQuery, [ids]);
    return results;
}

async function getUserById(id) {
    const dbQuery = "SELECT * FROM users WHERE id = ?;";
    const results = await db.query(dbQuery, id);
    return results[0];
}

module.exports = {
    // countUsers,
    // getUsers,
    getUsersByIds,
    getUserById
}