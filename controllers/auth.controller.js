const bcrypt = require('bcryptjs');
const authModel = require('../models/auth.model');
const { generateToken } = require('../configs/jwt');
const { response } = require('../helpers/response.helper');

const sign_in = async (req, res) => {
    try {

        const { passwordText } = req.body;

        authModel.signIn(req.body, async (err, results) => {
            if (err) return response(res, 400, 'User do not exists.', [err]);

            if (results[0].length == 0) return response(res, 400, 'User do not exists.', []); 

            // verificando password
            const validatePassword = bcrypt.compareSync(passwordText, results[0][0].passwordU);
            if(!validatePassword) return response(res, 400, 'User do not exists.', []);

            //delete results[0][0].passwordU; // eliminando campo, para no retornar

            const payload = {
                userID: results[0][0].userID,
                typeUser: results[0][0].typeUser,
            };
            
            const token = await generateToken(payload);

            response(res, 200, 'Sign in successfully', [{
                token,
                userID: results[0][0].userID,
                typeUser: results[0][0].typeUser
            }]);
        });

    } catch (error) {
        console.log(error);
        return response(res, 500, 'User do not exists.r', [error]);
    }
};

module.exports = { sign_in };