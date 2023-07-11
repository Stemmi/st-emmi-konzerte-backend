const db = require("./db.js");

async function insertShowHasBand(params) {
    const dbQuery = "INSERT INTO shows_has_bands (show_id, band_id) VALUES (?, ?);";
    const results = await db.query(dbQuery, params);
    return results;
}

async function deleteAllBandsFromShow(showId) {
    const dbQuery = "DELETE FROM shows_has_bands WHERE show_id = ?;";
    const results = await db.query(dbQuery, [showId]);
    return results;
}

module.exports = {
    insertShowHasBand,
    deleteAllBandsFromShow
}