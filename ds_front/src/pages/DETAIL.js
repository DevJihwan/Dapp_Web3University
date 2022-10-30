import React, { useEffect, useState } from 'react'
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


  const sign = async () => {

    const response = await mintTokenContract.methods.tokenCounter().call();
    console.log(response);

    const res = await mintTokenContract.methods.ownerOf(response - 1).call();
    console.log('res', res);

     const tokenId =  await axios.post('http://localhost:3000/web3/getTokenId', {_pubkey: publicKey}).then((res) => {
        return res.data[0].course_completion
     })
    console.log(tokenId);
    const increment02 = async () => {
      const accountFrom2 = {
        privateKey: "0x9cf3e34444a91a01307eb7a50210aa8a3faacb8dcbfb3435d2acbca9765f4460"
        //privateKey: "b4cad25cb5eeb89969395f952c48750175750277d33ae5ed3ea3cd1a76018d27"
      };

      const contractAddress = "0xfbfeD9cfbcA305481bB9fcd42959A2baaC198bD9";
      const t02 = mintTokenContract.methods.safeTransferFrom("0xC17Ff54A781D0959C56dFe1fA2fC3613715470cb", publicKey, tokenId, "0x");

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
    
          // axios.post('http://localhost:3000/web3/mypage', {tokenId})
          //     .then((res) => {
          //         console.log(res);
          //     });


    };
   increment02();
   
  }

  const onSubmit = async () => {

    try {
      web3.eth.getBalance(publicKey, function (error, balance) {
        if (!error && balance > 0) {
          try {
            sign();
          } catch (error) {
            console.log(error);
          }
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
      <BottomContainer>
        <Text>발급받은 공개키를 입력해 NFT 수료증을 발급 받아보세요!</Text>
        {/* setPublicKey(e.target.value) */}
        <InputContainer>
          <Input onChange={(e) => setPublicKey(e.target.value)} value={publicKey} placeholder="공개키를 입력해주세요." />
          <Button onClick={onSubmit} >SUBMIT</Button>
          {/* // console.log(e) setPublicKey(e.target.value) */}
        </InputContainer>
      </BottomContainer>

    </Container>


  )
}

export default DETAIL;

const Container = styled.div`
width: 100vw;
height: 100vh;
background: #fff;
`
const BottomContainer = styled.div`
height: 400px;
display: flex;
align-items: center;
justify-content: center;
background: linear-gradient(90deg, rgba(83,134,216,1) 0%, rgba(163,147,245,1) 100%);
flex-direction: column;
color: #fff;
`;

const InputContainer = styled.div`
height: 200px;
display: flex;
align-items: center;
justify-content: center;
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
const Text = styled.div`
color: #fff;
font-weight: 700; 
font-size: 24px;
margin-top: 50px;
`
