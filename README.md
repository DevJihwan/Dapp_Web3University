# BTAdAppProject-08

🙋🏻‍♂️ [About Team]
============
 * 석지환, 정이안, 이승희


👨🏻‍💻 [installed npm module]
=========================
 * cd ds_contracts
 * npm install express-routes
 * npm install openzeppelin-solidity
 * npx hardhat init 
 * npm install mysql   
 * npm install dotenv --save (polygonscan api key 접근을 위해 설치)
 * npm install --save-dev @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0' @nomiclabs/hardhat-ethers 'ethers@^5.0.0'
 * npm install --save-dev chai (hardhat test를 위해 설치)
 * npm install @nomiclabs/hardhat-etherscan

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