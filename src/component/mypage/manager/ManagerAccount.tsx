import React from 'react';
import Header from 'shared/Header';
import Banner from 'shared/Banner';
import AccountFrom from '../AccountForm';
import styled from 'styled-components';

const ManagerAccount = () => {
  return (
    <Wrapper>
      <Header />
      <Banner
        title="My Page"
        menu1="크루 관리"
        menu2="내 계정"
        background="#fcb131"
        navBackground="#f69d04"
        routes1="/manage_crew"
        routes2="/manager_account"
      />
      <AccountFrom />
    </Wrapper>
  );
};

export default ManagerAccount;

const Wrapper = styled.div``;
