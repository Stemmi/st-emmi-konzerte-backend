const db = require("./db.js");

async function countBands() {
    const dbQuery = "SELECT COUNT(id) AS total FROM bands;";
    const results = await db.query(dbQuery);
    return results[0].total;
}

async function getBands() {
    const dbQuery = "SELECT * FROM bands;";
    const results = await db.query(dbQuery);
    return results;
}

async function getBandById(id) {
    const dbQuery = "SELECT * FROM bands WHERE id = ?;";
    const results = await db.query(dbQuery, id);
    return results[0];
}

module.exports = {
    countBands,
    getBands,
    getBandById
}