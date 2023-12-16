const agendaModel = require('../models/agenda.model');
const { response } = require('../helpers/response.helper');

const insert_agenda = async (req, res) => {
    try {

        agendaModel.insertAgenda(req.body, (err, results) => {
            if (err) return response(res, 400, 'Error when inserting agenda.', [err]);

            response(res, 200, 'Agenda created successfully', results);
        });

    } catch (error) {
        return response(res, 500, 'Error when inserting agenda.', [error]);
    }
};

const update_agenda = async (req, res) => {
    try {

        agendaModel.updateAgenda(req.body, (err, results) => {
            if (err) return response(res, 400, 'Error when updating agenda.', [err]);

            response(res, 200, 'Agenda updated successfully', results);
        });

    } catch (error) {
        return response(res, 500, 'Error when updating agenda.', [error]);
    }
};

const delete_all_by_id_user = (req, res) => {
    try {

        agendaModel.deleteAllAgendaByIdUser( req.params, (err, results) => {
            if (err) return response(res, 400, 'Error when deleting agenda.', [err]);
            
            response(res, 200, 'Agenda deleted successfully.', results);
        });

    } catch (error) {
        console.log(error);
        return response(res, 500, 'Error when deleting agenda', [error]);
    }
};

const delete_by_id_agenda = (req, res) => {
    try {

        agendaModel.deleteByIdAgenda( req.params, (err, results) => {
            if (err) return response(res, 400, 'Error when deleting agenda.', [err]);
            
            response(res, 200, 'Agenda deleted successfully.', results);
        });

    } catch (error) {
        console.log(error);
        return response(res, 500, 'Error when deleting agenda', [error]);
    }
};

const get_all_agenda = (req, res) => {

    let { page, number } = req.query;

    try {

        // paginacion
        let numberRegisterEnd = (parseInt(page) - 1) * parseInt(number); // a partir de donde se va a traer los registros
        req.query.page = numberRegisterEnd;

        agendaModel.getAllAgenda(req.query, (err, results) => {
            if (err) return response(res, 400, 'Error getting agenda.', [err]);
            
            response(res, 200, 'Agenda successfully obtained.', results[0]);
        });

    } catch (error) {
        return response(res, 500, 'Error getting agenda.', [error]);
    }
};

const get_all_agenda_by_id_user = (req, res) => {
    try {

        agendaModel.getAllAgendaByIdUser( req.params, (err, results) => {
            if (err) return response(res, 400, 'Error getting agenda.', [err]);
            
            response(res, 200, 'Agenda successfully obtained.', results[0]);
        });

    } catch (error) {
        console.log(error);
        return response(res, 500, 'Error getting agenda.', [error]);
    }
};

module.exports = { insert_agenda, update_agenda, delete_all_by_id_user, delete_by_id_agenda, get_all_agenda, get_all_agenda_by_id_user };