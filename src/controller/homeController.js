import pool from "../config/connectDB";
import {body, validationResult} from 'express-validator';
import mysql from 'mysql2/promise';

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


module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getDataUserToEdit,
    updateUser
}