import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {

    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const [publicKey, setPublicKey] = useState('');

    const onClick = () => {
        setToggle(!toggle)
    }

    const onSubmit = () => {
        navigate(`/mypage/${publicKey}`)
    };
    return (
        <>
            <HeaderContainer>
                <HomeBtn onClick={() => navigate('/')}>WEB3 University</HomeBtn>
                {
                    toggle ? <InputContainer> <Input onChange={(e) => setPublicKey(e.target.value)} value={publicKey} placeholder="공개키를 입력해주세요." /> <Button onClick={onSubmit}>submit</Button></InputContainer> : <Button onClick={onClick}>my page</Button>
                }
            </HeaderContainer>
        </>
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
const InputContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`


const Input = styled.input`
padding: 10px;
width: 300px;
height: 20px;
border: none;
border-radius: 5px;
margin-right: 20px;
z-index: 100;
font-size: 15px; 
`;

const HomeBtn = styled.div`
cursor: pointer;
`