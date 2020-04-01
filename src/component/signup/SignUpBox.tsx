import React, { useState } from 'react';
import FileUpload from 'component/signup/FileUpload';
import styled from 'styled-components';

const SignUpBox = () => {
  return (
    <>
      <Wrapper>
        <Title>SIGN-UP</Title>
        <FileUpload />
        <Container>
          <Div>
            <Label>이름(실명)</Label>
            <Input />
          </Div>
          <Div>
            <Label>이메일</Label>
            <Input />
          </Div>
          <Div>
            <Label>비밀번호</Label>
            <Input />
          </Div>
          <Div>
            <Label>비밀번호 확인</Label>
            <Input />
          </Div>
          <Div>
            <Label>지점 선택</Label>
            <Select>
              <Option>고피자</Option>
              <Option>집</Option>
              <Option>위코드</Option>
            </Select>
          </Div>
        </Container>
        <EmailBtn>인증</EmailBtn>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 380px;
  height: 400px;
  background-color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.div`
  margin-bottom: 30px;
  color: orange;
  font-size: 20px;
  font-weight: bold;
`;
const Container = styled.div`
  padding: 0 60px 0 40px;
`;

const Div = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.label`
  font-size: 12px;
  margin-right: 5px;
`;
const Input = styled.input`
  width: 200px;
  height: 40px;
  background-color: lightgray;
`;
const Select = styled.select`
  width: 200px;
  height: 40px;
  background-color: lightgray;
`;
const Option = styled.option``;
const EmailBtn = styled.button`
  color: white;
  position: absolute;
  top: 453px;
  right: 385px;
  font-size: 12px;
  background-color: lightcoral;
  border-radius: 3px;
  cursor: pointer;
`;

export default SignUpBox;
