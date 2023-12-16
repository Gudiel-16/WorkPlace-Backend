const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/validateToken.midd');

const {
    insert_user,
    update_user,
    delete_user,
    get_all_user,
    get_user_by_id,
    load_users_xlsx
} = require('../controllers/user.controller');

router.route('/user').post(insert_user)
                     .put(verifyToken, update_user)
                     .get(verifyToken, get_all_user)
                     .delete(verifyToken, delete_user);

router.route('/user/:userID').get(verifyToken, get_user_by_id);

router.route('/user/loadusers').post(verifyToken, load_users_xlsx);

module.exports = router;