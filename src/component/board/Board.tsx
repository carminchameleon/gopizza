import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../shared/Header';
import Completion from './Completion';
import Total from './Total';
import Time from './Time';
import Count from './Count';

const Board = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTime, setCurrentTime] = useState();
  const [userToken, setUserToken] = useState(false);
  const pageList = [
    'Total ranking',
    'Completion ranking',
    'Time ranking',
    'Count ranking',
  ];

  useEffect(() => {
    checkToken();
  }, []);

  const setPage = (pageId: number): void => {
    setCurrentPage(pageId);
    PageUI(pageId);
  };

  const checkToken = (): void => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      setUserToken(true);
    } else {
      alert('접근 권한이 없습니다. 로그인을 해주세요! :) ');
      setUserToken(false);
    }
  };

  const PageUI = (currentPage: number) => {
    if (currentPage === 0) {
      return <Total />;
    }
    if (currentPage === 1) {
      return <Completion />;
    }
    if (currentPage === 2) {
      return <Time />;
    }
    if (currentPage === 3) {
      return <Count />;
    }
  };

  return (
    <Container>
      <Header />
      <BannerContainer>
        <BannerHolder>
          <BannerTitle>Go ranking</BannerTitle>
        </BannerHolder>
      </BannerContainer>
      <NavConatiner>
        <NavHolder>
          <NavWrapper>
            {pageList.map((item: string, index: number) => {
              if (index === currentPage) {
                return (
                  <ColorList>
                    <NavLink
                      onClick={() => {
                        setPage(index);
                      }}
                    >
                      {item}
                    </NavLink>
                  </ColorList>
                );
              } else {
                return (
                  <NavList>
                    <NavLink
                      onClick={() => {
                        setPage(index);
                      }}
                    >
                      {item}
                    </NavLink>
                  </NavList>
                );
              }
            })}
          </NavWrapper>
        </NavHolder>
      </NavConatiner>
      {userToken ? <>{PageUI(currentPage)}</> : ''}
    </Container>
  );
};

export default Board;

const Container = styled.div`
  width: 100%;
`;

const NavConatiner = styled.nav`
  height: 40px;
  background-color: #a91419;
  font-size: 13px;
  line-height: 15px;
  color: #fff;
  width: 100%;
  text-transform: uppercase;
  margin-bottom: 60px;
`;

const NavHolder = styled.div`
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
  height: 40px;
  padding-top: 10px;
  :hover {
    background-color: rgba(222, 26, 33, 0.6);
    cursor: pointer;
  }
  :acitve {
    opacity: 0.3;
  }
`;

const ColorList = styled.div`
  float: left;
  height: 40px;
  padding-top: 10px;
  border-bottom: 5px solid;
  border-bottom-color: #ee6c71;
  :hover {
    background-color: rgba(222, 26, 33, 0.6);
    cursor: pointer;
  }
`;

const NavLink = styled.li`
  color: #fff;
  text-decoration: none;
  outline: 0;
  letter-spacing: 1px;
  margin: 0 8px;
`;

const BannerContainer = styled.div`
  background: #333;
  text-align: center;
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
  font: 5em/1.036em 'Bebas Neue', cursive;
  color: #fff;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0 0 33px;
`;
