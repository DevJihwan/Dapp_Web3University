import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import Header from '../components/Header';
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import axios from 'axios';
import { NotionRenderer } from "react-notion";
import { mintTokenAddress } from '../web3Config';
import {
  mintTokenContract,
  web3,
} from "../web3Config.js";

const DETAIL = () => {

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

  const onSubmit = async() => {
    const response = await mintTokenContract.methods.safeTransferFrom(mintTokenAddress, publicKey, 4)
    .send({ from: publicKey });
    console.log(response)
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