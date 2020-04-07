import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { URL } from 'config';
import Header from 'shared/Header';
import Banner from 'shared/Banner';
import styled from 'styled-components';
// ReactModal.setAppElement('#main');

const DeleteAccount: React.FC<RouteComponentProps> = ({
  history,
}: RouteComponentProps) => {
  const [password, setPassword] = useState<String>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  //백엔드 fetch 보내기
  const isModalBtnClicked = () => {
    const token = window.sessionStorage.getItem('token');
    console.log(token);
    if (token) {
      fetch(`${URL}`, {
        method: 'DELETE',
        headers: { token: token },
        body: JSON.stringify({
          password: password,
        }),
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          alert('탈퇴가 완료되었습니다');
          history.push('/login');
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
      <Container>
        <Box>
          <Title> 비밀번호를 입력하세요</Title>
          <Input onChange={handleInput}></Input>
          <Btn onClick={() => setModalIsOpen(true)}>탈퇴</Btn>
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
              <ModalBtn onClick={isModalBtnClicked}>네</ModalBtn>
            </ModalContent>
          </ReactModal>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default withRouter(DeleteAccount);

const Wrapper = styled.div``;
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
  background-color: orange;
  cursor: pointer;
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
  font-size: 13px;
  margin-bottom: 15px;
`;
const ModalBtn = styled.button`
  font-size: 13px;
  width: 70px;
  height: 35px;
  border-radius: 5px;
  background-color: orange;
  cursor: pointer;
`;
