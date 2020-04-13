import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from 'react-modal';

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
  const [srcImage, setSrcImage] = useState('http://localhost:3005/markers.png');
  //마커 이미지
  var imageSrc = srcImage, // 마커이미지의 주소입니다
    imageSize = new window.kakao.maps.Size(45, 45), // 마커이미지의 크기입니다
    imageOption = { offset: new window.kakao.maps.Point(0, 0) };
  //호버됬을때, 리스트 클릭시 검정 이미지(마커)
  var overImage = 'http://localhost:3005/marker.png';
  var markerSize = new window.kakao.maps.Size(45, 45),
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
  const [wecode, setWecode] = useState<any>([]);

  const [index, setIndex] = useState<any>(0);

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
        wecode.push(marker);
        //커스텀 오버레이 위치에 set
        marker.setMap(map);
        //마커에 마우스 올라갔을때 마우스오버
        window.kakao.maps.event.addListener(marker, 'mouseover', () =>
          setMarker(marker, overImage),
        );
        // 마커 클릭했을때 실행함수
        window.kakao.maps.event.addListener(marker, 'click', () => {
          var moveLocation = new window.kakao.maps.LatLng(
            mapData[i].latitude,
            mapData[i].longitude,
          );
          map.panTo(moveLocation);
          setCurrentStoreId(datas[i].id);
          console.log(datas[i]);
        });
        //마우스 아웃됬을때 실행 함수
        window.kakao.maps.event.addListener(marker, 'mouseout', () =>
          setMarker(marker, imageSrc),
        );
      }
    } else {
      console.log(map);
      mapContainer = document.getElementById('map');
      mapOption = {
        center: new window.kakao.maps.LatLng(37.54894, 126.92448), // 지도의 중심좌표
        level: 10,
      };

      setMap(new window.kakao.maps.Map(mapContainer, mapOption)); // 지도를 생성
    }
  }, [map, currentStoreId, srcImage]);

  useEffect(() => {
    setFilteredSearch(
      mapData.filter((data: any) => data.name.includes(search)),
    );
  }, [search, mapData]);

  //onClick 실행함수
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
    console.log('wecode[num]:', wecode[num]);
    setMarker(wecode[num], overImage);
    setIndex(num);
    index !== num && setMarker(wecode[index], srcImage);

    // myRef.current.scrollTop=100
  };
  const handleHover = (num: any) => {
    setMarker(wecode[num], overImage);
    setIndex(num);
    index !== num && setMarker(wecode[index], srcImage);
  };

  return (
    <Rootdiv>
      <Mapdiv id="map" style={{ width: '85%', height: '100vh' }} />
      <DivonMap>
        <Inputform>
          <InputSearch
            type="text"
            placeholder="Find a store"
            onChange={e => setSearch(e.target.value)}
          />
          <Searchimg src="http://localhost:3001/searchicon.png"></Searchimg>
        </Inputform>

        {filteredSearch.map((item: any, index: number) => {
          return (
            <PropertiesDiv
              key={index}
              onClick={() => handleConsole(index)}
              isClicked={currentStoreId === index + 1 ? true : false}
              onMouseOver={() => handleHover(index)}
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
              backgroundColor: 'rgba(0, 0, 0, 0)',
            },
            content: {
              border: 'none',
              backgroundColor: 'white',
              borderRadius: '8px',
              position: 'relative',
              marginLeft: '-40px',
              marginTop: '25px',
              width: '35%',
              height: '100vh',
              fontSize: '18px',
            },
          }}
        >
          <Rootmodaldiv>
            <DivisionModal>
              <DivisionModalImg src="https://images.velog.io/images/carminchameleon/post/40a22b06-3651-43e3-9915-a1e5fde3c773/image.png"></DivisionModalImg>
              <DivisionModal1>
                <DivisionModal2>선릉점</DivisionModal2>
                <DivisionModal3>서울 강남구 삼성로301</DivisionModal3>
              </DivisionModal1>
            </DivisionModal>
            <StoreScore>
              <StoreScore1>Store Score</StoreScore1>
              <StoreScore2>Ranking</StoreScore2>
            </StoreScore>
            <CompletionScore>
              <Completion>Completion Score</Completion>
              <Completionnull></Completionnull>
              <Completion1>2256/10000점</Completion1>
              <Completion2>13등</Completion2>
            </CompletionScore>
            <CompletionScore>
              <Completion>TimeScore</Completion>
              <Completionnull></Completionnull>
              <Completion1>3:36:12</Completion1>
              <Completion2>123등</Completion2>
            </CompletionScore>
            <CompletionScore>
              <Completion>Count Score</Completion>
              <Completionnull></Completionnull>
              <Completion1>2256판</Completion1>
              <Completion2>132등</Completion2>
            </CompletionScore>
            <TotalScore>
              <Total>Total Score</Total>
              <Totalnull></Totalnull>
              <Total1>1356/10000</Total1>
              <Total2>13등</Total2>
            </TotalScore>
            <CrewList>
              <CrewList1>Crew List</CrewList1>
              <CrewList2></CrewList2>
            </CrewList>
            <Crew>
              <Crewimg src="https://user-images.githubusercontent.com/53142539/78742653-9a103f00-7997-11ea-98a2-7b092c8a9ef5.jpg"></Crewimg>
              <Crewdiv>현준</Crewdiv>
              <Badge1 src="https://images.velog.io/images/carminchameleon/post/a398acc2-4bca-405d-9b80-909bdcf9df7a/image.png"></Badge1>
              <Badge2 src="https://images.velog.io/images/carminchameleon/post/4734a4ee-5378-4737-baa1-370b9bc609e8/image.png"></Badge2>
            </Crew>
            <Crew>
              <Crewimg src="https://user-images.githubusercontent.com/53142539/78743465-aa291e00-7999-11ea-8b97-d360d7f7c90b.jpg"></Crewimg>
              <Crewdiv>수연</Crewdiv>
              <Badge src="https://images.velog.io/images/carminchameleon/post/36dd1f34-d763-46ab-ad89-d29f63fc52a2/image%20(2).png"></Badge>
              <Badge1 src="https://images.velog.io/images/carminchameleon/post/a398acc2-4bca-405d-9b80-909bdcf9df7a/image.png"></Badge1>
              <Badge2 src="https://images.velog.io/images/carminchameleon/post/4734a4ee-5378-4737-baa1-370b9bc609e8/image.png"></Badge2>
            </Crew>
            <Crew>
              <Crewimg src="https://images.velog.io/images/carminchameleon/post/346964e5-b676-4e1e-9e34-6f54b5e3af34/image.png"></Crewimg>
              <Crewdiv>현준</Crewdiv>
              <Badge src="https://images.velog.io/images/carminchameleon/post/36dd1f34-d763-46ab-ad89-d29f63fc52a2/image%20(2).png"></Badge>
              <Badge2 src="https://images.velog.io/images/carminchameleon/post/4734a4ee-5378-4737-baa1-370b9bc609e8/image.png"></Badge2>
            </Crew>
            <Crew>
              <Crewimg src="https://ca.slack-edge.com/TH0U6FBTN-UR8L27L9F-750194234eb1-512"></Crewimg>
              <Crewdiv>은지</Crewdiv>
              <Badge src="https://images.velog.io/images/carminchameleon/post/36dd1f34-d763-46ab-ad89-d29f63fc52a2/image%20(2).png"></Badge>
              <Badge1 src="https://images.velog.io/images/carminchameleon/post/a398acc2-4bca-405d-9b80-909bdcf9df7a/image.png"></Badge1>
              <Badge2 src="https://images.velog.io/images/carminchameleon/post/4734a4ee-5378-4737-baa1-370b9bc609e8/image.png"></Badge2>
            </Crew>
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
  border-bottom: 4px solid orange;
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
  border-bottom: 4px solid orange;
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
  margin-top: 3px;
  margin-left: 20%;
  z-index: 0;
`;
const DivonMap = styled.div`
  z-index: 0;
  top: 65px;
  background-color: white;
  position: absolute;
  width: 35%;
  height: 100vh;
  overflow: scroll;
`;

const Inputform = styled.form`
  margin-left: 30px;
  width: 350px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
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
  font-size: 20px;
  font-weight: bold;
  margin-left: 30px;
  margin-bottom: 5px;
`;
const Prodiv1 = styled.div`
  font-size: 15px;
  margin-left: 30px;
  margin-bottom: 10px;
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

{
  /* <Rootmodaldiv>
  <Modaldiv>{modalinfo.name}</Modaldiv>
  <Borderline></Borderline>
  <Modaldiv2>{modalinfo.address}</Modaldiv2>
  <Modaldiv3>위도:{modalinfo.latitude}</Modaldiv3>
  <Modaldiv4>경도:{modalinfo.longitude}</Modaldiv4>
  <Modaldiv5>HOURS</Modaldiv5>
  <Borderline2></Borderline2>
  <Modaldiv6>Schedule not available</Modaldiv6>
  <Modaldiv7>AMENITIES</Modaldiv7>
  <Borderline2></Borderline2>
  <Modaldiv8>Schedule not available</Modaldiv8>
</Rootmodaldiv> */
}
