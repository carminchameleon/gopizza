import React, { useState, useEffect } from 'react';
import Header from 'shared/Header';
import Banner from 'shared/Banner';
import PagiNation from '../admin/PagiNation';
import { Search } from '@styled-icons/boxicons-regular/Search';
import { URL } from 'config';
import styled from 'styled-components';

interface UserList {
  id: number;
  name: string;
  image: string;
  grade_id: number;
  grade__name: string;
  is_approved: null | boolean;
  store_id: number;
  store__name: string;
}

const AdminPage = () => {
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<string>('');
  const [filterSearch, setFilterSearch] = useState<any>([]);
  const [select, setSelect] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [PostsPerPage] = useState(10);

  //Data 저장
  const token = window.sessionStorage.getItem('token');
  useEffect(() => {
    if (token) {
      fetch(`${URL}/user/get`, {
        method: 'GET',
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(res => {
          // console.log(res)
          setData(res.user);
        });
    }
  }, []);

  //pagination
  const indexOfLastPosts = currentPage * PostsPerPage;
  const indexOfFirstPost = indexOfLastPosts - PostsPerPage;
  const currentPosts = filterSearch.slice(indexOfFirstPost, indexOfLastPosts);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleChange = (e: any) => {
    setSelect(e.target.value);
  };

  useEffect(() => {
    setFilterSearch(
      data.filter((item: UserList) => item.name.includes(search)),
    );
    if (select === 'name') {
      setFilterSearch(
        data.filter((item: UserList) => item.name.includes(search)),
      );
    }
    if (select === 'store__name') {
      setFilterSearch(
        data.filter((item: UserList) => item.store__name.includes(search)),
      );
    }
    if (select === 'grade__name') {
      setFilterSearch(
        data.filter((item: UserList) => item.grade__name.includes(search)),
      );
    }
  }, [search, data]);

  //직원삭제
  const isClickedDelet = (id: number) => {
    if (token) {
      fetch(`${URL}/user/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          alert('계정삭제가 완료되었습니다.');
          window.location.reload();
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
          <HeaderTitle>Admin Page</HeaderTitle>
          <Description>직원관리 페이지 입니다.</Description>
        </HeaderTitleContainer>
        <SelectContainer>
          <DropdownBox>
            <Dropdown>
              <DurationOptions onChange={handleChange}>
                <Duration value="name">이름</Duration>
                <Duration value="store__name">매장</Duration>
                <Duration value="grade__name">직급</Duration>
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
            <TableHeadPosition>Position</TableHeadPosition>
            <TableHeadDelete>Delete</TableHeadDelete>
          </TableHead>
          {currentPosts.map((item: UserList) => {
            return (
              <TableBody>
                <TableBodyName>{item.name}</TableBodyName>
                <TableBodyStore>{item.store__name}</TableBodyStore>
                <TableBodyPosition>{item.grade__name}</TableBodyPosition>
                <TableBodyDelete onClick={() => isClickedDelet(item.id)}>
                  Delete
                </TableBodyDelete>
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

export default AdminPage;

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
  width: 25%;
`;
const TableHeadStore = styled.div`
  width: 30%;
`;
const TableHeadPosition = styled.div`
  width: 30%;
`;
const TableHeadDelete = styled.div`
  width: 10%;
`;
const TableBody = styled.div`
  margin-top: 15px;
  height: 30px;
  display: flex;
  font-size: 15px;
  color: #aaa;
  border-bottom: 1px solid #ddd;
`;
const TableBodyName = styled.div`
  width: 25%;
`;
const TableBodyStore = styled.div`
  width: 30%;
`;
const TableBodyPosition = styled.div`
  width: 30%;
`;
const TableBodyDelete = styled.div`
  width: 10%;
  color: red;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;
