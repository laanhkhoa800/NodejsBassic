import pool from "../config/connectDB";
import {body, Result, validationResult} from 'express-validator';

let getHomepage = async (req, res) => {
    
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.render('index.ejs', {data: rows , text : 'coding by KHoaBug'});
}

let getDetailPage = async (req, res) => {
    let userID = req.params.id;
    let [user, fields] = await pool.execute(`select * from users where id = ?`, [userID]);
    return res.send(JSON.stringify(user));
    
}

let createNewUser = async (req, res) => {
    console.log("data request :", req.body);
    let{firstName, lastName, email, address} = req.body
    await pool.execute('insert into users(firstName, lastName, email, address) value (?, ?, ?, ?)',[firstName, lastName, email, address])
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userID = req.params.id;
    console.log("id user want delete : ", [userID]);
    await pool.execute(`DELETE FROM users WHERE id = ?`, [userID]);
    return res.redirect('/');
}

let getDataUserToEdit = async (req, res) => {
    let userID = req.params.id;
    let [dataUser] = await pool.execute(`select * from users where id = ?`, [userID]);
    console.log('loading data', dataUser );
    return res.render('edit.ejs', {data : dataUser[0]});
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('address').isLength({ min: 10 }),
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // let errors = validationResult(req);
    // if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    // }
    await pool.execute(`UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?;`, [firstName, lastName, email, address, id]);
    return res.redirect('/');

}


// Upload file 
let getUploadFile = async (req, res) => {
    return res.render('uploadfile.ejs');
}

//Upload single image with multer
let handleUpLoadFile = async (req, res) => {
        console.log("check name display err image",req.files);
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        // else if (err instanceof multer.MulterError) {
        //     return res.send(err);
        // }
        // else if (err) {
        //     return res.send(err);
        // }
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"/><hr /><a href="./">Upload another image</a>`);
}


//upload mutiple file 
let handleUploadMutipleFile = async (req, res, err) => {
        console.log("check error : ", err);
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
        const files = req.files
        let index, len;
        let result = 'You have uploaded this image:';
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="500"/>`
        }
        // Display uploaded image for user validation
        res.send(result);
}

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getDataUserToEdit,
    updateUser,
    getUploadFile,
    handleUpLoadFile,
    handleUploadMutipleFile
}