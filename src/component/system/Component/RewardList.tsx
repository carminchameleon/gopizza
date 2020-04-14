import React from 'react'
import styled from 'styled-components'

interface props {
    badgeList: any,
    couponList: any
}

const RewardList = (props: props) => {
    return (
        <StatusSection>
            <div>
                <MyStatusTitle>뱃지 상세</MyStatusTitle>
                <StatusList>
                    {props.badgeList.map((item: any, idx: number) => {
                        return (
                            <li key={idx}>
                                <StatusImgBox kind={"badge"}>
                                    <StatusImg rewardStatus={item.is_rewarded} src={item.image} alt="뱃지 이미지" />
                                </StatusImgBox>
                                <StatusText>{props.badgeList[idx].name}</StatusText>
                            </li>)
                    })}
                </StatusList>
            </div>
            <div>
                <MyStatusTitle>쿠폰 상세</MyStatusTitle>
                <StatusList>
                    {props.couponList.map((item: any, idx: number) => {
                        return (< li key={idx}>
                            <StatusImgBox kind={"coupon"}>
                                <StatusImg rewardStatus={item.is_rewarded} src={item.image} alt="쿠폰 이미지" />
                            </StatusImgBox>
                            <StatusText>{props.couponList[idx].name}</StatusText>
                        </li>)
                    })}
                </StatusList>
            </div>
        </StatusSection >
    )
}

const StatusSection = styled.section`
    display:flex;
    margin-bottom: 20px;

    >div{
        width: 50%;
        margin-right: 20px;
        padding: 30px;
        background-color: #f8f8f8;
        border-radius: 10px;
    }

    >div:last-child{
        margin-right: 0;
    }
`
const MyStatusTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 500;
`

const StatusList = styled.ul`
    display:flex;
    flex-wrap: wrap;
    justify-content:space-between;
    text-align: center;

    li{
        margin-right: 30px;
    }

    li:last-child{
        margin-right: 0;
    }
`

const StatusImgBox = styled.div<{ kind: string }>`
    width: auto;
    height: ${props => props.kind === "badge" ? "84px" : "78px"};
    margin-bottom: 15px;

    img{
        display:block;
        width: auto;
        height: 100%;
        margin: 0 auto;
    }
`

const StatusImg = styled.img<{ rewardStatus: boolean }>`
    opacity: ${props => props.rewardStatus ? 1 : 0.1};
`

const StatusText = styled.p`
`

export default RewardList
