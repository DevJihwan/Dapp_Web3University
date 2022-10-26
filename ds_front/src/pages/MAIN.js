import React from 'react'
import styled from 'styled-components';
import Styled from 'styled-components';
const MAIN = () => {


  return (
    <Container>
        <Header>
            <div>WEB3 University</div>
        </Header>
        <CardContainer>
        <Card>
            강의정보~~
        </Card>
        <Button>GET STARTED</Button>
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



