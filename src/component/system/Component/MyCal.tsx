import React from 'react';
import styled from 'styled-components'

interface props {
    average_time: number,
    shortest_time: number,
    count: number,
    quality: number,
    sauce: number,
    cheese: number,
    topping: number
}

const MyCal = (props: props) => {
    return (
        <MyCalBox>
            <MyCalTitle>나의 수치</MyCalTitle>
            <MyCalSubTitle>자세한 내 스펙들을 확인하세요</MyCalSubTitle>
            <MyCalSpecList>
                <MyCalSpecTitle>Time</MyCalSpecTitle>
                <MyCalSpecDetail>
                    <div>
                        <em>평균 시간</em>
                        <p>{props.average_time}</p>
                    </div>
                    <div>
                        <em>최소시간</em>
                        <p>{props.shortest_time}</p>
                    </div>
                </MyCalSpecDetail>
            </MyCalSpecList>
            <MyCalSpecList>
                <MyCalSpecTitle>Count</MyCalSpecTitle>
                <MyCalSpecDetail>
                    <div>
                        <em>전체 개수</em>
                        <p>{props.count}</p>
                    </div>
                </MyCalSpecDetail>
            </MyCalSpecList>
            <MyCalSpecList>
                <MyCalSpecTitle>Quality</MyCalSpecTitle>
                <MyCalSpecDetail>
                    <div>
                        <em>평균 점수</em>
                        <p>{props.quality}</p>
                    </div>
                    <div>
                        <em>Sauce</em>
                        <p>{props.sauce}</p>
                    </div>
                    <div>
                        <em>Cheese</em>
                        <p>{props.cheese}</p>
                    </div>
                    <div>
                        <em>Topping</em>
                        <p>{props.topping}</p>
                    </div>
                </MyCalSpecDetail>
            </MyCalSpecList>
        </MyCalBox>
    );
};

const MyCalBox = styled.div`
    min-width: 300px;
    padding: 30px;
`

const MyCalTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 500;
`
const MyCalSubTitle = styled.p`
    margin-bottom: 20px;
`

const MyCalSpecList = styled.dl`
    margin-bottom: 15px;
`

const MyCalSpecTitle = styled.dt`
    margin-bottom: 10px;
    padding: 10px;
    color: #fff;
    background-color: #4b6d82;
`
const MyCalSpecDetail = styled.dd`
    >div{
        display:flex;
        margin-bottom: 15px;
        padding: 0 10px;
        justify-content:space-between
    }
`

export default MyCal;