import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { URL } from 'config';
import styled from 'styled-components';
import logo from '../images/gopizza_logo.png';

const Header = ({ history }: RouteComponentProps) => {
  const isLogoutClicked = () => {
    window.sessionStorage.removeItem('token');
    alert('로그아웃이 완료되었습니다.');
    history.push('/');
  };

  const isMypageClicked = () => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch(`${URL}/user/info`, {
        method: 'GET',
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(res => {
          // console.log(res.user_info[0]);
          if (res.user_info[0].grade__name === 'Admin') {
            history.push('/admin_page');
          }
          if (res.user_info[0].grade__name === 'Manager') {
            history.push('/manager_page');
          }
          if (res.user_info[0].grade__name === 'Crew') {
            history.push('/crew_account');
          }
        });
    }
  };
  return (
    <Container>
      <TitleContainer>
        <MainTitle>
          <LogoBox>
            <Logo src="http://localhost:3000/images/gopizza.png" />
          </LogoBox>

          <TitleBox
            onClick={() => {
              history.push('/board');
            }}
          >
            GOPIZZA
          </TitleBox>
        </MainTitle>
        <MenuContainer>
          <MenuTitle
            onClick={() => {
              history.push('/map');
            }}
          >
            Store
          </MenuTitle>
          <MenuTitle
            onClick={() => {
              history.push('/board');
            }}
          >
            ranking
          </MenuTitle>
          <MenuTitle
            onClick={() => {
              history.push('/system');
            }}
          >
            reward
          </MenuTitle>
          <MyPage onClick={isMypageClicked}>My page</MyPage>
          <LogoutTitle onClick={isLogoutClicked}>log out</LogoutTitle>
        </MenuContainer>
      </TitleContainer>
    </Container>
  );
};

export default withRouter(Header);

const Container = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  z-index: 400;

  box-shadow: 1px 1px 1px 1px #eee;
  display: block;
`;

const TitleContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  margin: 0px auto;
  letter-spacing: 2px;
  border-bottom-width: 4px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainTitle = styled.div`
  padding-top: 4px;
  font-size: 35px;
  color: #ff6d00;
  font-weight: 400;
  line-height: 60px;
  font-family: 'Bebas Neue', cursive;
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  cursor: pointer;
`;
const MyPage = styled.div`
  font-size: 24px;
  font-family: 'Bebas Neue', cursive;
  line-height: 65px;
  color: #ff6d00;
  font-weight: 400;
  margin-left: 30px;
  cursor: pointer;
`;
const MenuTitle = styled.div`
  font-size: 24px;
  font-family: 'Bebas Neue', cursive;
  line-height: 65px;
  color: #ff6d00;
  font-weight: 400;
  margin-left: 30px;
  cursor: pointer;
`;
const LogoutTitle = styled.div`
  font-size: 24px;
  font-family: 'Bebas Neue', cursive;
  line-height: 65px;
  color: red;
  font-weight: 400;
  margin-left: 30px;
  cursor: pointer;
`;

const LogoBox = styled.div`
  width: 35px;
  display: flex;
  flex-direction: center;
  justify-content: center;
`;
const Logo = styled.img`
  margin-top: 50%;
  width: 35px;
  height: 20px;
  transform: rotate(90deg);
`;

const TitleBox = styled.div``;
