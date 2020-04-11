import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { PROFILEURL, SYSTEMURL } from 'config';

interface Props {
  currentUser: number;
}

// interface StoreInfo {
//   id: number;
//   name: '광주금남로점';
//   total_score: 610.4708613846892;
//   total_count: 51;
//   shortest_time: 200.94;
//   average_time: 266.26960784313724;
//   completion_score: 285.4706;
//   average_quality: 72.9804;
//   average_sauce: 69.1569;
//   average_cheese: 73.7843;
//   average_topping: 69.549;
//   completion_standard: 5.712141491291511;
//   time_standard: 8.918749763997624;
//   count_standard: 2.8650646950092424;
//   total_score_rank: 41;
//   total_count_rank: 20;
//   completion_score_rank: 39;
//   average_time_rank: 43;
//   shortest_time_rank: 28;
// }

const StoreSummary: React.FC<Props> = (props: Props) => {
  const [currentId, setCurrentId] = useState(props.currentUser);
  const [record, setRecord] = useState<any>({});

  useEffect((): void => {
    fetchData();
  }, []);

  const fetchData = (): void => {
    axios
      .get(`${SYSTEMURL}/record/store/${currentId}`)
      .then((response: AxiosResponse): void => {
        setRecord(response.data.store_info);
      });
  };

  const handleSeconds = (sec: number): string => {
    const Min = Math.floor(sec / 60);
    const Sec = Math.round((sec % 60) * 100) / 100;
    return `${Min}분 ${Sec}초`;
  };

  return (
    <Container>
      <Circle></Circle>
      <Circle style={{ right: 10 }}></Circle>
      <Circle style={{ bottom: 10 }}></Circle>
      <Circle style={{ right: 10, bottom: 10 }}></Circle>
      <HeaderContainer>
        <Header>Achievement</Header>
        <Content>전체 기간에 대한 종합 점수를 공개합니다.</Content>
      </HeaderContainer>
      <BodyContainer>
        <InfoContainer>
          <InfoBox>
            <UserBox>
              <StoreBox>
                <StoreImg src="https://images.velog.io/images/carminchameleon/post/40a22b06-3651-43e3-9915-a1e5fde3c773/image.png"></StoreImg>
                <StoreNameBox>
                  <CrewName>{record.name}</CrewName>
                </StoreNameBox>
              </StoreBox>
            </UserBox>
          </InfoBox>
        </InfoContainer>

        <ScoreContainer>
          <ScoreHolder>
            <ScoreBox>
              <ScoreInfo>
                <ScoreTitle>Total Ranking</ScoreTitle>
                <ScoreNumber>
                  {Math.floor(record.total_score)} / 10000점
                </ScoreNumber>
              </ScoreInfo>
              <RankBox>
                <Rank>
                  <RankNumber>{record.total_score_rank}등</RankNumber>
                </Rank>
              </RankBox>
            </ScoreBox>
            <ScoreBox>
              <ScoreInfo>
                <ScoreTitle>Completion </ScoreTitle>
                <ScoreNumber>
                  {Math.floor(record.completion_score)} / 400점
                </ScoreNumber>
              </ScoreInfo>
              <RankBox>
                <Rank>
                  <RankNumber>{record.completion_score_rank}등</RankNumber>
                </Rank>
              </RankBox>
            </ScoreBox>
            <ScoreBox>
              <ScoreInfo>
                <ScoreTitle>Time Score</ScoreTitle>
                <ScoreNumber>{handleSeconds(record.average_time)}</ScoreNumber>
              </ScoreInfo>
              <RankBox>
                <Rank>
                  <RankNumber>{record.average_time_rank}등</RankNumber>
                </Rank>
              </RankBox>
            </ScoreBox>
            <ScoreBox>
              <ScoreInfo>
                <ScoreTitle>Count Ranking</ScoreTitle>
                <ScoreNumber>{record.total_count}판</ScoreNumber>
              </ScoreInfo>
              <RankBox>
                <Rank>
                  <RankNumber>{record.total_count_rank}등</RankNumber>
                </Rank>
              </RankBox>
            </ScoreBox>
          </ScoreHolder>
        </ScoreContainer>
      </BodyContainer>
    </Container>
  );
};

export default StoreSummary;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-family: 'Bebas Neue', cursive;
  font-family: 'Bevan', cursive;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 15%;
`;

const Header = styled.div`
  font-size: 2.3rem;
  text-align: center;
  line-height: 3rem;
  color: #ff5c00;
`;

const Content = styled.div`
  font-size: 0.9rem;
  text-align: center;
  line-height: 2rem;
  color: rgb(63, 158, 207, 0.7);
  font-weight: bold;
`;
const BodyContainer = styled.div`
  height: 85%;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const InfoContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

const InfoBox = styled.div`
  text-align: center;
  width: 95%;
  height: 90%;
  background-color: rgba(219, 238, 238, 0.64);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 20px;
`;

const UserBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
`;

const ScoreContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const ScoreBox = styled.div`
  height: 20%;
  margin: 0 10px;
  padding: 5px 0;
  background-color: rgba(202, 231, 232, 0.65);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
`;
const ScoreInfo = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  text-align: start;
`;

const ScoreTitle = styled.div`
  width: 100%;
  height: 40%;
  font-size: 1rem;
  line-height: 2.2rem;
`;
const ScoreNumber = styled.div`
  width: 100%;
  height: 40%;
  font-size: 1rem;
  line-height: 2.2rem;
  color: #3ecacb;
  font-weight: 800;
`;

const RankBox = styled.div`
  width: 30%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ScoreHolder = styled.div`
  margin-left: 2.5%;
  text-align: center;
  width: 95%;
  height: 90%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Rank = styled.div`
  margin: 0 auto;
  width: 60px;
  height: 60px;
  border: 2px solid #ed1941;
  border-radius: 50%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RankNumber = styled.div`
  font-size: 17px;
  color: #ed1941;
  font-weight: 900;
`;

const Circle = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  padding: 0;
  margin: 0;
  border-radius: 50%;
  background-color: #ff5c00;
`;

const StoreImg = styled.img`
  width: 140px;
  height: 140px;
  margin: 0 auto;
  position: absolute;
  left: 26%;
  top: 23%;
`;

const StoreBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CrewName = styled.div`
  margin-top: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 25px;
  text-align: center;
`;

const StoreNameBox = styled.div`
  position: absolute;
  top: 60%;
  width: 100%;
  height: 10%;
`;
