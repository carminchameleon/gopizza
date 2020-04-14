import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';
import { PROFILEURL } from 'config';

import './Kakaomap.css';
Modal.setAppElement('#root'); //안써주면 업데이트 해달라고 오류가 뜬다.

declare global {
  interface Window {
    kakao: any;
  }
}

interface KaKaoMapProps {
  datas: any;
}

interface Props {
  isClicked: any;
}

const Kakaomap = (props: KaKaoMapProps) => {
  const { datas } = props; //props 지정
  const [mapData, setMapdata] = useState<any>([]); //부모에서 받아온 정보를 mapData에 저장하기위한 저장소
  const [search, setSearch] = useState<string>(''); //검색창에 검색시 e.target.value 값을 저장하는 저장소
  //검색한것만 리스트에 보여주기 위한 저장소(ex. 아무것도 검색안하면 mapData정보가 전부보여지고, search값이 입력되면 mapData정보중 search값이 포함된것만 보여주는 저장소)
  const [filteredSearch, setFilteredSearch] = useState<any>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); //모달
  //맵선언(useEffect에 넣으면 scope의 문제가 생겨, 변수 선언먼저 해주었다.)
  let mapContainer;
  let mapOption;
  const [map, setMap] = useState<any>(null); //맵 생성객체
  const [currentStoreId, setCurrentStoreId] = useState<number>(0); // marker클릭시 클릭한 마커의 id값.
  const [modalinfo, setModalInfo] = useState<any>([]); //검색 리스트에서 클릭시 맵에서 받아온 정보를 모달에 쏴주기위해서 modalinfo에 저장해주는 useState
  //원본 빨간 이미지(마커)
  const [srcImage, setSrcImage] = useState(
    'http://localhost:3000/basicmarker.png',
  );
  //마커 이미지
  var imageSrc = srcImage, // 마커이미지의 주소입니다
    imageSize = new window.kakao.maps.Size(24, 24), // 마커이미지의 크기입니다
    imageOption = { offset: new window.kakao.maps.Point(0, 0) };
  //호버됬을때, 리스트 클릭시 검정 이미지(마커)
  var overImage = 'http://localhost:3000/changemarker.png';
  var markerSize = new window.kakao.maps.Size(24, 24),
    markerOffset = new window.kakao.maps.Point(0, 0);

  //마커 함수
  const setMarker = (marker: any, img: any) => {
    marker.setImage(
      new window.kakao.maps.MarkerImage(
        img, //이미지 URL
        markerSize, //마커의 크기
        {
          offset: markerOffset, //마커 이미지에서의 기준 좌표
        },
      ),
    );
  };

  // 리스트 클릭시 마커의 이미지 변환을 위한 저장소
  const [markerInfo, setMarkerInfo] = useState<any>([]);
  //리스트 클릭시 리스트의 id값
  const [listInfo, setListInfo] = useState<any>(0);

  useEffect(() => {
    setMapdata(datas);
    if (map) {
      for (let i = 0; i < datas.length; i++) {
        let markerPosition = new window.kakao.maps.LatLng(
          datas[i].latitude,
          datas[i].longitude,
        );

        //마커 이미지는 마커이지, 사이즈,옵션
        var markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption,
        );
        //마커 생성
        let marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
          map: map,
        });
        //위코드라는 변수에 marker정보 푸쉬로 넣어줌.
        markerInfo.push(marker);
        //커스텀 오버레이 위치에 set
        marker.setMap(map);

        //마커에 마우스 올라갔을때 [마우스오버]
        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          setCurrentStoreId(datas[i].id);
          // setMarker(marker, overImage);
          //마우스 오버시 스크롤창이 그 마커에 맞는 곳으로 이동
          if (datas[i].id < 10) {
            return (myRef.current.scrollTop = 10);
          } else if (datas[i].id < 20) {
            return (myRef.current.scrollTop = 500);
          } else if (datas[i].id < 30) {
            return (myRef.current.scrollTop = 900);
          } else if (datas[i].id < 40) {
            return (myRef.current.scrollTop = 1300);
          } else if (datas[i].id < 50) {
            return (myRef.current.scrollTop = 1500);
          }
        });

        // 마커 [클릭]했을때 실행함수
        window.kakao.maps.event.addListener(marker, 'click', () => {
          var moveLocation = new window.kakao.maps.LatLng(
            mapData[i].latitude,
            mapData[i].longitude,
          );
          map.panTo(moveLocation);
          setMarker(marker, overImage);

          setCurrentStoreId(datas[i].id);
          console.log('datas:', datas[i]);
          //마우스 오버시 스크롤창이 그 마커에 맞는 곳으로 이동
          if (datas[i].id < 10) {
            return (myRef.current.scrollTop = 10);
          } else if (datas[i].id < 20) {
            return (myRef.current.scrollTop = 500);
          } else if (datas[i].id < 30) {
            return (myRef.current.scrollTop = 900);
          } else if (datas[i].id < 40) {
            return (myRef.current.scrollTop = 1000);
          } else if (datas[i].id < 50) {
            return (myRef.current.scrollTop = 1500);
          }

          // myRef.current.scrollTop = 500;
          // 0 중간 800 마지막 1500
        });

        //마우스 [아웃]됬을때 실행 함수
        // window.kakao.maps.event.addListener(marker, 'mouseout', () =>
        //   setMarker(marker, overImage),
        // );
      }
    } else {
      console.log(mapData);
      mapContainer = document.getElementById('map');
      mapOption = {
        center: new window.kakao.maps.LatLng(37.54894, 126.92448), // 지도의 중심좌표
        level: 8,
      };

      setMap(new window.kakao.maps.Map(mapContainer, mapOption)); // 지도를 생성
    }
  }, [map, currentStoreId, srcImage]);

  useEffect(() => {
    setFilteredSearch(
      mapData.filter((data: any) => data.name.includes(search)),
    );
  }, [search, mapData]);

  //onClick 실행함수 /////
  const handleConsole = (num: any) => {
    //모달 켜지고, 모달에 정보..들어감
    setModalIsOpen(true);
    setModalInfo(mapData[num]);
    //리스트 입력시 지도이동
    var moveLocation = new window.kakao.maps.LatLng(
      mapData[num].latitude,
      mapData[num].longitude,
    );
    map.panTo(moveLocation);
    console.log('markerInfo[num]:', markerInfo[num]);
    setMarker(markerInfo[num], overImage);
    setListInfo(num);
    listInfo !== num && setMarker(markerInfo[listInfo], srcImage);
    //리스트 클릭시 id값을 인식해서 querysend에 저장
    setQuerySend(num + 1);
    // myRef.current.scrollTop=100
  };
  //mouseover 실행 함수(hover)
  const handleHover = (num: any) => {
    setMarker(markerInfo[num], overImage);
    setListInfo(num);
    listInfo !== num && setMarker(markerInfo[listInfo], srcImage);
  };

  /**********************axios를 이용해서 모달창에 DB USER정보 및 스토어 점수**************************************/
  //모달에 띄어줄 정보를 받아올 저장소(user)
  const [querySave, setQuerySave] = useState<any>([]);
  //쿼리스트링에 보내줄 ID값을 저장할 저장소
  const [querySend, setQuerySend] = useState<number>(0);

  //모달에 띄어줄 정보를 받아올 저장소(store)
  const [queryStore, setQueryStore] = useState<any>([]);

  //axios(크루에 대한정보(크루 이름,사진))
  useEffect(() => {
    axios
      .get(`http://13.125.25.132:8000/store/detail/${querySend}`)
      .then(res => {
        setQuerySave(res.data.crew_list);
      })
      .catch(err => {
        console.log(err);
      });
  }, [querySend]);
  //axios(스토어에 대한 정보(스토어랭킹,타임랭킹등등..))
  useEffect(() => {
    axios
      .get(`http://13.125.25.132:8000/record/store/${querySend}`)
      .then(res => {
        setQueryStore(res.data.store_info);
      })
      .catch(err => {
        console.log(err);
      });
  }, [querySend]);
  // 시간 분초로 변환
  const handleSeconds = (sec: number): string => {
    const Min = Math.floor(sec / 60);
    const Sec = Math.round((sec % 60) * 100) / 100;
    return `${Min}분 ${Sec}초`;
  };
  /******************리스트 부분 ref scrollto이용하는곳*****************/

  const myRef = useRef<any>(null);
  // myRef.current.scrollTop=10
  // ref={myRef}

  console.log('querystore:', querySave);
  console.log('send', querySend);

  // window.addEventListener('scroll', handleScroll);

  // const handleScroll = (e: any) => {
  //   const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
  //   console.log(scrollTop);
  // };

  const EventScroll = () => {
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
    });
  };

  const handleScroll = () => {
    console.log('what');
  };

  /*******************RETURN HERE!***********************************************************************/
  return (
    <Rootdiv>
      <Mapdiv id="map" style={{ width: '85%', height: '100vh' }} />
      <DivonMap ref={myRef}>
        <Inputform>
          <InputSearch
            type="text"
            placeholder=""
            onChange={e => setSearch(e.target.value)}
          />
          <Searchimg src="http://localhost:3000/searchicon.png"></Searchimg>
        </Inputform>

        {filteredSearch.map((item: any, index: number) => {
          return (
            <PropertiesDiv
              key={index}
              onClick={() => handleConsole(item.id - 1)}
              isClicked={currentStoreId === index + 1 ? true : false}
              onMouseOver={() => handleHover(item.id - 1)}
            >
              <Prodiv>{item.name}</Prodiv>
              <Prodiv1>{item.address}</Prodiv1>
            </PropertiesDiv>
          );
        })}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              zIndex: 3000,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '15px',
            },
            content: {
              border: 'none',
              backgroundColor: 'white',
              borderRadius: '8px',
              position: 'relative',
              marginLeft: '30%',
              marginTop: '25px',
              width: '35%',
              height: '85vh',
              fontSize: '18px',
              overflowX: 'scroll',
            },
          }}
        >
          <Rootmodaldiv>
            <DivisionModal>
              <DivisionModalImg src="https://images.velog.io/images/carminchameleon/post/40a22b06-3651-43e3-9915-a1e5fde3c773/image.png"></DivisionModalImg>
              <DivisionModal1>
                <DivisionModal2>{modalinfo.name}</DivisionModal2>
                <DivisionModal3>{modalinfo.address}</DivisionModal3>
              </DivisionModal1>
            </DivisionModal>
            <StoreScore>
              <StoreScore1>Store Score</StoreScore1>
              <StoreScore2>Ranking</StoreScore2>
            </StoreScore>
            <CompletionScore>
              <Completion>Completion Score</Completion>
              <Completionnull></Completionnull>
              <Completion1>
                {Math.floor(queryStore.completion_score)}점
              </Completion1>
              <Completion2>{queryStore.completion_score_rank}등</Completion2>
            </CompletionScore>
            <CompletionScore>
              <Completion>TimeScore</Completion>
              <Completionnull></Completionnull>
              <Completion1>
                {handleSeconds(queryStore.average_time)}
              </Completion1>
              <Completion2>{queryStore.average_time_rank}등</Completion2>
            </CompletionScore>
            <CompletionScore>
              <Completion>Count Score</Completion>
              <Completionnull></Completionnull>
              <Completion1>{queryStore.total_count}판</Completion1>
              <Completion2>{queryStore.total_count_rank}등</Completion2>
            </CompletionScore>
            <TotalScore>
              <Total>Total Score</Total>
              <Totalnull></Totalnull>
              <Total1>{Math.floor(queryStore.total_score)}</Total1>
              <Total2>{queryStore.total_score_rank}등</Total2>
            </TotalScore>
            <CrewList>
              <CrewList1>Crew List</CrewList1>
              <CrewList2></CrewList2>
            </CrewList>
            {querySave.map((item: any, index: number) => {
              //user사진없으면 기본이미지를 보여줄 저장소
              const profilePic = (url: string | null) => {
                if (url !== null) {
                  return <Crewimg src={item.image}></Crewimg>;
                } else {
                  return <Crewimg src={PROFILEURL}></Crewimg>;
                }
              };
              return (
                <Crew key={index}>
                  {profilePic(item.image)}
                  <Crewdiv>{item.name}</Crewdiv>
                  {item.badge.map((item: any, index: number) => {
                    return <Badge1 src={item}></Badge1>;
                  })}
                </Crew>
              );
            })}
          </Rootmodaldiv>
        </Modal>
      </DivonMap>
    </Rootdiv>
  );
};

export default Kakaomap;

const Crew = styled.div`
  margin-top: 10px;
  display: flex;
`;
const Crewimg = styled.img`
  margin-right: 10px;
  width: 60px;
`;
const Crewdiv = styled.div`
  margin-top: 20px;
  margin-right: 20px;
`;
const Badge = styled.img`
  margin-right: 20px;
  width: 60px;
`;
const Badge1 = styled.img`
  margin-right: 20px;
  width: 60px;
`;
const Badge2 = styled.img`
  width: 60px;
`;

const DivisionModal = styled.div`
  display: flex;
`;
const DivisionModalImg = styled.img`
  width: 80px;
`;
const DivisionModal1 = styled.div`
  margin-top: 20px;
  margin-left: 20px;
`;
const DivisionModal2 = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
const DivisionModal3 = styled.div``;

const StoreScore = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 4px solid green;
  margin-top: 30px;
`;

const StoreScore1 = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const StoreScore2 = styled.div`
  font-weight: bold;
`;

const CompletionScore = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;
const Completion = styled.div`
  font-weight: bold;
`;
const Completionnull = styled.div``;
const Completion1 = styled.div``;
const Completion2 = styled.div``;

const TotalScore = styled.div`
  margin-top: 30px;
  border-top: 2px solid grey;
  display: flex;
  justify-content: space-between;
`;
const Total = styled.div`
  margin-top: 20px;
`;
const Totalnull = styled.div`
  margin-top: 20px;
`;
const Total1 = styled.div`
  font-weight: bold;
  margin-top: 20px;
`;
const Total2 = styled.div`
  margin-top: 20px;
`;
const CrewList = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 4px solid green;
  margin-top: 30px;
`;
const CrewList1 = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;
const CrewList2 = styled.div``;

const Rootdiv = styled.div`
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  /* 오버레이(마커) 사이즈 */
  .bouncing-loader {
    width: 20px;
  }
  .modal {
    z-index: 999;
  }
`;
const Mapdiv = styled.div`
  border-top: 1px solid grey;
  margin-top: -100px;
  margin-left: 20%;
  z-index: 0;
`;
const DivonMap = styled.div`
  margin-top: 195px;
  border: 3px solid #e8e8e8;
  z-index: 0;
  top: 68px;
  background-color: white;
  position: absolute;
  width: 35%;
  height: 100vh;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 6px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #34883d;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #00a6cb;
  }
  :hover {
    cursor: pointer;
  }
`;

const Inputform = styled.form`
  margin-left: 30px;
  width: 70%;
  border-bottom: 2px solid green;
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;
const InputSearch = styled.input`
  margin-bottom: 0px;
  font-weight: 100px;
  font-size: 18px;
  width: 70%;
  height: 50px;
  border: none;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.12); */
  :focus {
    outline: none;
  }
`;
const Searchimg = styled.img`
  margin-top: 15px;
  width: 25px;
`;

const PropertiesDiv = styled.div`
  margin-bottom: 15px;
  :hover {
    cursor: pointer;
    background-color: #e8e8e8;
  }
  background-color: ${(props: Props) => (props.isClicked ? '#e8e8e8' : null)};
`;
const Prodiv = styled.div`
  color: green;
  font-size: 20px;
  font-weight: bold;
  margin-left: 30px;
  margin-bottom: 10px;
`;
const Prodiv1 = styled.div`
  color: grey;
  font-size: 15px;
  margin-left: 30px;
  margin-bottom: 15px;
`;

//모달
const Rootmodaldiv = styled.div`
  margin-top: 30px;
`;
const Modaldiv = styled.div`
  color: black;
  font-size: 18px;
  font-weight: bold;
`;
const Modaldiv2 = styled.div`
  color: black;
  font-size: 12px;
`;
const Modaldiv3 = styled.div`
  color: black;
  font-size: 12px;
`;
const Modaldiv4 = styled.div`
  color: black;
  font-size: 12px;
`;
const Modaldiv5 = styled.div`
  margin-top: 20px;
  color: grey;
  font-weight: bold;
`;
const Modaldiv6 = styled.div``;
const Modaldiv7 = styled.div`
  margin-top: 30px;
  color: grey;
  font-weight: bold;
`;
const Modaldiv8 = styled.div``;

const Borderline = styled.div`
  border-bottom: 3px solid #c1c1c1;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Borderline2 = styled.div`
  margin-top: 5px;
  border-bottom: 1px solid #c1c1c1;
`;
