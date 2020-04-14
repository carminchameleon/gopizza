import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { BOARDCREWURL, BOARDSTOREURL, PROFILEURL, PIZZALISTURL } from 'config';
import Summary from './Summary';
import StoreSummary from './StoreSummary';
import Modal from 'react-modal';

interface CrewInfo {
  name: string;
  store_name: string;
  total_score: number;
  average_time: number;
  count: number;
  completion_score: number;
  image: string;
  id: number;
  rank: number;
  record: string;
}
interface PizzaList {
  id: number;
  image: string;
  name_en: string;
  name_kr: string;
}
function Time() {
  const [data, setData] = useState<CrewInfo[]>([]);
  const [crew, setCrew] = useState(true);
  const [duration, setDuration] = useState(1);
  const [record, setRecord] = useState('shortest_time');
  const [shortest, setShortest] = useState(true);
  const [pizzaId, setPizzaId] = useState(1);
  const [pizzaList, setPizzaList] = useState([]);
  const [pizzaEnName, setPizzaEnName] = useState('Classic Cheese Pizza');
  const [pizzaKoName, setPizzaKoName] = useState('클래식 치즈 피자');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [currentTime, setCurrentTime] = useState();

  useEffect(() => {
    fetchPizzaList();
    fetchData();
    handleRefresh();
  }, []);

  useEffect(() => {
    fetchData();
  }, [crew, duration, record, pizzaId]);

  const handleSeconds = (sec: number): string => {
    const Min = Math.floor(sec / 60);
    const Sec = Math.round((sec % 60) * 100) / 100;
    return `${Min}분 ${Sec}초`;
  };

  const fetchPizzaList = (): void => {
    axios.get(PIZZALISTURL).then((response: AxiosResponse): void => {
      setPizzaList(response.data.pizza);
    });
  };

  const handlePizza = (num: number): void => {
    setPizzaId(num);
    const currentPizza = pizzaList[num - 1];
    setPizzaKoName(currentPizza['name_kr']);
    setPizzaEnName(currentPizza['name_en']);
  };

  const handleModal = (boolean: boolean, userId: number) => {
    setModalIsOpen(true);
    setCurrentUser(userId);
    console.log(userId);
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
    fetchData();
  };

  const fetchData = (): void => {
    axios
      .get(
        `${
          crew ? BOARDCREWURL : BOARDSTOREURL
        }?limit=20&time_delta=${duration}&order_by=${record}&pizza_id=${pizzaId}`,
      )
      .then((response: AxiosResponse): void => {
        setData(response.data.ranking);
      });
  };

  const fetchHistory = (): void => {
    axios
      .get(
        `${
          crew ? BOARDCREWURL : BOARDSTOREURL
        }/record/store?limit=10&time_delta=${duration}&order_by=${record}&pizza_id=${pizzaId}}`,
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
    setCrew(boolean);
  };

  const handleRecord = (boolean: boolean): void => {
    if (boolean) {
      setShortest(true);
      setRecord('shortest_time');
    } else {
      setShortest(false);
      setRecord('average_time');
    }
  };

  return (
    <Container>
      <MainHolder>
        <HeaderContainer>
          <HeaderTitleBox>
            <HeaderTitle>Time Ranking</HeaderTitle>
            <Description>
              하나의 피자를 완성하는데 걸리는 시간은 얼마일까요?
            </Description>
            <Description>각각 피자별 시간을 확인해 보아요!</Description>
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
          <PizzaContainer>
            {pizzaList.map((item: PizzaList, index: number) => {
              return (
                <PizzaBox
                  key={item.id}
                  onClick={() => {
                    handlePizza(item.id);
                  }}
                >
                  <PizzaImageBox>
                    <PizzaImage src={item.image}></PizzaImage>
                  </PizzaImageBox>
                  <PizzaEnName>{item.name_en}</PizzaEnName>
                  <PizzaKoName>{item.name_kr}</PizzaKoName>
                </PizzaBox>
              );
            })}
          </PizzaContainer>
          <RecordContainer>
            {
              <RecordBox
                onClick={() => {
                  handleRecord(true);
                }}
                currentRecord={shortest}
              >
                최단시간
              </RecordBox>
            }
            {
              <RecordBox
                currentRecord={!shortest}
                onClick={() => {
                  handleRecord(false);
                }}
              >
                평균시간
              </RecordBox>
            }
          </RecordContainer>

          <PizzaTitleContainer>
            <PizzaEnTitle>{pizzaEnName}</PizzaEnTitle>
            <PizzaKoTitle>{pizzaKoName}</PizzaKoTitle>
          </PizzaTitleContainer>
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
              <TableHeadRow style={{ color: '#4d4d4d' }}>
                <TableHeadHeadingRank>Rank</TableHeadHeadingRank>
                {crew ? (
                  <TableHeadHeadingName>Partictipant</TableHeadHeadingName>
                ) : (
                  <TableHeadHeadingName>Store</TableHeadHeadingName>
                )}
                <TableHeadHeadingTotalScore>
                  {record}
                </TableHeadHeadingTotalScore>
                <TableHeadDetailScore>Seconds</TableHeadDetailScore>
              </TableHeadRow>
            </TableHead>
            <TableBody>
              {data.map((item: CrewInfo | any, index: number) => {
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
                const profilePic = (url: string | null) => {
                  if (url !== null) {
                    return <ProfileImg src={item.image}></ProfileImg>;
                  } else {
                    return <ProfileImg src={PROFILEURL}></ProfileImg>;
                  }
                };
                return (
                  <TableBodyTableRow
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
                    <TotalScore>{handleSeconds(item[record])}</TotalScore>
                    <TotalScore>{item[record]}</TotalScore>
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
}
export default Time;

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

const RecordContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const RecordBox = styled.div<{ currentRecord: boolean }>`
  width: 10%;
  height: 35px;
  border: 2px solid #ff6d00;
  background-color: ${props => (props.currentRecord ? 'white' : '#ff6d00')};
  color: ${props => (props.currentRecord ? '#ff6d00' : 'white')};
  border-radius: 3px;
  line-height: 30px;
  text-align: center;
  opacity: 0.9;
  margin-right: 4px;
  font-weight: 500;
  margin-bottom: 15px;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
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
  :hover {
    cursor: pointer;
  }
`;

const PizzaContainer = styled.div`
  margin-top: 20px;
  height: 250px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  overflow: hidden;
  overflow-x: scroll;
  margin-bottom: 20px;

  ::-webkit-scrollbar {
    width: 6px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #ff6d00;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #00a6cb;
  }
  :hover {
    cursor: pointer;
  }
`;

const PizzaBox = styled.div`
  margin-right: 20px;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
const PizzaImageBox = styled.div`
  width: 164px;
  height: 164px;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 9px;
`;

const PizzaImage = styled.img`
  margin-top: 23%;
  width: 140px;
  height: 90px;
`;
const PizzaEnName = styled.div`
  text-align: center;
  color: #918983;
  font: 1rem 'Bebas Neue', cursive;
  letter-spacing: 0.9px;
  cursor: pointer;
  opacity: 0.7;
`;
const PizzaKoName = styled.div`
  text-align: center;
  font: 0.9rem 'Bebas Neue', cursive;
  color: #918983;
  margin-bottom: 10px;
  opacity: 0.7;
`;

const PizzaTitleContainer = styled.div`
  width: 100%;
  padding-bottom: 15px;
  margin-bottom: 10px;
  color: #00a6cb;
  border-radius: 10px;
`;
const PizzaEnTitle = styled.div`
  font: 1.8rem 'Bebas Neue', cursive;
`;

const PizzaKoTitle = styled.div`
  font: 1rem 'Bebas Neue', cursive;
  letter-spacing: 3px;
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
  width: 20%;
`;

const TableHeadHeadingTotalScore = styled.th`
  text-align: start;
  width: 22%;
`;

const TableHeadDetailScore = styled.th`
  text-align: start;
  width: 13%;
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
  background-color: #dab509;
  text-align: center;
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
  background-color: #a1a1a1;
  color: white;
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
  background-color: #ae7058;
  text-align: center;
  color: white;
  font: 1.1rem 'Bebas Neue', cursive;
`;

const TotalScore = styled.td`
  vertical-align: middle;
  text-align: start;
  font: 1.2rem 'Bebas Neue', cursive;
  letter-spacing: 1px;
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
  :active {
    border: #ff6d00;
    border: 1px solid #ff6d00;
    border-radius: 4px;
  }
`;

const TimeBox = styled.div`
  display: flex;
  width: 100px;
  color: #d4d4d4;
  flex-direction: row;
  justify-content: center;
  line-height: 2rem;
`;
