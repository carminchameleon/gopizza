import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { BOARDCREWURL, BOARDSTOREURL, PROFILEURL } from 'config';
import Summary from './Summary';
import StoreSummary from './StoreSummary';
import Modal from 'react-modal';

interface CrewInfo {
  rank: number;
  name: string;
  store_name: string;
  total_score: number;
  average_time: number;
  count: number;
  completion_score: number;
  image: string;
  id: number;
}
const Count: React.FC = () => {
  const [data, setData] = useState([]);
  const [crew, setCrew] = useState(true);
  const [duration, setDuration] = useState(0);
  const [topCount, setTopCount] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [currentTime, setCurrentTime] = useState();
  Modal.setAppElement('#root');

  useEffect(() => {
    fetchData();
    handleRefresh();
  }, []);

  useEffect(() => {
    fetchData();
  }, [crew, duration]);

  const handleRange = (boolean: boolean): void => {
    setCrew(boolean);
  };

  const fetchData = (): void => {
    axios
      .get(
        `${
          crew ? BOARDCREWURL : BOARDSTOREURL
        }?limit=20&time_delta=${duration}&order_by=total_count`,
      )
      .then((response: AxiosResponse): void => {
        setData(response.data.ranking);
        setTopCount(response.data.ranking[0]['count']);
      });
  };

  const fetchHistory = (): void => {
    axios
      .get(
        `${crew ? BOARDCREWURL : BOARDSTOREURL}?limit=20&order_by=total_count`,
      )
      .then((response: AxiosResponse): void => {
        setData(response.data.ranking);
        setTopCount(response.data.ranking[0]['count']);
      });
  };

  const selectDuration = (event: any) => {
    if (event.target.value === '0') {
      setDuration(0);
    } else if (event.target.value === '1') {
      setDuration(7);
    } else if (event.target.value === '2') {
      setDuration(31);
    } else if (event.target.value === '3') {
      setDuration(365);
    } else {
      setDuration(1000);
      fetchHistory();
    }
  };

  const getPercent = (count: number): number => {
    return Math.round((count / topCount) * 100 * 100) / 100;
  };

  const getGoal = (count: number): number => {
    return topCount - count;
  };

  const handleModal = (boolean: boolean, userId: number) => {
    setModalIsOpen(true);
    setCurrentUser(userId);
  };

  const handleRefresh = (): void => {
    const Time = new Date();
    const now =
      Time.getHours() +
      ' : ' +
      Time.getMinutes() +
      ' : ' +
      Time.getMilliseconds();

    setCurrentTime(now);
    console.log('count', duration);
    if (
      duration === 0 ||
      duration === 7 ||
      duration === 31 ||
      duration === 365
    ) {
      fetchData();
    } else {
      fetchHistory();
    }
  };

  return (
    <Container>
      <MainHolder>
        <HeaderContainer>
          <HeaderTitleBox>
            <HeaderTitle>Count Ranking</HeaderTitle>
            <Description>
              고피자에서 피자를 가장 많이 만든 사람은 누구일까요?
            </Description>
            <Description>
              랭킹 넘버원과 나의 차이! 지금 확인해 보아요~
            </Description>
          </HeaderTitleBox>
          <TimeContainer>
            <TimeBox>
              <div>{currentTime}</div>
            </TimeBox>
            <RefreshButtonBox>
              <RefreshButton
                onClick={() => {
                  handleRefresh();
                }}
              >
                Refresh
              </RefreshButton>
            </RefreshButtonBox>
          </TimeContainer>
          <SelectContainer>
            <RangeContainer>
              <TitleContainer>
                <RangeTitle
                  onClick={() => {
                    handleRange(true);
                  }}
                  currentStatus={crew}
                >
                  Crew
                </RangeTitle>
                <RangeTitle
                  onClick={() => {
                    handleRange(false);
                  }}
                  currentStatus={!crew}
                >
                  Store
                </RangeTitle>
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
              <TableHeadRow>
                <TableHeadHeadingRank>Rank</TableHeadHeadingRank>
                {crew ? (
                  <TableHeadHeadingName>Partictipant</TableHeadHeadingName>
                ) : (
                  <TableHeadHeadingName>Store</TableHeadHeadingName>
                )}
                <TableHeadHeadingCounts>Counts</TableHeadHeadingCounts>
                <TableHeadPercent>Percentage 1등 대비 달성률</TableHeadPercent>
                <TableHeadGoal>Goal</TableHeadGoal>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {data.map((item: CrewInfo, index: number) => {
                const numberUI = (rank: number) => {
                  if (rank === 1) {
                    return <RankingGold>G</RankingGold>;
                  }
                  if (rank === 2) {
                    return <RankingSilver>S</RankingSilver>;
                  }
                  if (rank === 3) {
                    return <RankingBronze>B</RankingBronze>;
                  }
                  {
                    return <RankingNumber>{rank}</RankingNumber>;
                  }
                };
                const WinnerUI = (rank: number) => {
                  if (rank === 0) {
                    return (
                      <GoalScore style={{ color: '#9198e5' }}>Winner</GoalScore>
                    );
                  } else {
                    return <GoalScore>{getGoal(item.count)}판</GoalScore>;
                  }
                };

                const profilePic = (url: string | null) => {
                  if (url !== null) {
                    return <ProfileImg src={item.image}></ProfileImg>;
                  } else {
                    return <ProfileImg src={PROFILEURL}></ProfileImg>;
                  }
                };

                return (
                  <TableBodyTableRow
                    title={`랭킹 1등의 피자 개수 대비 ${item.name} 크루의 피자 개수를 백분율로 표시한 결과입니다.`}
                    key={index}
                    onClick={() => {
                      handleModal(true, item.id);
                    }}
                  >
                    <Ranking>{numberUI(item.rank)}</Ranking>
                    <PersonInfo>
                      {crew ? (
                        <PersonBox>
                          <PhotoBox>{profilePic(item.image)}</PhotoBox>
                          <InfoBox>
                            <Name>{item.name}</Name>
                            <Store>{item.store_name}</Store>
                          </InfoBox>
                        </PersonBox>
                      ) : (
                        <StoreName>{item.name}</StoreName>
                      )}
                    </PersonInfo>
                    <GoalScore>{item.count}판</GoalScore>
                    <PercentContainer>
                      <PercentBar
                        style={{ width: `${getPercent(item.count)}%` }}
                      >
                        &nbsp;
                      </PercentBar>
                      <PercentNumber
                        style={{ width: `${getPercent(item.count)}%` }}
                      >
                        {getPercent(item.count)}%
                      </PercentNumber>
                    </PercentContainer>

                    {WinnerUI(index)}
                  </TableBodyTableRow>
                );
              })}
            </TableBody>
          </TableContainer>
        </TableSection>
      </MainHolder>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.75)',
          },
          content: {
            width: '660px',
            height: '460px',
            boxSizing: 'border-box',
            padding: 0,
            borderRadius: '10px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        {crew ? (
          <Summary currentUser={currentUser} />
        ) : (
          <StoreSummary currentUser={currentUser} />
        )}
      </Modal>
    </Container>
  );
};

export default Count;

const Load = keyframes` 
from {width: 0%}
to {width: getPercent(item.count)%}
`;

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
  margin-bottom: 15px;
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

const Description = styled.div`
  text-align: center;
  letter-spacing: 0.1rem;
  color: #948780;
  font-weight: 300;
  line-height: 20px;
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

const RangeContainer = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  border-bottom: 3px solid #00c8cb;
  opacity: 0.7;
  z-index: 10;
`;

const RangeTitle = styled.button<{ currentStatus: boolean }>`
  width: 10%;
  padding: 10px;
  font: 1rem 'Bebas Neue', cursive;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom: 0px;
  position: relative;
  margin-right: 2px;
  margin-bottom: 3px;
  opacity: 0.8;
  border-left: 2px solid
    ${props => (props.currentStatus ? '#00c8cb' : '#b8bfc2')};
  border-right: 2px solid
    ${props => (props.currentStatus ? '#00c8cb' : '#b8bfc2')};
  border-top: 2px solid
    ${props => (props.currentStatus ? '#00c8cb' : '#b8bfc2')};
  color: ${props => (props.currentStatus ? '#00c8cb' : '#b8bfc2')};
  outline: none;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
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
  width: 5%;
  white-space: nowrap;
  text-align: start;
`;

const TableHeadHeadingName = styled.th`
  text-align: start;
  width: 10%;
`;

const TableHeadHeadingCounts = styled.th`
  text-align: start;
  width: 5%;
`;

const TableHeadPercent = styled.th`
  text-align: start;
  width: 40%;
`;

const TableHeadGoal = styled.th`
  text-align: start;
  width: 5%;
`;

const TableBody = styled.tbody``;

const TableBodyTableRow = styled.tr`
  height: 80px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  :hover {
    cursor: pointer;
    background-color: #e5e5e5;
  }
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
  font: 1.3rem 'Bebas Neue', cursive;
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
  background-color: #dab509;
  color: white;
  font: 1.1rem 'Bebas Neue', cursive;
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
  color: white;
  background-color: #a1a1a1;
  font: 1.1rem 'Bebas Neue', cursive;
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
  color: white;
  background-color: #ae7058;
  font: 1.1rem 'Bebas Neue', cursive;
`;

const GoalScore = styled.td`
  vertical-align: middle;
  text-align: start;
  font: 1.2rem 'Bebas Neue', cursive;
  letter-spacing: 1px;
`;

const PercentContainer = styled.td`
  vertical-align: start;
  padding-top: 20px;
  text-align: end;
  font: 1.2rem 'Bebas Neue', cursive;
  width: 100%;
  padding-right: 20px;
`;

const PercentBar = styled.div`
  padding-right: 10px;
  width: 100%;
  height: 50%;
  background: linear-gradient(-25deg, #00c8cb, #9198e5);
  opacity: 0.7;
  color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  animation: ${Load} 1.5s forwards;
`;

const PercentNumber = styled.div`
  color: #00c8cb;
  animation: ${Load} 1.5s forwards;
`;

const PersonInfo = styled.td`
  vertical-align: middle;
`;
const PersonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  text-align: start;
`;

const PhotoBox = styled.div`
  width: 20%;
  height: 100%;
  margin-right: 9%;
`;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const InfoBox = styled.div`
  margin-left: 10px;

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

const RangeBar = styled.nav`
  max-width: 1090px;
  width: 100%;
  height: 4px;
  background-color: #aaa;
`;

const TitleBar = styled.div`
  width: 900px;
  height: 3px;
  background-color: black;
  display: block;
`;

const StoreName = styled.div`
  font: 1.2rem 'Bebas Neue', cursive;
  margin: 0 auto;
  text-align: start;
  color: black;
`;

const TimeContainer = styled.div`
  width: 100%;
  font: 1.2rem 'Bebas Neue', cursive;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const RefreshButton = styled.div`
  font: 1.2rem 'Bebas Neue', cursive;
  text-align: center;
  line-height: 2rem;
  :hover {
    cursor: pointer;
    color: #ff6d00;
  }
`;

const RefreshButtonBox = styled.div`
  border-radius: 4px;
  height: 30px;
  border: 1px solid #d4d4d4;
  width: 70px;
  display: flex;
  color: #d4d4d4;
  flex-direction: row;
  justify-content: center;
`;

const TimeBox = styled.div`
  display: flex;
  width: 100px;
  color: #d4d4d4;
  flex-direction: row;
  justify-content: center;
  line-height: 2rem;
`;
