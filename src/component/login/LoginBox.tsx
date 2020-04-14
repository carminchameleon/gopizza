import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { withRouter } from 'react-router-dom';
import { History, LocationState } from 'history';
import { URL } from 'config';
import styled from 'styled-components';
ReactModal.setAppElement('#root');

interface Props {
  history: History<LocationState>;
}

const LoginBox = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const [checkEmail, setCheckEmail] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePwd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(event.target.value);
  };
  const handleLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (!email) {
      alert('아이디를 입력하세요');
    } else if (!pwd) {
      alert('비밀번호를 입력하세요');
    } else {
      loginFetch();
    }
  };

  const loginFetch = () => {
    fetch(`${URL}/user/sign-in`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
      .then(res => res.json())
      // .then(res => console.log(res));이거 진행하면 뒤에서 작업 못함. 들어온 값이 없어지니까
      .then(res => {
        if (res.message === 'Need Manager Approval') {
          alert('승인처리 중 입니다.');
        }
        if (res.token) {
          sessionStorage.setItem('token', res.token);
          alert('로그인이 완료되었습니다');
          props.history.push('/board');
        }
      })
      .catch(error => {
        alert('로그인을 다시 진행해주세요');
        console.error('Error:', error);
      });
  };
  //비밀번호 찾기
  const CheckEmailForPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckEmail(event.target.value);
  };

  const isModalBtnClicked = () => {
    if (checkEmail.length === 0) {
      alert('이메일을 입력해주세요');
    } else if (!(checkEmail.includes('@') && checkEmail.includes('.'))) {
      alert('이메일 형식을 올바르게 입력해주세요');
    } else {
      fetch(`${URL}/user/new-password`, {
        method: 'POST',
        body: JSON.stringify({
          email: checkEmail,
        }),
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          alert(
            '이메일로 새로운 비밀번호가 전송되었습니다. 이메일을 확인해주세요',
          );
          window.location.reload();
        } else {
          alert('이메일을 다시 입력해주세요.');
        }
      });
    }
  };

  return (
    <>
      <Wrapper>
        <Title>GO LOGIN</Title>
        <Container>
          <InputBox>
            <EmailInput
              onChange={handleEmail}
              type="text"
              placeholder="  이메일을 입력하세요"
            />
            <PwdInput
              onChange={handlePwd}
              type="password"
              placeholder="  비밀번호를 입력하세요"
            />
          </InputBox>
          <LoginBtn onClick={handleLogin}>LOGIN</LoginBtn>
          <Div>
            회원이 아니신가요?
            <Register onClick={() => props.history.push('/signup')}>
              회원가입하기
            </Register>
          </Div>
          <Div>
            비밀번호를 잊으셨나요?
            <FindPwd onClick={() => setModalIsOpen(true)}>비밀번호찾기</FindPwd>
          </Div>
        </Container>
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
              height: '200px',
              margin: '300px 0 0 -250px',
              left: '50%',
              // fontFamily: 'nationale-regular',
            },
          }}
        >
          <ModalContent>
            <ModalTitle>가입하신 이메일을 입력하세요</ModalTitle>
            <ModalInput onChange={CheckEmailForPw}></ModalInput>
            <ModalBtn onClick={isModalBtnClicked}>확인</ModalBtn>
          </ModalContent>
        </ReactModal>
      </Wrapper>
    </>
  );
};

export default withRouter(LoginBox);

const Wrapper = styled.div`
  padding: 80px 0;
  width: 555px;
  background-color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Title = styled.div`
  margin-bottom: 30px;
  color: rgb(252, 109, 2);
  font-weight: bold;
  font: 2.5rem/1.071rem 'Bebas Neue', cursive;
`;
const Container = styled.div``;
const InputBox = styled.div``;
const EmailInput = styled.input`
  margin-bottom: 10px;
  width: 280px;
  height: 50px;
  background-color: #ddd;
`;
const PwdInput = styled.input`
  margin-bottom: 10px;
  width: 280px;
  height: 50px;
  background-color: #ddd;
`;
const LoginBtn = styled.button`
  margin-bottom: 10px;
  width: 280px;
  height: 45px;
  color: white;
  background-color: rgba(252, 109, 2);
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: orange;
  }
`;
const Div = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;
const Register = styled.span`
  margin-left: 8px;
  color: rgba(252, 109, 2);
  font-size: 13px;
  cursor: pointer;
  &:hover {
    color: orange;
  }
`;
const FindPwd = styled.span`
  margin-left: 8px;
  color: rgba(252, 109, 2);
  font-size: 13px;
  cursor: pointer;
  &:hover {
    color: orange;
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
  font-size: 15px;
  margin-bottom: 15px;
`;
const ModalInput = styled.input`
  width: 280px;
  height: 40px;
  background-color: lightgray;
  font-size: 14px;
  margin-bottom: 10px;
`;
const ModalBtn = styled.button`
  font-size: 15px;
  color: white;
  width: 70px;
  height: 35px;
  border-radius: 5px;
  background-color: rgba(252, 109, 2);
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: orange;
  }
`;
