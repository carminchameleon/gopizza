import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import { PROFILEURL, SYSTEMURL } from 'config';

interface Props {
  currentUser: number;
}

interface CrewInfo {
  id: number;
  name: number;
  image: null | string;
  store_id: number;
  total_score: number;
  total_count: number;
  average_time: number;
  completion_score: number;
  total_score_rank: number;
  total_count_rank: number;
  completion_score_rank: number;
  average_time_rank: number;
  shortest_time_rank: number;
  store_name: string;
}

interface Badge {
  name: string;
  is_rewarded: boolean;
  image: string;
}

const Summary: React.FC<Props> = (props: Props) => {
  const [currentId, setCurrentId] = useState(props.currentUser);
  const [record, setRecord] = useState<any>({});
  const [badge, setBadge] = useState([]);
  const [level, setLevel] = useState(0);

  useEffect((): void => {
    fetchData();
  }, []);

  const fetchData = (): void => {
    axios
      .get(`${SYSTEMURL}/record/user/${currentId}`)
      .then((response: AxiosResponse): void => {
        setRecord(response.data.user_info);
        console.log('Record Data', response.data['user_info']);
      });
    axios
      .get(`${SYSTEMURL}/quest/reward/${currentId}`)
      .then((response: AxiosResponse) => {
        setLevel(response.data.reward.badge_count);
        setBadge(response.data.badge);
      });
  };

  const handleSeconds = (sec: number): string => {
    const Min = Math.floor(sec / 60);
    const Sec = Math.round((sec % 60) * 100) / 100;
    return `${Min}분 ${Sec}초`;
  };

  console.log(props.currentUser);

  const CountBadge = (boolean: boolean): void => {
    if (boolean) {
      setLevel(level + 1);
    }
  };
  return (
    <Container>
      <Circle></Circle>
      <Circle style={{ right: 10 }}></Circle>
      <Circle style={{ bottom: 10 }}></Circle>
      <Circle style={{ right: 10, bottom: 10 }}></Circle>
      <HeaderContainer>
        <Header>Achievement</Header>
        <Content>지금까지의 종합 점수를 공개합니다.</Content>
      </HeaderContainer>
      <BodyContainer>
        <InfoContainer>
          <InfoBox>
            <UserBox>
              <PhotoBox>
                {record.image === null ? (
                  <Photo src={PROFILEURL}></Photo>
                ) : (
                  <Photo src={record.image}></Photo>
                )}
              </PhotoBox>
              <NameBox>
                <CrewName>{record.name}</CrewName>
                <StoreName>{record.store_name}</StoreName>
              </NameBox>
            </UserBox>
            <LevelBox>
              <LevelHeaderBox>
                <LevelHeader>LV.{level}</LevelHeader>
              </LevelHeaderBox>
              <BadgeContainer>
                {badge.map((item: Badge) => {
                  // CountBadge(item.is_rewarded);
                  return (
                    <BadgeBox style={{}}>
                      <BadgeImg
                        src={item.image}
                        style={{ opacity: item.is_rewarded ? 1 : 0.2 }}
                      ></BadgeImg>
                      <BadgeName>{item.name}</BadgeName>
                    </BadgeBox>
                  );
                })}
              </BadgeContainer>
            </LevelBox>
          </InfoBox>
        </InfoContainer>

        <ScoreContainer>
          <ScoreHolder>
            <ScoreBox>
              <ScoreInfo>
                <ScoreTitle>Total</ScoreTitle>
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
                <ScoreTitle>Time</ScoreTitle>
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
                <ScoreTitle>Count</ScoreTitle>
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

export default Summary;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-family: 'Bebas Neue', cursive;
  font-family: 'Bevan', cursive;

  /* letter-spacing: 1.5px; */
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 15%;
  text-align: center;
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
  margin-left: 7.5%;
  text-align: center;
  width: 95%;
  height: 90%;
  background-color: rgba(219, 238, 238, 0.64);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const UserBox = styled.div`
  height: 50%;
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: row;
`;

const PhotoBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto 0;
`;

const Photo = styled.img`
  margin: 0 auto;
  width: 125px;
  height: 125px;
  border-radius: 50%;
`;

const NameBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 25%;
  padding-left: 30px;
`;

const CrewName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 25px;
  text-align: start;
`;
const StoreName = styled.div`
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 300;
  line-height: 19px;
  text-align: start;
  font-weight: bold;
  color: #999999;
`;

const LevelBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
`;

const LevelHeaderBox = styled.div`
  width: 100%;
  height: 20%;
`;
const BadgeContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LevelHeader = styled.div`
  font-size: 1.4rem;
  line-height: 2.4rem;
  font-weight: 900;
  color: rgba(63, 158, 207, 0.7);
`;

const BadgeBox = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BadgeImg = styled.img`
  margin: 0 auto;
  width: 60px;
  height: 60px;
`;

const BadgeName = styled.div`
  margin-top: 0.4rem;
  font-size: 0.8rem;
  line-height: 1rem;
  font-weight: bold;
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
  margin: 0 20px;
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
  /* font-family: Arial, Helvetica, sans-serif; */
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
