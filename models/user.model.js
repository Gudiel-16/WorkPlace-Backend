const { executeWithParams, executeWithoutParams } = require('../helpers/execute.helper');

const insertUser = (params, callback) => {

    const data = [
        params.firstName,
        params.lastName,
        params.userName,
        params.passwordU,
        params.phoneNumber,
        params.typeUser,
        params.urlPhoto,
        params.publicIdPhoto,
    ];

    const query = `CALL SPInsertUser(?,?,?,?,?,?,?,?);`;

    return executeWithParams(query, data, callback);
};

const updateUser = (params, callback) => {

    const data = [
        params.userID,
        params.firstName,
        params.lastName,
        params.userName,
        params.phoneNumber,
        params.typeUser,
        params.urlPhoto,
        params.publicIdPhoto,
    ];

    const query = `CALL SPUpdateUser(?,?,?,?,?,?,?,?);`;

    return executeWithParams(query, data, callback);
};

const deleteUser = (params, callback) => {

    const data = [
        params.userID
    ];

    const query = `CALL SPDeleteUser(?);`;

    return executeWithParams(query, data, callback);
};

const getAllUser = (callback) => {
    
    const query = `CALL SPGetAllUser();`;

    return executeWithoutParams(query, callback);
};

const getUserById = (params, callback) => {
    
    const data = [
        params.userID
    ];

    const query = `CALL SPGetUserById(?);`;

    return executeWithParams(query, data, callback);
};

const loadUsersXlsx = (params, callback) => {
    
    let query = `INSERT INTO Users(firstName, lastName, userName, passwordU, phoneNumber, typeUser, urlPhoto, publicIdPhoto) `
                + `VALUES ${params.values_query}`;

    return executeWithParams(query, params.values, callback);
};

module.exports = { insertUser, updateUser, deleteUser, getAllUser, getUserById, loadUsersXlsx };