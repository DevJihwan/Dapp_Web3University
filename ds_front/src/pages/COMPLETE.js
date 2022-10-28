import React from 'react'
import styled from 'styled-components';

const COMPLETE = () => {
  return (
    <Container>
    <Header>
    WEB3 University
    </Header>
    </Container>
  )
}

export default COMPLETE;

const Container = styled.div`
width: 100vw;
height: 100vh;
background: #fff;
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