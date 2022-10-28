require("@nomiclabs/hardhat-waffle");
//hardhat-waffle은 hre 객체 지원 (HRE는 hardhat runtime Environment)
require("@nomiclabs/hardhat-etherscan");
//배포 후 verify를 위한 모듈 Deploy task의 run 함수 
require("dotenv").config();


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


task("balance", "Prints the balance of accounts")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const balance = await ethers.provider.getBalance(taskArgs.account);

    console.log("Polygon balance : " + ethers.utils.formatEther(balance) + " Matic");
  });


task("deploy", "Deploy the smart contracts", async(taskArgs, hre) => {

    const Completion = await hre.ethers.getContractFactory("Completion");
    const completion = await Completion.deploy("Completion Contract", "CPL");
  
    await completion.deployed()
      .then((result) => {
        console.log("Complete Deploy" + result);
      })
      .catch((error) => {
        console.log("Fail to Deploy" + error);
      });

    await hre.run("verify:verify", {
        address: completion.address,
        constructorArguments: [
          "Completion Contract",
          "CPL"
        ],
      })
      .then((result) => {
        console.log("Success Verify : " + result);
      })
      .catch((error) => {
        console.log("Fail to Verify : " + error);
    });
  });

/** @type import('hardhat/config').HardhatUserConfig */
//스마트컨트랙트에서 선언한 컴파일러 버전과 hardhat.config.js의 solidity 버전이 동일해야함. 
module.exports = {
  solidity: "0.8.0",
  networks: {
    mumbai: {
      url: process.env.TESTNET_RPC,
      accounts: [
        process.env.PRIVATE_KEY,
      ],
      gas: 0x1fffffffffffff,
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
};
