import React, { useState, useEffect } from 'react';
import Header from 'shared/Header';
import Banner from 'shared/Banner';
import PagiNation from './PagiNation';
import ReactModal from 'react-modal';
import { Search } from '@styled-icons/boxicons-regular/Search';
import { URL } from 'config';
import styled from 'styled-components';

interface ApprovalList {
  user__id: number;
  user__name: string;
  user__store__name: string;
  quest__id: number;
  quest__name: string;
  updated_at: number | any;
  is_rewarded: boolean;
}

const Reward = () => {
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<string>('');
  const [filterSearch, setFilterSearch] = useState<any>([]);
  const [select, setSelect] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1); //pagination
  const [PostsPerPage] = useState(5); //한페이지에 보이는 포스트 갯수
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  // Get current posts
  const indexOfLastPosts = currentPage * PostsPerPage;
  const indexOfFirstPost = indexOfLastPosts - PostsPerPage;
  const currentPosts = filterSearch.slice(indexOfFirstPost, indexOfLastPosts);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //Data 저장
  const token = window.sessionStorage.getItem('token');
  useEffect(() => {
    if (token) {
      fetch(`${URL}/quest/reward-approval`, {
        method: 'GET',
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(res => {
          // console.log(res.approval_list[0].is_rewarded);
          setData(res.approval_list);
        });
    }
  }, []);
  // useEffect(() => {
  //   console.log(data);
  // });

  const handleChange = (e: any) => {
    setSelect(e.target.value);
  };

  //select box에 따른 결과 값
  useEffect(() => {
    //default 값 user_name
    setFilterSearch(
      data.filter((item: ApprovalList) => item.user__name.includes(search)),
    );
    if (select === 'user__name') {
      setFilterSearch(
        data.filter((item: ApprovalList) => item.user__name.includes(search)),
      );
    }
    if (select === 'user__store__name') {
      setFilterSearch(
        data.filter((item: ApprovalList) =>
          item.user__store__name.includes(search),
        ),
      );
    }
    if (select === 'quest__name') {
      setFilterSearch(
        data.filter((item: ApprovalList) => item.quest__name.includes(search)),
      );
    }
  }, [search, data]);

  const isClickedBtn = (user__id: number, quest__id: number) => {
    // console.log(user, quest);
    if (token) {
      fetch(
        `${URL}/quest/reward-approval/user/${user__id}/quest/${quest__id}`,
        {
          method: 'POST',
          headers: { Authorization: token },
        },
      ).then(res => {
        // console.log(res);
        if (res.status === 200) {
          alert('리워드가 이메일로 지급되었습니다.');
          window.location.reload();
        } else {
          alert('다시 클릭해주세요');
        }
      });
    }
  };

  return (
    <Wrapper>
      <Header />
      <Banner
        title="My Page"
        menu1="직원 관리"
        menu2="리워드 관리"
        background="#fcb131"
        navBackground="#f69d04"
        routes1="/admin_page"
        routes2="/reward"
      />
      <InnerWarapper>
        <HeaderTitleContainer>
          <HeaderTitle>Reward Page</HeaderTitle>
          <Description>리워드를 발급 할 수 있는 페이지 입니다.</Description>
        </HeaderTitleContainer>
        <SelectContainer>
          <DropdownBox>
            <Dropdown>
              <DurationOptions onChange={handleChange}>
                <Duration value="user__name">이름</Duration>
                <Duration value="user__store__name">매장</Duration>
                <Duration value="quest__name">퀘스트</Duration>
              </DurationOptions>
            </Dropdown>
          </DropdownBox>
          <SearchBox>
            <SearchInput
              type="text"
              onChange={e => setSearch(e.target.value)}
            ></SearchInput>
            <SearchIcon />
          </SearchBox>
        </SelectContainer>
        <TableContainer>
          <TableHead>
            <TableHeadName>Name</TableHeadName>
            <TableHeadStore>Store</TableHeadStore>
            <TableHeadQuest>Quest</TableHeadQuest>
            <TableHeadTime>Update Time</TableHeadTime>
            <TableHeadReward>Reward</TableHeadReward>
          </TableHead>
          {currentPosts.map((item: ApprovalList, index: number) => {
            return (
              <TableBody key={index}>
                <TableBodyName>{item.user__name}</TableBodyName>
                <TableBodyStore>{item.user__store__name}</TableBodyStore>
                <TableBodyQuest>{item.quest__name}</TableBodyQuest>
                <TableBodyTime>
                  {[item.updated_at][0].slice(0, 16)}
                </TableBodyTime>
                <TableBodyReward>
                  {item.is_rewarded ? (
                    '발급완료'
                  ) : (
                    <RewardBtn onClick={() => setModalIsOpen(true)}>
                      발급하기
                    </RewardBtn>
                  )}
                  <ReactModal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    style={{
                      overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      },
                      content: {
                        border: 'none',
                        backgroundColor: 'white',
                        overflow: 'hidden',
                        fontSize: '100px',
                        position: 'absolute',
                        width: '400px',
                        height: '150px',
                        margin: '400px 0 0 -150px',
                        left: '50%',
                        // fontFamily: 'nationale-regular',
                      },
                    }}
                  >
                    <ModalContent>
                      <ModalTitle>리워드를 발급하겠습니까?</ModalTitle>
                      <ModalBtnBox>
                        <ModalBtn
                          onClick={() => {
                            window.location.reload();
                          }}
                        >
                          아니오
                        </ModalBtn>
                        <ModalBtn
                          onClick={() =>
                            isClickedBtn(item.user__id, item.quest__id)
                          }
                        >
                          네
                        </ModalBtn>
                      </ModalBtnBox>
                    </ModalContent>
                  </ReactModal>
                </TableBodyReward>
              </TableBody>
            );
          })}
        </TableContainer>
        <PagiNation
          postsPerPage={PostsPerPage}
          totalPosts={filterSearch.length}
          paginate={paginate}
        />
      </InnerWarapper>
    </Wrapper>
  );
};

export default Reward;

const Wrapper = styled.div``;
const InnerWarapper = styled.div`
  max-width: 1090px;
  width: 100%;
  margin: auto;
`;
const HeaderTitleContainer = styled.div`
  width: 100%;
`;
const HeaderTitle = styled.div`
  margin-bottom: 20px;
  text-align: center;
  letter-spacing: 0.1rem;
  color: #333;
  text-transform: uppercase;
  font: 2.5rem/1.071rem 'Bebas Neue', cursive;
`;
const Description = styled.div`
  padding-bottom: 50px;
  text-align: center;
  letter-spacing: 0.1rem;
  color: #948780;
  font-weight: 300;
  line-height: 20px;
`;
const SelectContainer = styled.div`
  width: 100%;
  border-bottom: solid 3px rgb(252, 109, 2);
  display: flex;
`;
const DropdownBox = styled.div`
  width: 150px;
  margin-right: 10px;
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
  }
  :hover::after {
    color: orange;
  }
`;
const DurationOptions = styled.select``;
const Duration = styled.option`
  color: blue;
`;
const SearchBox = styled.div`
  width: 28%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: none;
  display: flex;
`;
const SearchInput = styled.input`
  width: 90%;
  font-size: 15px;
`;
const SearchIcon = styled(Search)`
  padding-top: 5px;
  height: 25px;
  color: rgb(252, 109, 2);
`;
const TableContainer = styled.div`
  padding-top: 30px;
  /* table-layout: fixed; */
  margin: 0 0 60px;
  border-collapse: collapse;
  width: 100%;
  color: #999;
`;
const TableHead = styled.div`
  height: 30px;
  display: flex;
  color: black;
  text-transform: uppercase;
  border-bottom: 1px solid #ddd;
  font: 1.2rem 'Bebas Neue', cursive;
`;
const TableHeadName = styled.div`
  width: 19%;
`;
const TableHeadStore = styled.div`
  width: 20%;
`;
const TableHeadQuest = styled.div`
  width: 25%;
`;
const TableHeadTime = styled.div`
  width: 30%;
`;
const TableHeadReward = styled.div`
  width: 10%;
`;
const TableBody = styled.div`
  padding: 15px 0 30px 0;
  height: 30px;
  display: flex;
  font-size: 15px;
  color: #aaa;
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const TableBodyName = styled.div`
  width: 19%;
`;
const TableBodyStore = styled.div`
  width: 20%;
`;
const TableBodyQuest = styled.div`
  width: 25%;
`;
const TableBodyTime = styled.div`
  width: 30%;
`;
const TableBodyReward = styled.div`
  width: 10%;
`;
const RewardBtn = styled.div`
  font: 'Bebas Neue', cursive;
  color: blue;
  cursor: pointer;
  &:hover {
    /* color: #948780; */
    color: black;
  }
  &:focus {
    outline: none;
  }
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
`;
const ModalTitle = styled.div`
  font-size: 15px;
  margin-bottom: 15px;
`;
const ModalBtnBox = styled.div`
  display: flex;
  justify-content: center;
`;
const ModalBtn = styled.button`
  margin-left: 20px;
  font-size: 14px;
  color: white;
  width: 70px;
  height: 35px;
  border-radius: 5px;
  background-color: rgb(252, 109, 2);
  cursor: pointer;
  &:hover {
    background-color: orange;
  }
  &:focus {
    outline: none;
  }
`;
