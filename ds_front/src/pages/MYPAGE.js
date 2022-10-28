import React from 'react'
import styled from 'styled-components';
import Header from '../components/Header';

const MYPAGE = () => {
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
