import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../shared/Header';
import Completion from './Completion';
import Total from './Total';
import Time from './Time';
import Count from './Count';

const Board = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalOpen, setTotalOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState();
  useEffect(() => {
    getTime();
  }, []);

  const setPage = (pageId: number): void => {
    setCurrentPage(pageId);
    PageUI(pageId);
  };

  const getTime = (): void => {
    var currentDate = new Date();
    var msg = '현재 시간:' + currentDate.getHours() + '시';
    msg += currentDate.getMinutes() + '분';
    msg += currentDate.getSeconds() + '초';
    setCurrentTime(msg);
  };

  const PageUI = (currentPage: number) => {
    if (currentPage === 0) {
      console.log(currentPage);
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
            {currentPage === 0 ? (
              <ColorList>
                <NavLink
                  onClick={() => {
                    setPage(0);
                  }}
                >
                  Total Ranking
                </NavLink>
              </ColorList>
            ) : (
              <NavList>
                <NavLink
                  onClick={() => {
                    setPage(0);
                  }}
                >
                  Total Ranking
                </NavLink>
              </NavList>
            )}
            {currentPage === 1 ? (
              <ColorList>
                <NavLink
                  onClick={() => {
                    setPage(1);
                    setTotalOpen(true);
                  }}
                >
                  Completion Ranking
                </NavLink>
              </ColorList>
            ) : (
              <NavList>
                <NavLink
                  onClick={() => {
                    setPage(1);
                  }}
                >
                  Completion Ranking
                </NavLink>
              </NavList>
            )}
            {currentPage === 2 ? (
              <ColorList>
                <NavLink
                  onClick={() => {
                    setPage(2);
                  }}
                >
                  Time Ranking
                </NavLink>
              </ColorList>
            ) : (
              <NavList>
                <NavLink
                  onClick={() => {
                    setPage(2);
                  }}
                >
                  Time Ranking
                </NavLink>
              </NavList>
            )}
            {currentPage === 3 ? (
              <ColorList>
                <NavLink
                  onClick={() => {
                    setPage(3);
                  }}
                >
                  Count Ranking
                </NavLink>
              </ColorList>
            ) : (
              <NavList>
                <NavLink
                  onClick={() => {
                    setPage(3);
                  }}
                >
                  Count Ranking
                </NavLink>
              </NavList>
            )}
          </NavWrapper>
        </NavHolder>
        {/* <NavMoveBar>
          <Bar></Bar>
        </NavMoveBar> */}
      </NavConatiner>
      <>{PageUI(currentPage)}</>
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
  font: 4em/1.036em 'Bebas Neue', cursive;
  color: #fff;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0 0 33px;
`;

const NavMoveBar = styled.div`
  width: 100%;
  height: 7px;
  background-color: yellow;
`;

const Bar = styled.div`
  width: 100%;
  height: 7px;
  background-color: yellow;
`;

const RefreshContainer = styled.div`
  border: 2px solid red;
  width: 100%;
  height: 50px;
`;

const RefreshButton = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
`;
