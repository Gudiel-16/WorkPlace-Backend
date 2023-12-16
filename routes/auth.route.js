const express = require('express');
const router = express.Router();

const {
    sign_in
} = require('../controllers/auth.controller');

router.route('/signin').post(sign_in);

module.exports = router;