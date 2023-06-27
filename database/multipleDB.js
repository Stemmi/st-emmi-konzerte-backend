const db = require("./db.js");
const showsDB = require("./showsDB.js");
const showsHasBandsDB = require("./showsHasBandsDB.js");

async function insertShowWithBands(params, bandIds) {
    try {
        db.startTransaction();
        const response = await showsDB.insertShow(params);
        const showId = response.insertId;
        for (let bandId of bandIds) {
            await showsHasBandsDB.insertShowHasBand([showId, bandId]);
        }
        db.commit();
        return response;
    } catch (err) {
        db.rollback();
        throw err;
    }
}

async function updateShowWithBands(params, bandIds, showId) {
    try {
        db.startTransaction();
        const response = await showsDB.updateShow(params);
        await showsHasBandsDB.deleteAllBandsFromShow(showId);
        for (let bandId of bandIds) {
            await showsHasBandsDB.insertShowHasBand([showId, bandId]);
        }
        db.commit();
        return response;
    } catch (err) {
        db.rollback();
        throw err;
    }
}

module.exports = {
    insertShowWithBands,
    updateShowWithBands
}
