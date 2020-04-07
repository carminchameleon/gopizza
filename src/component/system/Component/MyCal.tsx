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
            <h2>나의 수치</h2>
            <p>자세한 내 스펙들을 확인하세요</p>
            <dl>
                <dt>Time</dt>
                <dd>
                    <div>
                        <em>평균 시간</em>
                        <p>{props.average_time}</p>
                    </div>
                    <div>
                        <em>최소시간</em>
                        <p>{props.shortest_time}</p>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>Count</dt>
                <dd>{props.count}</dd>
            </dl>
            <dl>
                <dt>Quality</dt>
                <dd>
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
                </dd>
            </dl>
        </MyCalBox>
    );
};

const MyCalBox = styled.div`

`

export default MyCal;