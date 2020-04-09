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

export default index;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(252, 109, 2);
`;
