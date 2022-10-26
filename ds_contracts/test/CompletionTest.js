const { expect } = require('chai');
const { ethers } = require("hardhat")

// truffle은 테스트코드 실행을 위해 ganache-cli를 사용하지만, Hardhat은 로컬 테스트넷을 사용하기 때문에 여기서 바로 테스트 가능

/*
* describe : 향후 수행할 테스트명 설정 
*/
describe("Completion Smart Contract Tests", function() {

    let completion;
    // 스마트컨트랙트 배포 전 여기에 테스트 코드 실행 
    this.beforeEach(async function() {
      
      // Deploying the smart contract
      const Completion = await ethers.getContractFactory("Completion");
      completion = await Completion.deploy("Completion Contract", "CMT");
    })

    //각 테스트 케이스 작성
    it("NFT is minted successfully", async function() {
      //테스트를 위해 hardhat 로컬에서 제공하는 주소 연결
      [account1] = await ethers.getSigners();

      expect(await completion.balanceOf(account1.address)).to.equal(0);

      const tokenURI = "https://opensea-creatures-api.herokuapp.com/api/creature/1";
      const tx = await completion.connect(account1).mint(tokenURI);

      expect(await completion.balanceOf(account1.address)).to.equal(1);

    })

    it("tokenURI is set sucessfully", async function() {

      [account1, account2] = await ethers.getSigners();

      const tokenURI_1 = "https://opensea-creatures-api.herokuapp.com/api/creature/1"
      const tokenURI_2 = "https://opensea-creatures-api.herokuapp.com/api/creature/2"

      const tx1 = await completion.connect(account1).mint(tokenURI_1);
      const tx2 = await completion.connect(account2).mint(tokenURI_2);

      expect(await completion.tokenURI(0)).to.equal(tokenURI_1);
      expect(await completion.tokenURI(1)).to.equal(tokenURI_2);
    })

})