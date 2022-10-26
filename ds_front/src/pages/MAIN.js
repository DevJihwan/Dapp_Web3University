import React, { useState } from 'react'
import styled from 'styled-components';
import Styled from 'styled-components';
import axios from 'axios';

const MAIN = () => {

    const onSubmit = () => {
        console.log('강의 신청 버튼 클릭 시');
        getWallet();
    };

    const [account, setAccount] = useState('');

    const getWallet = async() => {
        try {
            
            if(window.ethereum){
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                setAccount(accounts[0]);
                /* 연결 테스트 코드
                axios.get('http://localhost:3000/web3/userinfo')
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
                */
               let data = {
                _pubkey: accounts[0], 
                _course_name: "web3.0 지갑 만들기"
               }
               axios.post('http://localhost:3000/web3/register', data)
               .then((res) => console.log(res))
               .catch((err) => console.log(err));
            }else{
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
            <Header>
                WEB3 University
            </Header>
            <CardContainer>
                <Card>
                    강의정보~~
                </Card>
                <Button onClick={onSubmit}>GET STARTED</Button>
            </CardContainer>
        </Container>
    )
}

export default MAIN;

const Container = Styled.div`
width: 100vw;
height: 100vh;
background: rgb(163,147,245);
background: linear-gradient(90deg, rgba(163,147,245,1) 0%, rgba(83,134,216,1) 100%);
`
const Header = styled.div`
height: 70px;
display: flex;
color: #fff;
margin-left: 40px;
align-items: center;
font-weight: 900;
font-size: 20px; 
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
    background: #FFF8F8;
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.1);
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



