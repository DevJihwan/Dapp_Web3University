# BTAdAppProject-08

🙋🏻‍♂️ [About Team]
============
 * 석지환, 정이안, 이승희


💻 [개발환경]
==========
 * 언어 : React, Node.js, Mysql
 * 라이브러리 : ether.js, web3.js
 * Network : Polygon Testnet (Mumbai)
 * 프레임워크 : Hardhat

👨🏻‍💻 [개발내용]
==========
 * 1️⃣ web3.0 교육을 신청하면, 메타마스크 지갑 연결 
 * 2️⃣ 연결된 지갑 정보(공개키) db 저장
 * 3️⃣ 실습 내용에 따라 발급된 공개키 잔액조회
 * 4️⃣ 관리자 지갑 주소로 수료증NFT 민팅 
 * 5️⃣ 교육 수료 (지갑 잔액 확인) 확인 되면 NFT 전송
 * 6️⃣ NFT 전송 후 db 교육 수료 내용 저장  


👨🏻‍💻 [installed npm module]
=========================
 * cd ds_contracts
 * npm install express-routes
 * npm install openzeppelin-solidity@4.3.2
 * npx hardhat init 
 * npm install mysql   
 * npm install dotenv --save (polygonscan api key 접근을 위해 설치)
 * npm install --save-dev @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0' @nomiclabs/hardhat-ethers 'ethers@^5.0.0'
 * npm install --save-dev chai (hardhat test를 위해 설치)
 * npm install @nomiclabs/hardhat-etherscan (스컨 배포 후 검증용)
 * npm install --save-dev @nomiclabs/hardhat-web3 web3
 * npm install react-router-dom

💻 [hardhat]
===========
 * 관련 자료 
    * Hardhat docs : https://hardhat.org/hardhat-runner/docs/advanced/create-task 
    * hardhat & polygon : https://learn.figment.io/tutorials/create-nft-smart-contract-with-hardhat
 
 * Mumbai Network 연결 
    * .env 파일 수정  
        * TESTNET_RPC="alchemy create project - polygon mumbai 설정 후 view key"
        * PRIVATE_KEY="metamask polygon mumbai 네트워크 연결 지갑"
        * POLYGONSCAN_API_KEY="polygonscan 가입 후 발급"

 * 명령어
    * 1️⃣ SmartContract 배포 관련 
        * npx hardhat compile
        * npx hardhat run scripts/deploy.js --network mumbai
        * npx hardhat verify --network mumbai <YOUR_SMARTCONTRACT_ADDRESS>
    * 2️⃣ Hardhat task 관련 
        * npx hardhat <task name>
        * ex. npx hardhat accounts --network mumbai (mumbai network option)
    * 3️⃣ Hardhat Test 관련 
        * npx hardhat test

[참고 docs]
==========
    * https://docs.ethers.io/v5/api/providers/api-providers/ (ether.js)