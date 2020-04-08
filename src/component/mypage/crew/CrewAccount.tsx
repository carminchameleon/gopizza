import React from 'react';
import Header from 'shared/Header';
import Banner from 'shared/Banner';
import AccountFrom from '../AccountForm';
import styled from 'styled-components';

const CrewAccount = () => {
  return (
    <Wrapper>
      <Header />
      <Banner
        title="My Page"
        menu1="계정관리"
        menu2="계정탈퇴"
        background="#fcb131"
        navBackground="#f69d04"
        routes1="/crew_account"
        routes2="/delete_account"
      />
      <AccountFrom />
    </Wrapper>
  );
};

export default CrewAccount;

const Wrapper = styled.div``;
