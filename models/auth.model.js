const { executeWithParams } = require('../helpers/execute.helper');

const signIn = (params, callback) => {

    const data = [
        params.userName
    ];

    const query = `CALL SPSignIn(?);`;

    return executeWithParams(query, data, callback);
};

module.exports = { signIn };