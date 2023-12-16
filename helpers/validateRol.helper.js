const jwt = require('jsonwebtoken');
const { response } = require('../helpers/response.helper');

const isAdmin = (req, res, next) => {
       
    try {
        //ya no valida si viene cabecera o si es null, la funcion verificarToken se encarga de eso
        const token = req.headers.authorization.split(' ')[1];
        const content = jwt.verify(token, process.env.SECRET_JWT_SEED);

        if(content.typeUser == 0){
            next();
        }else{
             return response(res, 401, 'Unauthorized', []);
        }

    } catch (error) {
        console.log(error);
        return response(res, 401, 'Unauthorized', []);
    }
}

const isEmployee = (req, res, next) => {
       
    try {
        //ya no valida si viene cabecera o si es null, la funcion verificarToken se encarga de eso
        const token = req.headers.authorization.split(' ')[1];
        const content = jwt.verify(token, process.env.SECRET_JWT_SEED);

        if(content.typeUser == 1){
            next();
        }else{
             return response(res, 401, 'Unauthorized', []);
        }

    } catch (error) {
        console.log(error);
        return response(res, 401, 'Unauthorized', []);
    }
}

const getUserID = (token) => {
    return jwt.verify(token, process.env.SECRET_JWT_SEED).userID;
}

module.exports = { isAdmin, isEmployee, getUserID };