import React from 'react';
import styled from 'styled-components'

interface props {
    name: string,
    store: string
}

const MyInfo = (props: props) => {
    return (
        <ProfileBox>
            <ProfilePic>프로필사진<img src="" alt="" /></ProfilePic>
            <ProfileList>
                <li>
                    <em>이름</em>
                    <p>{props.name}</p>
                </li>
                <li>
                    <em>지점</em>
                    <p>{props.store}점</p>
                </li>
                <li>
                    <em>뱃지레벨</em>
                    <p>Lv. 2</p>
                </li>
                <li>
                    <em>쿠폰개수</em>
                    <p>7</p>
                </li>
            </ProfileList>
        </ProfileBox>
    );
};

const ProfileBox = styled.div`
    min-width: 250px;
    padding: 30px;
`

const ProfilePic = styled.div`
    overflow:hidden;
    width: 150px;
    height: 150px;
    margin: 0 auto;
    text-align: center;
    font-size: 0;
    border-radius: 50%;
    background-color:#eee;
`

const ProfileList = styled.ul`

    margin-top: 30px;

    li{
        display:flex;
        margin-bottom: 20px;
        justify-content:space-between;
    }

`

export default MyInfo;