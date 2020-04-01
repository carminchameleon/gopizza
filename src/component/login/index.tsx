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

const Wrapper = styled.div`
  height: 100vh;
  /* background-image: url('https://www.gopizza.kr/wp-content/uploads/2019/06/%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80_%EC%98%A4%ED%94%88%EC%98%88%EC%A0%95%EC%A0%90_%EB%B0%B0%EA%B2%BD.jpg'); */
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Login;
