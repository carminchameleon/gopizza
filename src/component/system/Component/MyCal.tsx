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
            <MyCalSpecList margin={true}>
                <MyCalSpecTitle>Time</MyCalSpecTitle>
                <MyCalSpecDetail>
                    <div>
                        <em>평균 시간</em>
                        <p>{Math.floor(props.average_time / 60)}:{Math.floor(props.average_time) - 60 * (Math.floor(props.average_time / 60))}</p>
                    </div>
                    <div>
                        <em>최소시간</em>
                        <p>{Math.floor(props.shortest_time / 60)}:{Math.floor(props.shortest_time) - (60 * (Math.floor(props.shortest_time / 60))) === 0 ? "00" : Math.floor(props.shortest_time) - (60 * (Math.floor(props.shortest_time / 60)))}
                        </p>
                    </div>
                </MyCalSpecDetail>
            </MyCalSpecList>
            <MyCalSpecList margin={true}>
                <MyCalSpecTitle>Count</MyCalSpecTitle>
                <MyCalSpecDetail>
                    <div>
                        <em>전체 개수</em>
                        <p>{props.count} 개</p>
                    </div>
                </MyCalSpecDetail>
            </MyCalSpecList>
            <MyCalSpecList margin={false}>
                <MyCalSpecTitle>Quality</MyCalSpecTitle>
                <MyCalSpecDetail>
                    <div>
                        <em>Quality</em>
                        <p>{Math.floor(props.quality)} 점</p>
                    </div>
                    <div>
                        <em>Sauce</em>
                        <p>{Math.floor(props.sauce)} 점</p>
                    </div>
                    <div>
                        <em>Cheese</em>
                        <p>{Math.floor(props.cheese)} 점</p>
                    </div>
                    <div>
                        <em>Topping</em>
                        <p>{Math.floor(props.topping)} 점</p>
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

const MyCalSpecList = styled.dl < { margin: boolean }>`
    margin-bottom: ${props => props.margin ? "15px" : "0px"};
`

const MyCalSpecTitle = styled.dt`
    margin-bottom: 10px;
    padding: 10px;
    font-size: 20px;
    letter-spacing: 1px;
    font-family: 'Bebas Neue',cursive;
    color: #fff;
    background-color: #efe144;
`
const MyCalSpecDetail = styled.dd`
    >div{
        display:flex;
        margin-bottom: 15px;
        padding: 0 10px;
        justify-content:space-between
    }

    >div:last-child{
        margin-bottom: 0
    }

    em{
        color: #666
    }

    p{
        font-family: 'Bevan',cursive;
        font-size: 16px;
        letter-spacing: 0.8px;
        color: #444
    }
`

export default MyCal;