import React, { useState, useEffect } from 'react';
import { URL } from 'config';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import FileUpload from './FileUpload';
import styled from 'styled-components';

const AccountForm: React.FC<RouteComponentProps> = ({
  history,
}: RouteComponentProps) => {
  const [data, setData] = useState<any>([]);
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [checkNewPassword, setCheckNewPassword] = useState<string>('');
  const [pwError, setPwError] = useState<Boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  //Data 저장
  const token = window.sessionStorage.getItem('token');
  useEffect(() => {
    if (token) {
      fetch(`${URL}/user/info`, {
        method: 'GET',
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(res => {
          console.log(res.user_info[0]);
          setData(res.user_info[0]);
        });
    }
  }, []);

  //input 태그 값 저장
  const handleInput = (e: { target: { value: string } }, option: string) => {
    console.log(e.target.value);
    console.log(pwError);
    if (option === 'password') setPassword(e.target.value);
    if (option === 'newPassword') {
      setNewPassword(e.target.value);
    }
    if (option === 'checkNewPassword') {
      setCheckNewPassword(e.target.value);
    }
  };

  //비밀번호 유효성 검사
  useEffect(() => checkPassword(), [newPassword]);
  //콜백함수 쓰면 한 박자씩 느린것을 해결할 수 있음
  const checkPassword = () => {
    const check_num = /[0-9]/;
    const check_eng = /[a-z]/;
    if (
      password.length >= 8 &&
      check_num.test(newPassword) &&
      check_eng.test(newPassword)
    ) {
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  //백엔드 fetch :현재 비밀번호 보내기
  const isPwdChanged = () => {
    const token = window.sessionStorage.getItem('token');
    console.log(token);
    if (token) {
      fetch(`${URL}/user/check-password`, {
        method: 'POST',
        headers: { Authorization: token },
        body: JSON.stringify({
          password: password,
        }),
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          setModalIsOpen(true);
        } else {
          alert('비밀번호가 잘못되었습니다. 다시 입력해주세요');
        }
      });
    }
  };

  //백엔드 fetch: 새로운 비밀번호
  const isModalBtnClicked = () => {
    const token = window.sessionStorage.getItem('token');
    const fd = new FormData();
    fd.append('password', newPassword);

    if (pwError === true) {
      alert('비밀번호 형식을 다시 확인해주세요');
    }
    if (pwError === false && newPassword !== checkNewPassword) {
      alert('비밀번호가 다릅니다');
    }
    if (pwError === false && newPassword === checkNewPassword) {
      const token = window.sessionStorage.getItem('token');
      if (token) {
        fetch(`${URL}/user/password`, {
          method: 'POST',
          headers: { Authorization: token },
          body: JSON.stringify({
            password: newPassword,
          }),
        }).then(res => {
          console.log(res);
          if (res.status === 200) {
            window.sessionStorage.removeItem('token');
            alert('비밀번호가 변경되었습니다. 다시 로그인을 진행해주세요');
            history.push('/login');
          }
        });
      }
    }
  };

  return (
    <Wrapper>
      <Container>
        <FileUpload image={data.image} />
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
            <Input>{data.store__name}</Input>
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

export default withRouter(AccountForm);

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
