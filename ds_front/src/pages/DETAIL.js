import React from 'react'
import styled from 'styled-components';

const DETAIL = () => {
  return (
    <Container>
    <Header>
    WEB3 University
    </Header>
    <CardContainer>
    </CardContainer>
    </Container>
  )
}

export default DETAIL;

const Container = styled.div`
width: 100vw;
height: 100vh;
background: #fff;
`
const Header = styled.div`
height: 70px;
display: flex;
color: #fff;
padding-left: 40px;
align-items: center;
font-weight: 900;
font-size: 20px; 
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