import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../../shared/Header';
import Kakaomap from './Kakaomap';

const Map = () => {
  //axios로 받아온 정보를 datas안에 저장하고, Kakaomap <props>으로 전달할 useState
  const [datas, setDatas] = useState<any>([]);

  useEffect(() => {
    axios
      .get('http://13.125.25.132:8000/store')
      .then(res => {
        setDatas(res.data.store_list);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  //axios는 비동기함수이다. 삼항연산자를 넣어주지않으면 처음에 props에 null값이 전달되므로 삼항연산자를 넣어주어서 props에 값이 들어간상태로 전달할수있게 한다!
  //삼항연산자 확실하게
  return (
    <Mapdiv>
      <Header />
      {datas.length > 0 ? <Kakaomap datas={datas} /> : ''}
    </Mapdiv>
  );
};

const Mapdiv = styled.div`
  overflow: hidden;
`;

export default Map;
