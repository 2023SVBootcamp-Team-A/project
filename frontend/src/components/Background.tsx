import React from 'react';
import styled from 'styled-components';

export const BackgroundImg = styled.div`
  position: absolute;
  top :0;
  left: 0;
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content:center;
`;


export default () => {
  return (
    <BackgroundImg>
      <img src={"/images/background.png"}>
      </img>
    </BackgroundImg>
  );
};