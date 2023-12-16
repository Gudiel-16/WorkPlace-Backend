const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/validateToken.midd');

const {
    insert_agenda,
    update_agenda,
    delete_all_by_id_user,
    delete_by_id_agenda,
    get_all_agenda,
    get_all_agenda_by_id_user
} = require('../controllers/agenda.controller');

router.route('/agenda').post(verifyToken, insert_agenda)
                        .put(verifyToken, update_agenda)
                        .get(verifyToken, get_all_agenda);

router.route('/agenda/all/:userID').delete(verifyToken, delete_all_by_id_user);
router.route('/agenda/:agendaID').delete(verifyToken, delete_by_id_agenda);

router.route('/agenda/:userID').get(verifyToken, get_all_agenda_by_id_user);                        

module.exports = router;