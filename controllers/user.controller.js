const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const { response } = require('../helpers/response.helper');
const { uploadImage, deleteImage } = require('../utils/cloudinary');

const insert_user = async (req, res) => {
    try {

        // obtengo imagen base64 y password
        const { passwordText } = req.body;
        let { file } = req.body;

        file = file != undefined ? file : '';

        // validando que la imagen venga
        if(file != ''){

            // validando formato de imagen, ahora -> data:image/png;base64,.....
            let firstSemicolon = file.indexOf(';'); // numero donde se encuentra ';'
            let cutName = file.substring(0,firstSemicolon); // ahora -> data:image/png
            let arrExtension = cutName.split('/'); // ahora -> [data:image, png]
            let extensionImage = arrExtension[arrExtension.length -1];

            const extensionesValidas = ['png','jpg','jpeg'];
            if (!extensionesValidas.includes(extensionImage)) {
                return response(res, 400, 'Image extension not allowed', []);
            }
            
            // guardo imagen
            const responseCloudinary = await uploadImage(file);

            // // obtengo propiedades de imagen
            req.body.urlPhoto = responseCloudinary.secure_url;
            req.body.publicIdPhoto = responseCloudinary.public_id;
        }else{
            req.body.urlPhoto = "https://res.cloudinary.com/duwauerec/image/upload/v1701214475/users/yjhtsgt8q5ts4iw7gddh.jpg";
            req.body.publicIdPhoto = null;
        }        

        // // encriptar password
        const salt = bcrypt.genSaltSync();
        req.body.passwordU = bcrypt.hashSync(passwordText, salt);

        userModel.insertUser(req.body, (err, results) => {
            if (err) return response(res, 400, 'Error when inserting user.', [err]);

            response(res, 200, 'User created successfully', results);
        });

    } catch (error) {
        return response(res, 500, 'Error when inserting user.', [error]);
    }
};

const update_user = async (req, res) => {
    try {

        // obtengo imagen base64
        let { file, publicIdPhoto } = req.body;

        file = file != undefined ? file : '';

        // validando que la imagen venga
        if(file != ''){

            // validando formato de imagen, ahora -> data:image/png;base64,.....
            let firstSemicolon = file.indexOf(';'); // numero donde se encuentra ';'
            let cutName = file.substring(0,firstSemicolon); // ahora -> data:image/png
            let arrExtension = cutName.split('/'); // ahora -> [data:image, png]
            let extensionImage = arrExtension[arrExtension.length -1];

            const extensionesValidas = ['png','jpg','jpeg'];
            if (!extensionesValidas.includes(extensionImage)) {
                return response(res, 400, 'Image extension not allowed', []);
            }
            
            // elimino foto anterior y guardo la nueva
            await deleteImage(publicIdPhoto);
            const responseCloudinary = await uploadImage(file);

            // actualizamos propiedades de imagen
            req.body.urlPhoto = responseCloudinary.secure_url;
            req.body.publicIdPhoto = responseCloudinary.public_id;
        }   

        userModel.updateUser(req.body, (err, results) => {
            if (err) return response(res, 400, 'Error when updating user.', [err]);

            response(res, 200, 'User updated successfully', results);
        });

    } catch (error) {
        console.log(error);
        return response(res, 500, 'Error when updating user', [error]);
    }
};

const delete_user = async (req, res) => {
    try {

        let { publicIdPhoto } = req.body;

        // si tenia foto la eliminamos
        if (publicIdPhoto != null){
            await deleteImage(publicIdPhoto);
        }

        userModel.deleteUser(req.body, (err, results) => {
            if (err) return response(res, 400, 'Error when deleting user.', [err]);

            response(res, 200, 'User deleted successfully', results);
        });

    } catch (error) {
        console.log(error);
        return response(res, 500, 'Error when deleting user', [error]);
    }
};

const get_all_user = (req, res) => {
    try {
        userModel.getAllUser( (err, results) => {
            if (err) return response(res, 400, 'Error getting users.', [err]);
            
            response(res, 200, 'Users successfully obtained.', results[0]);
        });

    } catch (error) {
        return response(res, 500, 'Error getting users.', [error]);
    }
};

const get_user_by_id = (req, res) => {
    try {

        userModel.getUserById( req.params, (err, results) => {
            if (err) return response(res, 400, 'Error getting user.', [err]);
            
            response(res, 200, 'User successfully obtained.', results[0]);
        });

        //response(res, 200, 'User successfully obtained.', "results[0]");

    } catch (error) {
        console.log(error);
        return response(res, 500, 'Error getting user.', [error]);
    }
};

const load_users_xlsx = (req, res) => {
    try {

        const { data } = req.body;

        let arrayValuesQuery = data.map( (user) => {
            return `(?,?,?,?,?,?,?,?)`;
        });

        let arrayValues = data.reduce((result, user) => {
            // encriptar password
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
            user.typeUser = 1;
            user.urlPhoto = "https://res.cloudinary.com/duwauerec/image/upload/v1701214475/users/yjhtsgt8q5ts4iw7gddh.jpg";
            user.publicIdPhoto = null;
            // array de los valores del objeto
            let values = Object.values(user);
            return result.concat(values);
        }, []);

        let valuesString = arrayValuesQuery.join(',') + ";";

        req.body.values_query = valuesString;
        req.body.values = arrayValues;

        userModel.loadUsersXlsx( req.body, (err, results) => {
            if (err) return response(res, 400, 'Error load users.', [err]);
            
            response(res, 200, 'Users loaded successfully.', results[0]);
        });

        // response(res, 200, 'Users loaded successfully.', "results[0]");

    } catch (error) {
        console.log(error);
        return response(res, 500, 'Error load users.', [error]);
    }
};

module.exports = { insert_user, update_user, delete_user, get_all_user, get_user_by_id, load_users_xlsx };