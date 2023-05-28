const db = require("./db.js");

async function countBands() {
    const dbQuery = "SELECT COUNT(id) AS total FROM bands;";
    const results = await db.query(dbQuery);
    return results[0].total;
}

async function getBands() {
    const dbQuery = "SELECT * FROM bands ORDER BY name;";
    const results = await db.query(dbQuery);
    return results;
}

async function getBandById(id) {
    const dbQuery = "SELECT * FROM bands WHERE id = ?;";
    const results = await db.query(dbQuery, id);
    return results[0];
}

async function getBandsByShowId(showId) {
    const dbQuery = `SELECT bands.id, bands.name, bands.url FROM shows
    JOIN shows_has_bands
    ON shows_has_bands.show_id = shows.id
    JOIN bands
    ON bands.id = shows_has_bands.band_id
    WHERE shows.id = ?;`;
    const results = await db.query(dbQuery, showId);
    return results;
}

async function insertBand(params) {
    const dbQuery = "INSERT INTO bands (name, url) VALUES (?, ?);";
    const results = await db.query(dbQuery, params);
    return results;
}

module.exports = {
    countBands,
    getBands,
    getBandById,
    getBandsByShowId,
    insertBand
}