require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

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
  
    await completion.deployed();
  
    await hre.run("verify:verify", {
      address: completion.address,
      constructorArguments: [
        "Completion Contract",
        "CPL"
      ]
    })
  
  });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: process.env.TESTNET_RPC,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  }
};
