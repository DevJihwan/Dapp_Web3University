const express = require('express');
const router = express.Router();
const fs = require('fs');
const mysql = require('mysql');
const { hrtime } = require('process');
const hre = require('hardhat');
const { ethers } = require('hardhat');
const axios = require('axios');
const sdk = require('api')('@opensea/v1.0#7dtmkl3ojw4vb');

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
    const {_pubkey, _course_name, _course_completion} = req.body;
    console.log('[_pubkey]:',_pubkey,'_course_name:', _course_name)
    //수강 신청했을 때는 0으로 셋팅, 수료 완료 후 1로 변경 예정 

    //insert
    let insertQuery = `INSERT INTO userinfo VALUES("${_pubkey}","${_course_name}",${_course_completion})`;
    console.log(insertQuery);
    console.log(" ++++++++++ result insert query ++++++++++ ");
    connection.query(insertQuery, (error, rows, fiedls) => {
        if(error) {
            console.log('Insert userinfo table error : '+error);
        }else{
            console.log('User Table info : ', rows);
        }
    });

    return res.json();
});


router.post("/getTokenId" , async(req, res) => {
    const {_pubkey} = req.body;
    let selectQuery = `select * from userinfo WHERE pubkey = "${_pubkey}"`;
    connection.query(selectQuery, (error, rows, fiedls) => {
        if(error) {
            console.log('Update userinfo table error : '+error);
        }else{
            console.log(rows);
            return res.json(rows);
        }
    });
})

/*
* db 교육이수여부 update
*/
router.post("/completion", async (req, res) => {

    console.log(" ++++++++++ course completion ++++++++++ ");
    //프론트에서 파라미터로 공개키 받아서 셋팅 예정 
    const {_pubkey, _tokenId} = req.body;
    console.log('[_pubkey]:',_pubkey,'[_tokenId]:',_tokenId);

    //업데이트 
    let updataQuery = `UPDATE userinfo SET tokenId = "${_tokenId}" WHERE pubkey = "${_pubkey}"`;
    //셀렉트
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

    // NFT 민팅 스마트컨트랙트 주소
    const _address = '0xfbfeD9cfbcA305481bB9fcd42959A2baaC198bD9';
    //const _address = '0xC17Ff54A781D0959C56dFe1fA2fC3613715470cb';
    // NFT 민팅 토큰 URI (mint 함수 파라미터)
    const _tokenURI = 'ipfs://QmYDHqgunBox5dkjKeTWw6uxptyhXC4aBT1VXD3RywRJeH';

    // NFT 민팅 스마트컨트랙트 abi 호출 
    const _contract = require("../artifacts/contracts/Completion.sol/Completion.json");
    const _contractInterface = _contract.abi;

    // 지갑 연결 : 환경설정에 있는 개인키 호출
    const privateKey = `0x${process.env.PRIVATE_KEY}`;
    const wallet = new ethers.Wallet(privateKey);
    console.log(" ++++++++++ wallet ++++++++++ " + wallet);

    // 지갑 연결 : 연결된 지갑 주소 확인용
    const _walletAddress = await wallet.getAddress();
    console.log(" ++++++++++ _walletAddress ++++++++++ " + _walletAddress);

    // 지갑 연결 : provider RPC 연결 (ether.js에서 RPC 설정 안해주면 defult로 로컬로 연결됨)
    let provider = new ethers.providers.JsonRpcProvider(process.env.TESTNET_RPC);

    // 지갑 연결 : 연결된 네트워크 확인용 
    const _name = await provider.getNetwork()
    console.log(" ++++++++++ PROVIDER ++++++++++ " + _name.name); //maticmum : Polgon testnet (ether.js 공식 docs 참고)

    // 가스비 확인용
    const _gasPrice = await provider.getGasPrice();
    console.log(" ++++++++++ _gasPrice ++++++++++ " + _gasPrice);

    wallet.provider = provider;

    const singer = wallet.connect(provider);
    console.log(" ++++++++++ singer.getAddress() ++++++++++ " + await singer.getAddress());

    // 지갑 연결 : 연결된 지갑 잔액 확인 
    const _getBalance = await singer.getBalance();
    console.log(" ++++++++++ _getBalance ++++++++++ " + _getBalance);

    //컨트랙트 생성 
    const intanceContract = new ethers.Contract(_address, _contractInterface, singer);
    console.log(" ++++++++++ intanceContract ++++++++++ " + intanceContract);  

    //민팅실행
    const tx = await intanceContract.mint(_tokenURI);

    const receipt = await tx.wait();
    console.log(" ++++++++++ receipt ++++++++++ " , receipt);

    console.log(" ++++++++++ End minting ++++++++++ ");
    return res.json();
    
});


/*
* opensea testnet api : list of asset 
*/
router.post("/mypage", async (req, res) => {

    //호출할 공개키
    const { pubkey }  = req.body;
    console.log('pubkey', pubkey); 
    //오픈씨 sdk 실행
    sdk.retrievingAssetsRinkeby({
        // owner: "0xC17Ff54A781D0959C56dFe1fA2fC3613715470cb",
        owner: pubkey,
        order_direction: 'desc',
        offset: '0',
        limit: '20',
        include_orders: 'false'
      })
        .then((result) => {
            console.log(result);
            res.json({ message: "ok", data: result });
        })
        .catch(err => console.error(err));
});



module.exports = router;