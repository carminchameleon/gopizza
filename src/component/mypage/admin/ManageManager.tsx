import React from 'react';
import Header from 'shared/Header';
import Banner from 'shared/Banner';
import styled from 'styled-components';

const ManageManager = () => {
  return (
    <Wrapper>
      <Header />
      <Banner
        title="My Page"
        menu1="매니저 관리"
        menu2="리워드 관리"
        background="#fcb131"
        navBackground="#f69d04"
        routes1="/manage_manager"
        routes2="/reward"
      />
    </Wrapper>
  );
};

export default ManageManager;

const Wrapper = styled.div``;
