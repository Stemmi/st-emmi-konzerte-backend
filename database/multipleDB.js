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

async function deleteShow(showId) {
    try {
        db.startTransaction();
        await showsHasBandsDB.deleteAllBandsFromShow(showId);
        const response = await showsDB.deleteShow(showId);
        db.commit();
        return response;
    } catch (err) {
        db.rollback();
        throw err;
    }
}

module.exports = {
    insertShowWithBands,
    updateShowWithBands,
    deleteShow
}
