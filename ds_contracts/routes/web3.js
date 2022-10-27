const express = require('express');
const router = express.Router();
const fs = require('fs');
const mysql = require('mysql');
const { hrtime } = require('process');
const hre = require('hardhat');
const { ethers } = require('hardhat');

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
    //프론트에서 넘겨받는 pubkey & course_name 
    const {_pubkey, _course_name} = req.body;
    console.log('[_pubkey]:',_pubkey,'_course_name:', _course_name)
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
    const _pubkey = req.body;
    console.log('[_pubkey]:',_pubkey);
    
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


/*
* Minting NFT
*/
router.post("/minting", async (req, res) => {

    console.log(" ++++++++++ Start minting ++++++++++ ");

    //NFT 민팅 스마트컨트랙트 주소
    const _address = '0xfbfeD9cfbcA305481bB9fcd42959A2baaC198bD9';
    //NFT 민팅 토큰 URI (mint 함수 파라미터)
    const _tokenURI = 'ipfs://QmTy7h4rzcuQTWDaqVst7wsfs5DsM4QDh8fjqCewraHARK';

    //const _pubkey = "0xC17Ff54A781D0959C56dFe1fA2fC3613715470cb"

    //NFT 민팅 스마트컨트랙트 abi 호출 
    const _contract = require("../artifacts/contracts/Completion.sol/Completion.json");
    const _contractInterface = _contract.abi;

    const privateKey = `0x${process.env.PRIVATE_KEY}`;
    const wallet = new ethers.Wallet(privateKey);
    console.log(" ++++++++++ Start minting 00 ++++++++++ " + wallet);

    let provider = ethers.provider;

    wallet.provider = provider;
    const singer = wallet.connect(provider);
    console.log(" ++++++++++ Start minting 01 ++++++++++ " + singer);

    //컨트랙트 생성 
    const Contract = new ethers.Contract(_address, _contractInterface, singer);
    console.log(" ++++++++++ Start minting 02 ++++++++++ " + Contract);

    //민팅실행
    await Contract.mint(_tokenURI)
    .then((tx) => {
        tx.wait(5);
    })
    .then((receipt) => {
        console.log(`Confirmed! Your transaction receipt is: ${receipt.transactionHash}`);
    })
    .catch((e) => {
        console.log("Something went wrong", e);
    })


    //console.log(" ++++++++++ Start minting 02 ++++++++++ " + await Contract.tokenURI(0));

    
});


module.exports = router;