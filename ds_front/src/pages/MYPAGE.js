import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Header from '../components/Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { mintTokenContract } from '../web3Config';


const MYPAGE = () => {
  const params = useParams();
  const [publickey, setPublicKey] = useState(params.publicKey);
  useEffect(() => {
    setPublicKey(params.publicKey);
    getInfo();
  }, [params]);


  const [error, setError] = useState();
  const [tokenId, setTokenId] = useState();
  const onSubmit = () => {
    window.open(`https://testnets.opensea.io/assets/mumbai/0xfbfed9cfbca305481bb9fcd42959a2baac198bd9/${tokenId}`, '_blank')

    console.log(params.publicKey);
  }
  const imgUrl = "https://i.seadn.io/gae/grn4Hfnv1pPI6-eLpVXQk7ZU_9PedDeZd_ZepFj3Gbfyz7qxDZHQFWnJe4yUwhevlDhjTRtlodkvgWAkYbJyDjVilyOi1tBCKFBM?auto=format&w=1000";
  const getInfo = async () => {

    try {
      //0x94f43f12b117fd7Ed7e72DD6E873cB086f66A0CA
      const res = await mintTokenContract.methods.balanceOf(publickey).call();

      // const id = await mintTokenContract.methods.tokenCounter().call();
      // console.log(id - 1);

      const id =  await axios.post('http://localhost:3000/web3/getTokenId', {_pubkey: publickey}).then((res) => {
        return res.data[0].course_completion
     })

      setTokenId(id);
      setError(false);
      console.log(res);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };
  return (
    <Container>
      <Header>
        WEB3 University
      </Header>
      <CardContainer>

        {error ?
          <Card><Text>유효하지 않은 공개키입니다.</Text></Card>
          :
          <Card>
            <Text02>Congratulations! Your token id is {tokenId}</Text02>
            <Image src={imgUrl} />
            <Button onClick={() => onSubmit()}>GO TO OPENSEA</Button>
          </Card>
        }
      </CardContainer>
    </Container>
  )
}

export default MYPAGE;

const Container = styled.div`
width: 100vw;
height: 100vh;
background: #fff;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
`
const CardContainer = styled.div`
width: 100vw;
height: 80vh;
display: flex;
justify-content: center;
align-items: center;
`
const Card = styled.div`
width: 900px;
height: 500px;
border: 1px solid rgb(163,147,245);
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Text = styled.div`
  font-size: 8px;
`;


const Text02 = styled.div`
  font-size: 30px;
  color: rgb(163,147,245);
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
`;

const Button = styled.div`
margin-top: 20px;
    width: 360px;
    height: 52px;
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