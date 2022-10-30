import React, { FC, useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import COMPLETE from "./pages/COMPLETE";
import DETAIL from "./pages/DETAIL";
import MAIN from './pages/MAIN';
import MYPAGE from "./pages/MYPAGE";

function App() {

  // const [account, setAccount] =useState("");

  // const getAccount = async () => {
  //   try{
  //     if(window.ethereum){
  //       const accounts = await window.ethereum.request({
  //         method : "eth_requestAccounts",
  //       });
  //       setAccount(accounts[0]);
  //     }else{
  //       alert('Install MetaMask');
  //     }
  //   }catch(error){
  //     console.error(error);
  //   }
  
  // }

  // useEffect(() =>{
  //   getAccount();
  // },[]);

  // useEffect(() =>{
  //   console.log('account0',account);
  // },[account]);

  return (
   
       <Routes>
          <Route path="/" element={<MAIN />} />
          <Route path="/detail" element={<DETAIL/>} />
          <Route path="/mypage/:publicKey" element={<MYPAGE/>} />
          <Route path="/complete" element={<COMPLETE/>} /> 
       </Routes>
  );
}

export default App;
