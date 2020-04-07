import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const goldMedal: string =
  'https://images.velog.io/images/carminchameleon/post/ae473433-bf70-473c-86a2-7e4d0d119191/image.png';
const silverMedal: string =
  'https://images.velog.io/images/carminchameleon/post/b6ba17e4-7737-4af3-af34-b433dea2884c/image.png';

const bronzeMedal: string =
  'https://images.velog.io/images/carminchameleon/post/fe2c6aa9-a4a8-4a92-9d36-118e83ca26d0/image.png';

const Winner : React.FC = () =>{
return(
  
          <WinnerContainer>
            <WinnerBox>
              <MedalImage alt="#" src={goldMedal}></MedalImage>
              <WinnerInfoBox>
                <WinnerImgBox>
                  <WinnerImg src="http://img.lifestyler.co.kr/NewIMG/frontenm/ch/tvn/2020/20200305_doctorlife_info/images/1_img_01.png"></WinnerImg>
                </WinnerImgBox>
<WinnerName></WinnerName>
                <WinnerStore>평촌직영점</WinnerStore>
              </WinnerInfoBox>
              <WinnerScoreBox>
                <WinnerDetailScore>Completion: 79</WinnerDetailScore>
                <WinnerDetailScore>Time: 13.53</WinnerDetailScore>
                <WinnerDetailScore>Count: 100</WinnerDetailScore>
                <WinnerTotalScore>Total Score:</WinnerTotalScore>
              </WinnerScoreBox>
            </WinnerBox>
             <WinnerBox>
              <MedalImage alt="#" src={goldMedal}></MedalImage>
              <WinnerInfoBox>
                <WinnerImgBox>
                  <WinnerImg src="http://img.lifestyler.co.kr/NewIMG/frontenm/ch/tvn/2020/20200305_doctorlife_info/images/1_img_01.png"></WinnerImg>
                </WinnerImgBox>
                <WinnerName>황은지</WinnerName>
                <WinnerStore>평촌직영점</WinnerStore>
              </WinnerInfoBox>
              <WinnerScoreBox>
                <WinnerDetailScore>Completion: 79</WinnerDetailScore>
                <WinnerDetailScore>Time: 13.53</WinnerDetailScore>
                <WinnerDetailScore>Count: 100</WinnerDetailScore>
                <WinnerTotalScore>Total Score:</WinnerTotalScore>
              </WinnerScoreBox>
            </WinnerBox>
             <WinnerBox>
              <MedalImage alt="#" src={goldMedal}></MedalImage>
              <WinnerInfoBox>
                <WinnerImgBox>
                  <WinnerImg src="http://img.lifestyler.co.kr/NewIMG/frontenm/ch/tvn/2020/20200305_doctorlife_info/images/1_img_01.png"></WinnerImg>
                </WinnerImgBox>
                <WinnerName>황은지</WinnerName>
                <WinnerStore>평촌직영점</WinnerStore>
              </WinnerInfoBox>
              <WinnerScoreBox>
                <WinnerDetailScore>Completion: 79</WinnerDetailScore>
                <WinnerDetailScore>Time: 13.53</WinnerDetailScore>
                <WinnerDetailScore>Count: 100</WinnerDetailScore>
                <WinnerTotalScore>Total Score:</WinnerTotalScore>
              </WinnerScoreBox>
            </WinnerBox>
          </WinnerContainer>)
}

export default Winner;


const WinnerContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const WinnerBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 30%;
  height: 70%;
  border: 3px solid #ad6fd1;
  border-radius: 15px;
  text-align: center;
  position: relative;
  font: 1.2rem 'Bebas Neue', cursive;
  color: #999999;
  background-color: #faf4ff;
`;

const WinnerImgBox = styled.div`
  margin-bottom: 9px;
`;
const WinnerImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1px solid #5e2b7c;
`;
const MedalImage = styled.img`
  position: absolute;
  width: 40px;
  height: 70px;
  object-fit: cover;
  left: 3%;
  top: -1;
`;

const WinnerInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  justify-content: center;
  margin-left: 15%;
`;

const WinnerTotalScore = styled.div`
  font-size: 1.4rem;
  color: #854bc2;
  margin-top: 10px;
`;

const WinnerDetailScore = styled.div`
  margin-bottom: 6px;
  color: #9f71d0;
`;

const WinnerScoreBox = styled.div`
  padding-left: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: start;
  width: 100%;
  height: 100%;
`;
const WinnerName = styled.div`
  color: #333;
  font-size: 1.3rem;
`;
const WinnerStore = styled.div`
  color: gray;
  font-size: 0.7rem;
`;
