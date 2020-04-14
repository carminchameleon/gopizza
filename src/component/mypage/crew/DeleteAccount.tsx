import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { URL } from 'config';
import Header from 'shared/Header';
import Banner from 'shared/Banner';
import styled from 'styled-components';
ReactModal.setAppElement('#root');

const DeleteAccount = ({ history }: RouteComponentProps) => {
  const [password, setPassword] = useState<String>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [idNumber, setIdNumber] = useState<any>([]);

  const token = window.sessionStorage.getItem('token');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setPassword(event.target.value);
  };

  const isBtnClicked = () => {
    if (token) {
      fetch(`${URL}/user/check-password`, {
        method: 'POST',
        headers: { Authorization: token },
        body: JSON.stringify({
          password: password,
        }),
      })
        .then(res => res.json())
        .then(res => {
          // console.log(res.user_id);
          if (res.user_id) {
            setIdNumber(res.user_id);
            setModalIsOpen(true);
          }
          if (res.message === 'WRONG_PASSWORD') {
            alert('비밀번호가 잘못 입력되었습니다. 다시 입력해주세요.');
          }
        });
    }
  };

  //백엔드 fetch 보내기
  const isModalBtnClicked = () => {
    if (token) {
      fetch(`${URL}/user/delete/${idNumber}`, {
        method: 'DELETE',
        headers: { Authorization: token },
        body: JSON.stringify({
          password: password,
        }),
      }).then(res => {
        // console.log(res);
        if (res.status === 200) {
          alert('탈퇴가 신청되었습니다');
          window.sessionStorage.removeItem('token');
          history.push('/');
        }
      });
    }
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
      <InnerWarapper>
        <HeaderTitleBox>
          <HeaderTitle>Delete Account</HeaderTitle>
          <Description>계정을 삭제할 수 있습니다</Description>
        </HeaderTitleBox>
        <Container>
          <Box>
            <Title> 비밀번호를 입력하세요</Title>
            <Input type="password" onChange={handleInput}></Input>
            <Btn onClick={isBtnClicked}>탈퇴</Btn>
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
                  width: '400px',
                  height: '150px',
                  margin: '400px 0 0 -150px',
                  left: '50%',
                  // fontFamily: 'nationale-regular',
                },
              }}
            >
              <ModalContent>
                <ModalTitle>정말 탈퇴하시겠습니까?</ModalTitle>
                <ModalBtnBox>
                  <ModalBtn
                    onClick={() => {
                      history.push('/board');
                    }}
                  >
                    아니오
                  </ModalBtn>
                  <ModalBtn onClick={isModalBtnClicked}>네</ModalBtn>
                </ModalBtnBox>
              </ModalContent>
            </ReactModal>
          </Box>
        </Container>
      </InnerWarapper>
    </Wrapper>
  );
};

export default withRouter(DeleteAccount);

const Wrapper = styled.div``;
const InnerWarapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1090px;
`;
const HeaderTitleBox = styled.div`
  width: 100%;
`;
const HeaderTitle = styled.div`
  margin-bottom: 20px;
  text-align: center;
  letter-spacing: 0.1rem;
  color: #333;
  text-transform: uppercase;
  font: 2.5rem/1.071rem 'Bebas Neue', cursive;
`;
const Description = styled.div`
  padding-bottom: 50px;
  text-align: center;
  letter-spacing: 0.1rem;
  color: #948780;
  font-weight: 300;
  line-height: 20px;
  border-bottom: solid 3px rgb(252, 109, 2);
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  margin-top: 100px;
  width: 380px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px lightgray;
`;
const Title = styled.div`
  margin-bottom: 20px;
`;
const Input = styled.input`
  width: 280px;
  height: 40px;
  background-color: lightgray;
  margin-bottom: 15px;
`;
const Btn = styled.button`
  width: 70px;
  height: 35px;
  border-radius: 5px;
  font-size: 13px;
  color: white;
  background-color: rgb(252, 109, 2);
  cursor: pointer;
  &:hover {
    background-color: orange;
  }
  &:focus {
    outline: none;
  }
`;
//modal style
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
const ModalBtnBox = styled.div`
  display: flex;
  justify-content: center;
`;
const ModalBtn = styled.button`
  margin-left: 20px;
  font-size: 14px;
  color: white;
  width: 70px;
  height: 35px;
  border-radius: 5px;
  background-color: rgb(252, 109, 2);
  cursor: pointer;
  &:hover {
    background-color: orange;
  }
  &:focus {
    outline: none;
  }
`;
