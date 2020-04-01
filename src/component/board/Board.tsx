import React from 'react';
import styled from 'styled-components';
import Header from '../../shared/Header';
import Completion from './Completion';

const Board = () => {
  return (
    <Container>
      <Header />
      <BoardContainer>
        <BoardHeader>
          <HeaderTitle>Go ranking</HeaderTitle>
          <MenuContainer>
            <MenuTitle>
              <MenuLink href="http://localhost:3000/board/completion">
                🦿Completion Ranking
              </MenuLink>
            </MenuTitle>
            <MenuTitle>
              <MenuLink>⏱Time Ranking</MenuLink>
            </MenuTitle>
            <MenuTitle>
              <MenuLink>🍕Counts Ranking </MenuLink>
            </MenuTitle>
          </MenuContainer>
        </BoardHeader>
        <Wrapper>
          <HeaderBox>
            <TitleHeader>Overall Ranking</TitleHeader>
          </HeaderBox>
        </Wrapper>
      </BoardContainer>
    </Container>
  );
};

export default Board;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 0 6px;
`;

const BoardContainer = styled.section`
  padding: 74px 15px 0;
  max-width: 1090px;
  margin: 0 auto;
`;

const BoardHeader = styled.div`
  display: table;
  width: 100%;
  table-layout: fixed;
  margin: 0 0 55px;
`;

const HeaderTitle = styled.h2`
  float: left;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  font: 2em/1.071em 'Bebas Neue', cursive;
`;

const MenuContainer = styled.ul`
  float: right;
  font-weight: 500;
  margin: 6px 0 0;
`;

const MenuLink = styled.a`
  color: #acacac;
  color: #4d4d4d;
  text-decoration: none;
`;

const MenuTitle = styled.li`
  float: left;
  margin-left: 30px;
  font-size: 14px;
`;

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 0 48px;
  border: 1px solid orange;
  height: 100vh;
`;

const HeaderBox = styled.header`
  display: table;
  width: 100%;
  table-layout: fixed;
`;

const TitleHeader = styled.h2`
  float: left;
  color: #333;
  text-transform: uppercase;
  margin: 0;
  font: 1.8em/1.071em 'Bebas Neue', cursive;
  letter-spacing: 2px;
`;
