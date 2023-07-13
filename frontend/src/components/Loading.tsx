import React from 'react';
import spinner from '../assets/gif/spinner-black.gif';
import styled from 'styled-components';

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;


export default () => {
  return (
    <Background>
      <img src={spinner} alt="로딩중" width="10%"/>
        <span className='text-black text-2xl'>
            소설을 작성 중입니다..
        </span>
    </Background>
  );
};