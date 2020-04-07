import React, { useState, useEffect } from 'react';
import { URL } from 'config';
import ReactModal from 'react-modal';
import FileUpload from './FileUpload';
import Header from 'shared/Header';
import Banner from 'shared/Banner';
import styled from 'styled-components';

const CrewAccount = () => {
  const [data, setData] = useState<any>([]);
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<String>('');
  const [checkNewPassword, setCheckNewPassword] = useState<String>('');
  const [pwError, setPwError] = useState<Boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [img, setImg] = useState<any>('');

  //Data 저장
  useEffect(() => {
    fetch('http://localhost:3000/Data/userInfo.json', { method: 'GET' })
      // fetch(`${URL}/store`, { method: 'GET' })
      //토큰 header에 보내고 해당 token 알맞은 data 줌
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

  //input 태그 값 저장
  const handleInput = (e: { target: { value: string } }, option: string) => {
    console.log(e.target.value);
    if (option === 'password') setPassword(e.target.value);
    if (option === 'newPassword') setNewPassword(e.target.value);
    if (option === 'checkNewPassword') setCheckNewPassword(e.target.value);
  };
  //passowrd 유효성 검사
  useEffect(() => checkPassword(), [password]);

  const checkPassword = () => {
    const check_num = /[0-9]/;
    const check_eng = /[a-z]/;
    if (
      check_num.test(password) &&
      check_eng.test(password) &&
      password.length >= 8
    ) {
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  //백엔드 fetch :현재 비밀번호 보내기
  const isPwdChanged = () => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(`${URL}`, {
        method: 'DELETE',
        headers: { token: token },
        body: JSON.stringify({
          password: password,
        }),
      }).then(res => {
        if (res.status === 200) {
          setModalIsOpen(true);
        } else {
          alert('비밀번호가 잘못되었습니다. 다시 입력해주세요');
        }
      });
    }

    alert('비밀번호를 입력해주세요');
  };

  //백엔드 fetch: 새로운 비밀번호
  const isModalBtnClicked = () => {
    const token = window.sessionStorage.getItem('token');
    console.log(token);
    if (token) {
      fetch(`${URL}`, {
        method: 'POST',
        headers: { token: token },
        body: JSON.stringify({
          // password: newPassword,
        }),
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          alert('비밀번호가 변경되었습니다.');
        }
      });
    }
  };

  //fileUpload 컴포넌트에서 url 가져오기 위한 함수
  const imgStore = (img: String) => {
    setImg(img);
  };

  return (
    <Wrapper>
      <Header />
      <Banner
        title="My Page"
        menu1="계정관리"
        menu2="계정탈퇴"
        background="#fcb131"
        navBackground="#f69d04"
        routes1="/crew_account"
        routes2="/delete_account"
      />
      <Container>
        <FileUpload imgStore={imgStore} />
        <Box>
          <InputBox>
            <Title>이메일</Title>
            <Input>{data.email}</Input>
          </InputBox>
          <InputBox>
            <Title>비밀번호</Title>
            <PwdInput
              onChange={e => handleInput(e, 'password')}
              placeholder="비밀번호를 입력해주세요"
            ></PwdInput>
            <PwdBtn onClick={isPwdChanged}>변경</PwdBtn>
          </InputBox>
          <InputBox>
            <Title>매장</Title>
            <Input>{data.store}</Input>
          </InputBox>
          <InputBox>
            <Title>이름</Title>
            <Input>{data.name}</Input>
          </InputBox>
        </Box>
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
            content: {
              border: 'none',
              backgroundColor: 'white',
              overflow: 'hidden',
              fontSize: '100px',
              position: 'absolute',
              width: '500px',
              height: '400px',
              margin: '300px 0 0 -250px',
              left: '50%',
              // fontFamily: 'nationale-regular',
            },
          }}
        >
          <ModalContent>
            <ModalTitle>새 비밀번호</ModalTitle>
            <ModalInput
              onChange={e => handleInput(e, 'newPassword')}
              placeholder="  영소문자,숫자 혼합, 8자리 이상"
            ></ModalInput>
            <ModalTitle>새 비밀번호 확인</ModalTitle>
            <ModalInput
              onChange={e => handleInput(e, 'checkNewPassword')}
            ></ModalInput>
            <ModalBtn onClick={isModalBtnClicked}>확인</ModalBtn>
          </ModalContent>
        </ReactModal>
      </Container>
    </Wrapper>
  );
};

export default CrewAccount;

const Wrapper = styled.div``;
const Container = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  margin-top: 20px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const InputBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  position: relative;
`;
const Title = styled.div`
  margin-right: 10px;
  width: 60px;
  display: flex;
  align-items: center;
  font-size: 12px;
`;
const Input = styled.div`
  width: 200px;
  height: 30px;
  background-color: lightgray;
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 12px;
`;
const PwdInput = styled.input`
  width: 200px;
  height: 30px;
  background-color: lightgray;
  padding-left: 10px;
  font-size: 12px;
`;

const PwdBtn = styled.button`
  height: 30px;
  color: white;
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 12px;
  background-color: orange;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: orangered;
  }
`;
//modal
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;
const ModalTitle = styled.div`
  font-size: 13px;
  margin-bottom: 15px;
`;
const ModalInput = styled.input`
  width: 280px;
  height: 40px;
  background-color: lightgray;
  margin-bottom: 10px;
`;
const ModalBtn = styled.button`
  font-size: 13px;
  width: 70px;
  height: 35px;
  border-radius: 5px;
  background-color: orange;
  cursor: pointer;
`;
