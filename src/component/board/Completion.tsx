import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../shared/Header';
function Completion() {
  const [data, setData] = useState([]);

  return (
    <Container>
      <Header />
      <NavConatiner>
        <NavHolder>
          <NavWrapper>
            <NavList>
              <NavLink>GoRanking</NavLink>
            </NavList>
            <NavList>
              <NavLaterLink> Completion Ranking</NavLaterLink>
            </NavList>
            <NavList>
              <NavLaterLink>Store</NavLaterLink>
            </NavList>
          </NavWrapper>
        </NavHolder>
      </NavConatiner>
      <BannerContainer>
        <BannerHolder>
          <BannerTitle>Completion Ranking</BannerTitle>
        </BannerHolder>
      </BannerContainer>
    </Container>
  );
}

export default Completion;

const Container = styled.div`
  width: 100%;
`;

const NavConatiner = styled.nav`
  width: 100%;
  height: 40px;
  background-color: #a91419;
  font-size: 13px;
  line-height: 15px;
  color: #fff;
  width: 100%;
  text-transform: uppercase;
`;

const NavHolder = styled.div`
  padding: 10px 15px 9px 5px;
  max-width: 1070px;
  margin: 0 auto;
`;

const NavWrapper = styled.ul`
  position: static !important;
  left: 0 !important;
  top: 0 !important;
  height: auto !important;
  width: auto !important;
  margin: 0 !important;
  padding: 0 !important;
`;

const NavList = styled.li`
  float: left;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  outline: 0;
  letter-spacing: 1px;
`;

const NavLaterLink = styled.li`
  float: left;

  ::before {
    content: '/';
    color: #fff;
    color: rgba(255, 255, 255, 0.3);
    margin: 0 8px;
  }
`;

const BannerContainer = styled.div`
  background: #333;
  text-align: center;
  margin: 0 0 60px;
  position: relative;
  background-color: #ed1941;
`;

const BannerHolder = styled.div`
  max-width: 1090px;
  padding: 61px 15px 22px;
  margin: 0 auto;
  min-height: 180px;
  position: relative;
`;

const BannerTitle = styled.h1`
  font: 4em/1.036em 'Bebas Neue', cursive;
  color: #fff;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0 0 33px;
`;
