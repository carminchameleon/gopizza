import React from 'react';
import styled from 'styled-components';
import logo from '../images/gopizza_logo.png';
function Header() {
  return (
    <Container>
      <TitleContainer>
        <MainTitle>
          <LogoBox>
            <Logo src="http://localhost:3000/images/gopizza.png" />
          </LogoBox>
          <TitleBox>
            <a href="">GOPIZZA</a>
          </TitleBox>
        </MainTitle>
        <MenuContainer>
          <MenuTitle>
            <a href="">Map</a>
          </MenuTitle>
          <MenuTitle>
            <a href="">reward</a>
          </MenuTitle>
          <MenuTitle>
            <a href="">My page</a>
          </MenuTitle>
          <LogoutTitle>
            <a href="">log out</a>
          </LogoutTitle>
        </MenuContainer>
      </TitleContainer>
    </Container>
  );
}

export default Header;

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
`;

const MenuTitle = styled.div`
  font-size: 24px;
  font-family: 'Bebas Neue', cursive;
  line-height: 65px;
  color: #ff6d00;
  font-weight: 400;
  margin-left: 30px;
`;
const LogoutTitle = styled.div`
  font-size: 24px;
  font-family: 'Bebas Neue', cursive;
  line-height: 65px;
  color: red;
  font-weight: 400;
  margin-left: 30px;
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
