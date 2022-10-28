import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {

    const navigate = useNavigate();
const onClick = () => {
    navigate('/mypage')
}

  return (
    <HeaderContainer>
        <div>WEB3 University</div>
        <Button onClick={onClick}>my page</Button>
    </HeaderContainer>
  )
}

export default Header;

// const HeaderContainer = styled.div`
// height: 70px;
// display: flex;
// color: #fff;
// padding-left: 40px;
// align-items: center;
// font-weight: 900;
// font-size: 20px; 
// background: rgb(163,147,245);
// background: linear-gradient(90deg, rgba(163,147,245,1) 0%, rgba(83,134,216,1) 100%);
// `
const Button = styled.div`
cursor: pointer;
`
const HeaderContainer = styled.div`
padding: 0 30px 0 30px; 
height: 70px;
display: flex;
color: #fff;
justify-content: space-between;
align-items: center;
font-weight: 900;
font-size: 20px; 
background: rgb(163,147,245);
background: linear-gradient(90deg, rgba(163,147,245,1) 0%, rgba(83,134,216,1) 100%);
`