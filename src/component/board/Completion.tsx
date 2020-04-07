import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { BOARDCREWURL } from 'config';
import { BOARDSTOREURL } from 'config';

function Completion() {
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState(1);
  const [crew, setCrew] = useState(true);
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [crew, duration]);

  const fetchData = (): void => {
    axios
      .get(
        `${
          crew ? BOARDCREWURL : BOARDSTOREURL
        }?limit=20&time_delta=${duration}&order_by=completion_score`,
      )
      .then((response: AxiosResponse): void => {
        setData(response.data.ranking);
      });

    console.log('firstData');
  };

  const fetchHistory = (): void => {
    axios
      .get(
        `${
          crew ? BOARDCREWURL : BOARDSTOREURL
        }?limit=20&order_by=completion_score`,
      )
      .then((response: AxiosResponse): void => {
        setData(response.data.ranking);
      });
  };

  const selectDuration = (event: any) => {
    console.log(typeof event.target.value);
    if (event.target.value === '0') {
      setDuration(1);
    } else if (event.target.value === '1') {
      setDuration(7);
    } else if (event.target.value === '2') {
      setDuration(31);
    } else if (event.target.value === '3') {
      setDuration(365);
    } else {
      fetchHistory();
    }
  };

  const handleRange = (boolean: boolean): void => {
    setData([]);
    setCrew(boolean);
  };

  return (
    <Container>
      <MainHolder>
        <HeaderContainer>
          <HeaderTitleBox>
            <HeaderTitle>Completion Ranking</HeaderTitle>
            <Description>피자의 완성도로 보는 랭킹</Description>
            <Description>
              토핑, 소스, 치즈, 퀄리티 하나도 놓치지 않을거에요!
            </Description>
          </HeaderTitleBox>
          <SelectContainer>
            <RangeContainer>
              <TitleContainer>
                {crew ? (
                  <CurrentRangeTitle onClick={() => handleRange(true)}>
                    Crew
                  </CurrentRangeTitle>
                ) : (
                  <RangeTitle onClick={() => handleRange(true)}>
                    Crew
                  </RangeTitle>
                )}
                {crew ? (
                  <RangeTitle onClick={() => handleRange(false)}>
                    Store
                  </RangeTitle>
                ) : (
                  <CurrentRangeTitle onClick={() => handleRange(false)}>
                    Store
                  </CurrentRangeTitle>
                )}
              </TitleContainer>
            </RangeContainer>
            <DropdownContainer>
              <Dropdown>
                <DurationOptions onChange={selectDuration}>
                  <Duration value="0">Daily</Duration>
                  <Duration value="1">Weekly</Duration>
                  <Duration value="2">Monthly</Duration>
                  <Duration value="3">Yearly</Duration>
                  <Duration value="4">history</Duration>
                </DurationOptions>
              </Dropdown>
            </DropdownContainer>
          </SelectContainer>
        </HeaderContainer>

        <TableSection>
          <TableContainer>
            <TableHead>
              <TableHeadRow style={{ color: '#4d4d4d' }}>
                <TableHeadHeadingRank>Rank</TableHeadHeadingRank>
                {crew ? (
                  <TableHeadHeadingName>Partictipant</TableHeadHeadingName>
                ) : (
                  <TableHeadHeadingName>Store</TableHeadHeadingName>
                )}
                <TableHeadHeadingTotalScore>
                  Total Score
                </TableHeadHeadingTotalScore>
                <TableHeadDetailScore>Quality</TableHeadDetailScore>
                <TableHeadDetailScore>Sauce</TableHeadDetailScore>
                <TableHeadDetailScore>Cheese</TableHeadDetailScore>
                <TableHeadDetailScore>Topping</TableHeadDetailScore>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {data.map((item: any, index: number) => {
                const numberUI = (index: number) => {
                  if (index === 1) {
                    return <RankingGold>G</RankingGold>;
                  }
                  if (index === 2) {
                    return <RankingSilver>S</RankingSilver>;
                  }
                  if (index === 3) {
                    return <RankingBronze>B</RankingBronze>;
                  }
                  {
                    return <RankingNumber>{index}</RankingNumber>;
                  }
                };

                return (
                  <TableBodyTableRow key={index}>
                    <Ranking>{numberUI(item.rank)}</Ranking>
                    <PersonInfo>
                      {crew ? (
                        <PersonBox>
                          <PhotoBox>
                            <ProfileImg src="http://localhost:3000/images/defaultProfile.png"></ProfileImg>
                          </PhotoBox>
                          <InfoBox>
                            <Name>{item.name}</Name>
                            <Store>{item.store_name}</Store>
                          </InfoBox>
                        </PersonBox>
                      ) : (
                        <StoreName>{item.name}</StoreName>
                      )}
                    </PersonInfo>
                    <TotalScore>{item.completion_score}</TotalScore>
                    <DetailScore>{item.quality}</DetailScore>
                    <DetailScore>{item.sauce}</DetailScore>
                    <DetailScore>{item.cheese}</DetailScore>
                    <DetailScore>{item.topping}</DetailScore>
                  </TableBodyTableRow>
                );
              })}
            </TableBody>
          </TableContainer>
        </TableSection>
      </MainHolder>
    </Container>
  );
}

export default Completion;

const Container = styled.div`
  width: 100%;
`;

const MainHolder = styled.div`
  max-width: 1090px;
  margin: 0 auto;
  padding: 0 15px;
  position: relative;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderTitleBox = styled.div`
  margin-bottom: 40px;
`;

const HeaderTitle = styled.div`
  text-align: center;
  letter-spacing: 0.1rem;
  color: #333;
  text-transform: uppercase;
  margin: 0;
  font: 2.5rem/1.071rem 'Bebas Neue', cursive;
  margin-bottom: 20px;
`;
const SelectContainer = styled.div`
  width: 100%;
  height: 60px;
  position: relative;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  position: relative;
`;
const DropdownContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 20%;
  height: 60px;
`;
const Dropdown = styled.div`
  padding: 5px;
  border-bottom: 0;
  border: 1px solid #aaa;
  position: relative;

  opacity: 0.3;
  select {
    width: 100%;
    border: 0;
    background-color: transparent;
    padding-left: 5px;
    cursor: pointer;
    font: 16px 'Bebas Neue', cursive;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
  }

  :after {
    content: 'keyboard_arrow_down';
    font-family: 'Material Icons';
    position: absolute;
    right: 10px;
    pointer-events: none;
    transition: 0.2s all ease;
    transform: rotate(180deg);
  }
  :hover::after {
    color: orange;
    transform: rotate(360deg);
  }
`;

const DurationOptions = styled.select``;

const Duration = styled.option`
  color: blue;
`;
const Description = styled.div`
  text-align: center;
  letter-spacing: 0.1rem;
  color: #948780;
  font-weight: 300;
  line-height: 20px;
`;

const TableSection = styled.section`
  width: 100%;
`;

const TableContainer = styled.table`
  table-layout: fixed;
  margin: 0 0 60px;
  border-collapse: collapse;
  width: 100%;
  color: #999;
`;

const TableHead = styled.thead`
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
`;

const TableHeadRow = styled.tr`
  font-size: 0.814rem;
  line-height: 1.172em;
  color: #999;
  text-transform: uppercase;
  font-weight: 700;
  display: table-row;
  height: 30px;
  border-bottom: 1px solid #ddd;
  font: 1.2rem 'Bebas Neue', cursive;
`;

const TableHeadHeadingRank = styled.th`
  width: 9%;
  white-space: nowrap;
  text-align: start;
`;

const TableHeadHeadingName = styled.th`
  text-align: start;
  width: 30%;
`;

const TableHeadHeadingTotalScore = styled.th`
  text-align: start;
  width: 20%;
`;

const TableHeadDetailScore = styled.th`
  text-align: start;
  width: 10%;
`;

const TableBody = styled.tbody``;

const TableBodyTableRow = styled.tr`
  height: 80px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const Ranking = styled.td`
  vertical-align: middle;
  text-align: start;
  padding-left: 10px;
`;

const RankingNumber = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  padding: 3px 0 0;
  text-align: center;
  color: #999999;
  font: 1.2rem 'Bebas Neue', cursive;
`;

const RankingGold = styled.span`
  display: inline-block;
  vertical-align: middle;
  border-radius: 30px;
  width: 30px;
  height: 30px;
  padding: 3px 0 0;
  border: 2px solid #dab509;
  text-align: center;
  color: #dab509;
`;

const RankingSilver = styled.span`
  display: inline-block;
  vertical-align: middle;
  border-radius: 30px;
  width: 30px;
  height: 30px;
  padding: 3px 0 0;
  border: 2px solid #a1a1a1;
  text-align: center;
  color: #a1a1a1;
`;

const RankingBronze = styled.span`
  display: inline-block;
  vertical-align: middle;
  border-radius: 30px;
  width: 30px;
  height: 30px;
  padding: 3px 0 0;
  border: 2px solid #ae7058;
  text-align: center;
  color: #ae7058;
`;

const TotalScore = styled.td`
  vertical-align: middle;
  text-align: start;
  font: 1.2rem 'Bebas Neue', cursive;
`;

const DetailScore = styled.td`
  text-align: start;
  vertical-align: middle;
  font: 1rem 'Bebas Neue', cursive;
`;

const PersonInfo = styled.td`
  vertical-align: middle;
`;
const PersonBox = styled.div`
  display: flex;
  flex-direction: row;
  text-align: start;
`;
const PhotoBox = styled.div`
  width: 20%;
  height: 100%;
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const InfoBox = styled.div`
  margin-left: 10px;
  width: 80%;
  display: flex;
  flex-direction: column;
`;
const Name = styled.strong`
  height: 50%;
  font-size: 17px;
  font-weight: 500;
  color: #333;
  line-height: 20px;
`;
const Store = styled.div`
  height: 50%;
  line-height: 20px;
  font-size: 15px;
`;

const RangeContainer = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  border-bottom: 3px solid #00c8cb;
  opacity: 0.7;
  z-index: 10;
`;

const RangeTitle = styled.button`
  width: 10%;
  padding: 10px;
  color: #b8bfc2;
  font: 1rem 'Bebas Neue', cursive;
  border-top: 2px solid #b8bfc2;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-left: 2px solid #b8bfc2;
  border-right: 2px solid #b8bfc2;
  border-bottom: 0px;
  position: relative;
  margin-right: 2px;
  margin-bottom: 3px;
  opacity: 0.8;
`;

const CurrentRangeTitle = styled.button`
  width: 10%;
  color: #00c8cb;
  padding: 10px;
  font: 1rem 'Bebas Neue', cursive;
  border-top: 2px solid #00c8cb;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-left: 2px solid #00c8cb;
  border-right: 2px solid #00c8cb;
  border-bottom: 0px;
  position: relative;
  margin-right: 2px;
  margin-bottom: 3px;
  opacity: 0.8;
`;

const StoreName = styled.div`
  font: 1.2rem 'Bebas Neue', cursive;
  margin: 0 auto;
  text-align: start;
  color: black;
`;
