const { executeWithParams, executeWithoutParams } = require('../helpers/execute.helper');

const insertAgenda = (params, callback) => {

    const data = [
        params.place,
        params.dateWorkStart,
        params.dateWorkEnd,
        params.userID
    ];

    const query = `CALL SPInsertAgenda(?,?,?,?);`;

    return executeWithParams(query, data, callback);
};

const updateAgenda = (params, callback) => {

    const data = [
        params.agendaID,
        params.place,
        params.dateWorkStart,
        params.dateWorkEnd,
    ];

    const query = `CALL SPUpdateAgenda(?,?,?,?);`;

    return executeWithParams(query, data, callback);
};

const deleteAllAgendaByIdUser = (params, callback) => {
    
    const data = [
        params.userID
    ];

    const query = `CALL SPDeleteAllAgendaByIdUser(?);`;

    return executeWithParams(query, data, callback);
};

const deleteByIdAgenda = (params, callback) => {
    
    const data = [
        params.agendaID
    ];

    const query = `CALL SPDeleteAgendaById(?);`;

    return executeWithParams(query, data, callback);
};

const getAllAgenda = (params, callback) => {
    
    const data = [
        params.page,
        params.number,
    ];

    const query = `CALL SPGetAllAgenda(?,?);`;

    return executeWithParams(query, data, callback);
};

const getAllAgendaByIdUser = (params, callback) => {
    
    const data = [
        params.userID
    ];

    const query = `CALL SPGetAllAgendaById(?);`;

    return executeWithParams(query, data, callback);
};

module.exports = { insertAgenda, updateAgenda, deleteByIdAgenda, deleteAllAgendaByIdUser, getAllAgenda, getAllAgendaByIdUser };