import React from 'react';
import styled from 'styled-components';

const MyRewardContTime: React.SFC = () => {
    return (
        <ContSection>현재 Time 관련된 리워드는 준비중이니, 양해부탁드립니다.</ContSection>
    );
};

const ContSection = styled.div`
    min-height: 400px;
    text-align: center;
    line-height: 420px;
    font-weight: 400;
    font-size: 24px;
    color: #444;
`

export default MyRewardContTime;