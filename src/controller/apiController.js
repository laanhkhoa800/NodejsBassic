import pool from "../config/connectDB";

let getAllUser = async (req,res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');
    return res.status(200).json({
        message : 'ok',
        data : rows
    })      
}

let createNewUser = async (req,res) => {

    let{ firstName, lastName, email, address} = req.body;

    if( !firstName || !lastName || !email || !address) {
        return res.status(400).json({           
            message : 'mising required params',
        })      
    }

    await pool.execute('insert into users(firstName, lastName, email, address) value (?, ?, ?, ?)',[firstName, lastName, email, address])
    return res.status(200).json({
        message : '200', 
    })      
}

let updateUser = async (req,res) => {

    let{ firstName, lastName, email, address} = req.body;

    if( !firstName || !lastName || !email || !address || !id) {     
        return res.status(400).json({           
            message : 'mising required params',
        })      
    }

    await pool.execute(`UPDATE users SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?;`, [firstName, lastName, email, address, id]);
    return res.status(200).json({
        message : '200', 
    })      
}

let deleteUser = async (req,res) => {
    let userID = req.params.id;
    if(!userID) {     
        return res.status(400).json({           
            message : 'mising required params',
        })      
    }

    await pool.execute(`DELETE FROM users WHERE id = ?`, [userID]);
    return res.status(200).json({
        message : '204', 
    })      
}

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser
}