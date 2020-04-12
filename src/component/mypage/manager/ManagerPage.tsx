import React, { useState, useEffect } from 'react';
import Header from 'shared/Header';
import Banner from 'shared/Banner';
import ReactModal from 'react-modal';
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

const ManagerPage = () => {
  const [data, setData] = useState<any>([]);
  const [storeName, setStoreName] = useState<string>('');
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [approvalModalIsOpen, setApprovalModalIsOpen] = useState<boolean>(
    false,
  );

  //Data 저장
  const token = window.sessionStorage.getItem('token');
  // console.log(token);
  useEffect(() => {
    if (token) {
      fetch(`${URL}/user/get`, {
        method: 'GET',
        headers: { Authorization: token },
      })
        .then(res => res.json())
        .then(res => {
          // console.log(res.user[0].store__name);
          setData(res.user);
          setStoreName(res.user[0].store__name);
        });
    }
  }, []);

  //승인
  const isClickedApproval = (id: number) => {
    if (token) {
      fetch(`${URL}/user/approval/${id}`, {
        method: 'POST',
        headers: { Authorization: token },
      }).then(res => {
        // console.log(res);
        if (res.status === 200) {
          alert('승인이 완료되었습니다.');
          window.location.reload();
        }
      });
    }
  };

  //삭제
  const isClickedDelete = (id: number, grade: string) => {
    if (token) {
      if (grade === 'Manager') alert('매니저는 삭제가 불가능 합니다');
      else {
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
    }
  };

  return (
    <Wrapper>
      <Header />
      <Banner
        title="My Page"
        menu1="크루 관리"
        menu2="내 계정"
        background="#fcb131"
        navBackground="#f69d04"
        routes1="/manager_page"
        routes2="/manager_account"
      />
      <InnerWarapper>
        <HeaderTitleContainer>
          <HeaderTitle>Manager Page</HeaderTitle>
          <Description>직원관리 페이지 입니다.</Description>
        </HeaderTitleContainer>
        <StoreTitle>Store: {storeName}</StoreTitle>
        <TableContainer>
          <TableHead>
            <TableHeadName>Name</TableHeadName>
            <TableHeadStore>Store</TableHeadStore>
            <TableHeadPosition>Position</TableHeadPosition>
            <TableHeadDelete>Delete</TableHeadDelete>
            <TableHeadApproval>Approval</TableHeadApproval>
          </TableHead>
          {data.map((item: UserList) => {
            return (
              <TableBody>
                <TableBodyName>{item.name}</TableBodyName>
                <TableBodyStore>{item.store__name}</TableBodyStore>
                <TableBodyPosition>{item.grade__name}</TableBodyPosition>
                <TableBodyDelete>
                  <DeleteBtn onClick={() => setDeleteModalIsOpen(true)}>
                    {item.grade__name === 'Manager' ? '' : '삭제'}
                  </DeleteBtn>
                  <ReactModal
                    isOpen={deleteModalIsOpen}
                    onRequestClose={() => setDeleteModalIsOpen(false)}
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
                      <ModalTitle>정말 삭제하시겠습니까?</ModalTitle>
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
                            isClickedDelete(item.id, item.grade__name)
                          }
                        >
                          네
                        </ModalBtn>
                      </ModalBtnBox>
                    </ModalContent>
                  </ReactModal>
                </TableBodyDelete>
                <TableBodyApproval>
                  {item.is_approved === null ? (
                    <ApprovalBtn
                      onClick={() => {
                        setApprovalModalIsOpen(true);
                      }}
                    >
                      {' '}
                      승인
                    </ApprovalBtn>
                  ) : item.grade__name === 'Manager' ? (
                    ''
                  ) : (
                    '승인완료'
                  )}
                  <ReactModal
                    isOpen={approvalModalIsOpen}
                    onRequestClose={() => setApprovalModalIsOpen(false)}
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
                      <ModalTitle>정말 승인하시겠습니까?</ModalTitle>
                      <ModalBtnBox>
                        <ModalBtn
                          onClick={() => {
                            window.location.reload();
                          }}
                        >
                          아니오
                        </ModalBtn>
                        <ModalBtn onClick={() => isClickedApproval(item.id)}>
                          네
                        </ModalBtn>
                      </ModalBtnBox>
                    </ModalContent>
                  </ReactModal>
                </TableBodyApproval>
              </TableBody>
            );
          })}
        </TableContainer>
      </InnerWarapper>
    </Wrapper>
  );
};

export default ManagerPage;

const Wrapper = styled.div``;
const InnerWarapper = styled.div`
  margin: auto;
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
const StoreTitle = styled.div`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: solid 3px rgb(252, 109, 2);
  font: 2.5rem/1.071rem 'Bebas Neue', cursive;
  font-size: 28px;
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
const TableHeadApproval = styled.div`
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
`;
const TableBodyApproval = styled.div`
  width: 10%;
`;
const ApprovalBtn = styled.button`
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
const DeleteBtn = styled.button`
  font: 'Bebas Neue', cursive;
  color: red;
  cursor: pointer;
  &:hover {
    /* color: #948780; */
    color: black;
  }
  &:focus {
    outline: none;
  }
`;
//modal style
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
