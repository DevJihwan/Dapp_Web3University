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
    * npm install dotenv --save
    * npm install --save-dev @nomiclabs/hardhat-waffle 'ethereum-waffle@^3.0.0' @nomiclabs/hardhat-ethers 'ethers@^5.0.0'


💻 [hardhat]
============
    * 관련 자료 
        * Hardhat docs : https://hardhat.org/hardhat-runner/docs/advanced/create-task 
        * hardhat & polygon : https://learn.figment.io/tutorials/create-nft-smart-contract-with-hardhat
        
    * 명령어
        * 1️⃣ SmartContract 배포 관련 
            * npx hardhat compile
            * npx hardhat run scripts/deploy.js --network mumbai
            * npx hardhat verify --network mumbai <YOUR_SMARTCONTRACT_ADDRESS>
        * 2️⃣ Hardhat task 관련 
            * npx hardhat <task name>
                * ex. npx hardhat accounts --network mumbai (mumbai network option)