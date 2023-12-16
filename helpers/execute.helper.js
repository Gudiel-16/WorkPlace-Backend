const mysqlConnection = require('../database/config');

const executeWithParams = (query, params, callback) => {
    mysqlConnection.query(query, params, (err, res) => callback(err, res));
};

const executeWithoutParams = (query, callback) => {
    mysqlConnection.query(query, (err, res) => callback(err, res));
};

module.exports = { executeWithParams, executeWithoutParams };