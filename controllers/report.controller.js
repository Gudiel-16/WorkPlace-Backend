const reportModel = require('../models/report.model');
const { response } = require('../helpers/response.helper');

const report_user_available_or_not_available_or_all = async (req, res) => {
    try {

        reportModel.reportUserAvailableOrNotAvaialableOrAll(req.body, (err, results) => {
            if (err) return response(res, 400, 'Error when getting available users.', [err]);

            response(res, 200, 'Users getting successfully', results[0]);
        });

    } catch (error) {
        return response(res, 500, 'Error when getting available users.', [error]);
    }
};

module.exports = { report_user_available_or_not_available_or_all };