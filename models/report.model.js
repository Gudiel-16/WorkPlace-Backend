const { executeWithParams } = require('../helpers/execute.helper');

const reportUserAvailableOrNotAvaialableOrAll = (params, callback) => {

    let query = '';

    const data = [
        params.date
    ];

    switch (params.filter) {
        case "available":
            query = "CALL SPUsersAvailable(?);"
            break;
        case "notavailable":
            query = "CALL SPUsersNotAvailable(?);"
            break;
        default:
            query = "CALL SPUsersAvailableAndNotAvailable(?);";
            break;
    }

    return executeWithParams(query, data, callback);
};

module.exports = { reportUserAvailableOrNotAvaialableOrAll };