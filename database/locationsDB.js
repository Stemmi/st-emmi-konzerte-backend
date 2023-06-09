const db = require("./db.js");

async function countLocations() {
    const dbQuery = "SELECT COUNT(id) AS total FROM locations;";
    const results = await db.query(dbQuery);
    return results[0].total;
}

async function getLocations() {
    const dbQuery = "SELECT * FROM locations ORDER BY city, name;";
    const results = await db.query(dbQuery);
    return results;
}

async function getLocationsByIds(ids) {
    const dbQuery = `SELECT * FROM locations WHERE id in (?);`;
    const results = await db.query(dbQuery, [ids]);
    return results;
}

async function getLocationById(id) {
    const dbQuery = "SELECT * FROM locations WHERE id = ?;";
    const results = await db.query(dbQuery, id);
    return results[0];
}

async function insertLocation(params) {
    const dbQuery = "INSERT INTO locations (name, city, url, latitude, longitude) VALUES (?, ?, ?, ?, ?);";
    const results = await db.query(dbQuery, params);
    return results;
}

module.exports = {
    countLocations,
    getLocations,
    // getLocationsByIds,
    getLocationById,
    insertLocation
}