import React from 'react';
import styled from 'styled-components'

interface props {
    image: any,
    name: string,
    store: string,
    badge: number,
    coupon: number
}

const MyInfo = (props: props) => {

    return (
        <>
            <ProfileBox>
                <div>
                    <ProfilePic>프로필사진<img src={props.image} alt="프로필 이미지" /></ProfilePic>
                    <ProfileList margin={false}>
                        <li>
                            <em>이름</em>
                            <p>{props.name}</p>
                        </li>
                        <li>
                            <em>지점</em>
                            <p>{props.store}</p>
                        </li>
                    </ProfileList>
                </div>
                <div>
                    <ProfileTitle>리워드 지급 현황</ProfileTitle>
                    <ProfileList margin={true}>
                        <li>
                            <em>뱃지레벨</em>
                            <p>Lv. {props.badge}</p>
                        </li>
                        <li>
                            <em>쿠폰개수</em>
                            <p>{props.coupon}</p>
                        </li>
                    </ProfileList>
                </div>
            </ProfileBox>
        </>
    );
};

const ProfileBox = styled.section`
    min-width: 250px;

    >div{
        padding: 30px;
        background-color: #f8f8f8;
        border-radius: 10px;
    }

    >div:first-child{
        padding:33px 30px;
    }

    >div:last-child{
        margin-top: 22px;
    }
`

const ProfilePic = styled.div`
    overflow:hidden;
    width: 170px;
    height: 170px;
    margin: 0 auto;
    text-align: center;
    font-size: 0;
    border-radius: 50%;
    background-color:#fff;
`

const ProfileTitle = styled.h2`
    margin-bottom: 30px;
    font-size: 22px;
    font-weight: 500;
`

const ProfileList = styled.ul<{ margin: boolean }>`

    margin-top: ${props => props.margin ? "0px" : "30px"};

    li{
        display:flex;
        margin-bottom: 20px;
        justify-content:space-between;
    }
    
    li:last-child{
        margin-bottom: 0;
    }

    em {
        color:#666;
    }

    p{
        font-family: ${props => props.margin ? "Bevan,cursive" : ""};
        color: #444
    }

`

export default MyInfo;