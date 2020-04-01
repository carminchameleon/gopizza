import React from 'react';
import SignUpBox from 'component/signup/SignUpBox';
import styled from 'styled-components';

const index = () => {
  return (
    <>
      <Wrapper>
        <SignUpBox />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: orange;
`;

export default index;
