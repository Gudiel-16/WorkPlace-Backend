const jwt = require('jsonwebtoken');
const { response } = require('../helpers/response.helper');

const verifyToken = (req, res, next) => {

    //valido si viene cabecera de autorizacion
    if(!req.headers.authorization){
        return response(res, 401, 'Unauthorized', []);
    }

    //valido si no esta vacio
    const token = req.headers.authorization.split(' ')[1];
    if(token==='null'){
        return response(res, 401, 'Unauthorized', []);
    }

    try {
        //Verifico token
        const contenido = jwt.verify(token, process.env.SECRET_JWT_SEED);
        
        if(!contenido){
            return response(res, 401, 'Unauthorized', []);
        }

        next();

    } catch (error) {
        console.log(error);
        return response(res, 401, 'Unauthorized', []);
    }
}

module.exports = { verifyToken };