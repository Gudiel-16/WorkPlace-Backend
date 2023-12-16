const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/validateToken.midd');

const {
    report_user_available_or_not_available_or_all
} = require('../controllers/report.controller');

router.route('/report').post(verifyToken, report_user_available_or_not_available_or_all);

module.exports = router;