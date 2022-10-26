const express = require('express');
const router = express.Router();
const fs = require('fs');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234', 
    database : 'web3' 
})

connection.connect();

/*
* 
*/
router.get("/userinfo", async (req, res) => {

    console.log("mysql Test");

    connection.query('SELECT * from userinfo', (error, rows, fiedls) => {
        if(error) {
            console.log('select user table error');
        }else{
            console.log('User Table info : ', rows);
        }
    });
});


module.exports = router;