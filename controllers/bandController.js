const db = require("../databases/db.js");
const bandsDB = require("../databases/bandsDB.js");

// async function allBandsHandler(req, res) {
//     try {
//         db.startTransaction();
//         const count = await bandsDB.countBands();
//         const bands = await bandsDB.getBands();
//         db.commit();

//         const results = bands.map(function(band) {
//             return {
//                 id: band.id,
//                 name: band.name,
//                 url: band.url
//             }
//         });
//         const response = {
//             count: count,
//             results: results
//         }
        
//         res.json(response);
//     } catch (error) {
//         db.rollback();
//         console.log(error);
//         res.status(500).send("Internal Server Error");
//     }
// }

// async function bandByIdHandler(req, res) {
//     try {
//         const band = await bandsDB.getBandById(req.params.id);
//         const response = {
//             id: band.id,
//             name: band.name,
//             url: band.url
//         }

//         res.json(response);

//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal Server Error");
//     }
// }

async function bandsBySHowHandler(req, res) {
    try {
        db.startTransaction();
        const bands = await bandsDB.getBandsByShowId(req.params.id);
        db.commit();

        const results = bands.map(function(band) {
            return {
                id: band.id,
                name: band.name,
                url: band.url
            }
        });
        const response = {
            count: count,
            results: results
        }
        
        res.json(response);
    } catch (error) {
        db.rollback();
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    // allBandsHandler,
    // bandByIdHandler,
    bandsBySHowHandler
}