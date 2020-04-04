import React from 'react';
import LoginBox from 'component/login/LoginBox';
import styled from 'styled-components';

const Login = () => {
  return (
    <>
      <Wrapper>
        <LoginBox />
      </Wrapper>
    </>
  );
};

export default Login;

const Wrapper = styled.div`
  height: 100vh;
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
`;
