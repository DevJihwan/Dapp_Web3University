import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import {
    mintTokenAddress,
    mintTokenContract,
    web3,
} from "../web3Config.js";
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';

const MAIN = () => {
    const navigation = useNavigate();

    const onSubmit = () => {
        console.log('강의 신청 버튼 클릭 시');
        getWallet();
    };
    // const [account, setAccount] = useState(null);

    const getWallet = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                console.log(accounts[0]);

                // setAccount(accounts[0]);
                /* 연결 테스트 코드
                axios.get('http://localhost:3000/web3/userinfo')
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
                */

                
                await axios.post('http://localhost:3000/web3/minting', {})
                .then((res) => {
                                console.log(res);
                                // navigation('/detail');
                });

                const tokenId = await mintTokenContract.methods.tokenCounter().call();

                console.log(tokenId);
                
                let data = {
                    _pubkey: accounts[0],
                    _course_name: "web3.0 지갑 만들기",
                    _course_completion: tokenId-1
                };
                axios.post('http://localhost:3000/web3/register', data)
                    .then((res) => {

                                console.log(res);
                                navigation('/detail');
                          
                    })
                    .catch((err) => console.log(err));

                //let test = await mintTokenContract.methods.mint(accounts[0], "ipfs://QmTy7h4rzcuQTWDaqVst7wsfs5DsM4QDh8fjqCewraHARK")
                //console.log(test);

            } else {
                console.log('메타마스크 설치 안됨 => 설치페이지 이동');
                window.open('https://metamask.io/download.html');
            }
        } catch (error) {
            console.log('메타마스크 설치는 됐지만 주소 없을 경우');
            console.log(error);
        }
    }

    return (
        <Container>
            <Header />
            <CardContainer>
                <Card>
                    Web3.0 지갑 만들기
                </Card>
                <Button onClick={onSubmit}>GET STARTED</Button>
            </CardContainer>
        </Container>
    )
}

export default MAIN;

const Container = styled.div`
width: 100vw;
height: 100vh;
background: rgb(163,147,245);
background: linear-gradient(90deg, rgba(163,147,245,1) 0%, rgba(83,134,216,1) 100%);

`
const CardContainer = styled.div`
height: 600px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`

const Card = styled.div`
    width: 360px;
    height: 260px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    background: rgb(163,147,245);
    background: linear-gradient(90deg, rgba(83,134,216,1) 0%, rgba(163,147,245,1) 100%)
    border-radius: 10px;
    // border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction:column;
    color: #fff;
    font-size: 25px;
    font-weight: 600;
    align-items: center;
    justify-content: center;
`

const Button = styled.div`
margin-top: 20px;
    width: 360px;
    height: 52px;
    background: #FFF8F8;
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    background: rgb(163,147,245);
    background: linear-gradient(90deg, rgba(83,134,216,1) 0%, rgba(163,147,245,1) 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 20px; 
    cursor: pointer;
    
`



