import pool from "../config/connectDB";
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

module.exports = {
    getHomepage,
    getDetailPage
}