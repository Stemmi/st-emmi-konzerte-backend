const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    timezone: "UTC"
});

function query(sql, params = []) {
    return new Promise (function (resolve, reject) {
        connection.query(sql, params, function(err, results){
            if (err) {
                reject(err);
                return;
            }
            resolve(results);
        });
    });
}

async function startTransaction() {
    const results = await query("START TRANSACTION;");
    return results;
}

async function commit() {
    const results = await query("COMMIT;");
    return results;
}

async function rollback() {
    const results = await query("ROLLBACK;");
    return results;
}

module.exports = {
    query,
    startTransaction,
    commit,
    rollback
};