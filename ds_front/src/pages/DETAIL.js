import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import Header from '../components/Header';
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import axios from 'axios';
import { NotionRenderer } from "react-notion";
import {
  mintTokenAbi,
  mintTokenAddress,
  mintTokenContract,
  web3,
} from "../web3Config.js";
import { ethers } from 'ethers';

const DETAIL = () => {

const [address, setAddress] = useState('');

const NOTION_PAGE_ID = "Web3-0-df991e223eef40c4928ef772c0ffda54";
const [response, setResponse] = useState({});
const [publicKey, setPublicKey] = useState('');
  useEffect(() => {
    axios
      .get(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}`)
      .then(({ data }) => {
        console.log(data)
        setResponse(data);
      });
  }, []);


  const sign2 = async() => {
    console.log('ZMFFL');
    
    const response = await mintTokenContract.methods.tokenCounter().call();
    console.log(response);

    const accountFrom = {
      privateKey: "0x9cf3e34444a91a01307eb7a50210aa8a3faacb8dcbfb3435d2acbca9765f4460"
      //privateKey: "b4cad25cb5eeb89969395f952c48750175750277d33ae5ed3ea3cd1a76018d27"
    };

    const contractAddress = "0xfbfeD9cfbcA305481bB9fcd42959A2baaC198bD9";
    
    // 0x9E0537C8b3097073c027557475C6a712Ff3CC74e
    // const incrementTx = mintTokenContract.methods.setApprovalForAll("0x9E0537C8b3097073c027557475C6a712Ff3CC74e", true);
    // const incrementTx = mintTokenContract.methods.safeTransferFrom("0xC17Ff54A781D0959C56dFe1fA2fC3613715470cb", publicKey, 23);
    // const increment = async () => {
    //   console.log(
    //     `Calling the increment by function in contract at address: ${contractAddress}`
    //   );
    
    //   // Sign Tx with PK
    //   const createTransaction = await web3.eth.accounts.signTransaction(
    //     {
    //       to: contractAddress,
    //       data: incrementTx.encodeABI(),
    //       gas: await incrementTx.estimateGas(),
    //     },
    //     accountFrom.privateKey
    //   );
    
    //   // Send Tx and Wait for Receipt
    //   const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
    //   console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
    //   increment02();
    // };



    const res = await mintTokenContract.methods.ownerOf(4).call();
    console.log('res', res);

    const increment02 = async () => {
      const accountFrom2 = {
        privateKey: "0x19b208f725533aba4ee4474cd51c90f3c7b65ebbab90e2ea838b4045d0647a98" //이전 소유자의 개인키
        //privateKey: "b4cad25cb5eeb89969395f952c48750175750277d33ae5ed3ea3cd1a76018d27"
      };

    const contractAddress = "0xfbfeD9cfbcA305481bB9fcd42959A2baaC198bD9"; 
    const t02 = mintTokenContract.methods.safeTransferFrom("0xc02EC4ACfCb48CbAe56D1F28af62Fa2Bf907D223", publicKey, 4, "0x");

    console.log(
        `Calling the increment by function in contract at address: ${contractAddress}`
    );

      // Sign Tx with PK
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
          to: contractAddress,
          data: t02.encodeABI(),
          gas: await t02.estimateGas(),
        },
        accountFrom2.privateKey
    );
    
      // Send Tx and Wait for Receipt
      const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
      console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
    };
  //increment02();
  //increment();
  }

  const onSubmit = async() => {

    try {
      web3.eth.getBalance(publicKey, function (error, balance) {
        sign2();
          if (!error && balance > 0) {

            // const wallet = new ethers.Wallet(privateKey);
            try {
           
            
             //sign();
             sign2();
              //axios.post("http://localhost:3000/web3/transfer", {stdAddress : publicKey} )  
            } catch (error) {
                console.log(error);
            }
            //contract["safeTransferFrom(address,address,uint256)"](addr1, addr2, 1);
            // const response = mintTokenContract.methods.safeTransferFrom({stdAddress: address})
            // .send({ from: publicKey });
            // console.log(response);
            // const response = mintTokenContract.methods.safeTransferFrom(mintTokenAddress, publicKey, 4)
            // .send({ from: publicKey });
            // console.log(response);
          }
      });
    } catch (err) {
    
    }

    
  };


  return (
    <Container>
      <Header />
      {
        Object.keys(response).length && (
          <NotionRenderer blockMap={response} fullPage={true} />
        )
      }
      <InputContainer>
         {/* 발급받은 공개키를 입력해 NFT 수료증을 발급 받아보세요! */}
         {/* setPublicKey(e.target.value) */}
        <Input onChange={(e) => setPublicKey(e.target.value)} value={publicKey} placeholder="공개키를 입력해주세요."/>
        <Button onClick={onSubmit} >SUBMIT</Button>
          {/* // console.log(e) setPublicKey(e.target.value) */}
        
      </InputContainer>
    </Container>
  )
}

export default DETAIL;

const Container = styled.div`
width: 100vw;
height: 100vh;
background: #fff;
`
const InputContainer = styled.div`
height: 300px;
display: flex;
align-items: center;
justify-content: center;
background: linear-gradient(90deg, rgba(83,134,216,1) 0%, rgba(163,147,245,1) 100%);
`
const Input = styled.input`
padding: 10px;
width: 380px;
height: 30px;
border: none;
border-radius: 5px;
margin-right: 20px;
`;

const Button = styled.div`
border:1px solid #fff;
width: 120px;
height: 50px;
border-radius: 5px;
color: #fff;
display: flex;
align-items: center;
justify-content: center;
font-weight: 700; 
cursor: pointer;
`
