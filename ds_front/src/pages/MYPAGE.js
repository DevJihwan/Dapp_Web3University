import React, { useEffect } from 'react'
import styled from 'styled-components';
import Header from '../components/Header';
import axios from 'axios';

const MYPAGE = () => {

  useEffect(() => {
    getInfo();
  },[]);
  const getInfo = async() => {
    axios.get('http://localhost:3000/web3/mypage')
    .then((res) => {

         // axios.post('http://localhost:3000/web3/minting', {account : accounts[0]})
         // .then((res) => {
         //     console.log(res);
         //     navigation('/detail');
         // });
         //navigation('/detail');
        //  mint(accounts[0]);
     console.log(res);
    })
    .catch((err) => console.log(err));
  };
  return (
    <Container>
    <Header>
    WEB3 University
    </Header>
    </Container>
  )
}

export default MYPAGE;

const Container = styled.div`
width: 100vw;
height: 100vh;
background: #fff;
`
