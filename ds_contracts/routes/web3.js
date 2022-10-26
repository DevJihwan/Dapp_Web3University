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
* db 회원정보 select all 
*/
router.get("/userinfo", async (req, res) => {

    console.log(" ++++++++++ DB select ALL ++++++++++ ");

    connection.query('SELECT * from userinfo', (error, rows, fiedls) => {
        if(error) {
            console.log('select user table error');
        }else{
            console.log('User Table info : ', rows);
        }
    });
});

/*
* db 교육 신청 : 공개키 등록
*/
router.post("/register", async (req, res) => {

    console.log(" ++++++++++ userinfo register ++++++++++ ");
    //프론트에서 공개티, 교육명 넘겨받을 예정 
    let _pubkey = "0xC17Ff54A781D0959C56dFe1fA2fC3613715470cb";
    let _course_name = "making a Web3 Wallet";
    //수강 신청했을 때는 0으로 셋팅, 수료 완료 후 1로 변경 예정 
    let _course_completion = "0";

    //insert
    let insertQuery = `INSERT INTO userinfo VALUES("${_pubkey}","${_course_name}","${_course_completion}")`;
    console.log(insertQuery);
    console.log(" ++++++++++ result insert query ++++++++++ ");
    connection.query(insertQuery, (error, rows, fiedls) => {
        if(error) {
            console.log('Insert userinfo table error : '+error);
        }else{
            console.log('User Table info : ', rows);
        }
    });
});


/*
* db 교육이수여부 update
*/
router.post("/completion", async (req, res) => {

    console.log(" ++++++++++ course completion ++++++++++ ");
    //프론트에서 파라미터로 공개키 받아서 셋팅 예정 
    let _pubkey = "0xC17Ff54A781D0959C56dFe1fA2fC3613715470cb";
    let _boolean = "1"; //false : 0, true: 1 

    //업데이트 
    let updataQuery = `UPDATE userinfo SET course_completion = "${_boolean}" WHERE pubkey = "${_pubkey}"`;
    //셀렉트
    let selectQuery = `select * from userinfo WHERE pubkey = "${_pubkey}"`;
    
    console.log(" ++++++++++ result update query ++++++++++ ");
    connection.query(updataQuery, (error, rows, fiedls) => {
        if(error) {
            console.log('Update userinfo table error : '+error);
        }else{
            console.log('User Table info : ', rows);
            console.log(" ++++++++++ result select query ++++++++++ ");
            connection.query(selectQuery, (error, rows, fiedls) => {
            if(error) {
                console.log('Select userinfo table error : '+error);
            }else{
                console.log('User Table info : ', rows);
            }
            });
        }
    });
});

module.exports = router;