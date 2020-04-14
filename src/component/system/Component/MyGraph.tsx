import React from 'react';
import ReactDOM from "react-dom";
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import styled from 'styled-components'

interface payloadParam {
    coordinate: number,
    value: string,
    index: number,
    offset: number
}

interface chartParam {
    payload: payloadParam,
    x: number,
    y: number,
    textAnchor: string,
    stroke: string,
    radius: number
}

const MyGraph = (props: any) => {

    function customTick(param: chartParam) {

        return (
            <g
                className="recharts-layer recharts-polar-angle-axis-tick"
            >
                <text
                    radius={param.radius}
                    stroke={param.stroke}
                    x={param.x}
                    y={param.textAnchor === "middle" ? param.y - 15 : param.y}
                    className="recharts-text recharts-polar-angle-axis-tick-value"
                    textAnchor={param.textAnchor}
                >
                    <tspan x={param.x} dy="0em">
                        {param.payload.value}
                    </tspan>
                </text>
            </g>
        );
    }

    return (
        <GraphBox>
            <div>
                <MyGraphTitle>능숙도(백분위)</MyGraphTitle>
                <MyGraphSubTitle>백분위 점수로 변환한 내 그래프를 확인하세요!</MyGraphSubTitle>
                <RadarChart style={{ fontFamily: 'Bevan, cursive', letterSpacing: "-1px" }} cx={192} cy={190} outerRadius={150} width={400} height={272} data={props.data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={customTick} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="" dataKey="A" stroke="#efe944" fill="#efe144" fillOpacity={0.4} />
                </RadarChart>
            </div>
            <MyGraphScoreBox>
                <dl>
                    <dt>Time</dt>
                    <dd>{props.data[1].A}%</dd>
                </dl>
                <dl>
                    <dt>Count</dt>
                    <dd>{props.data[0].A}%</dd>
                </dl>
                <dl>
                    <dt>Quality</dt>
                    <dd>{props.data[2].A}%</dd>
                </dl>
            </MyGraphScoreBox>
        </GraphBox>
    );
};

const GraphBox = styled.section`
    overflow:hidden;
    width: 460px;
    height: auto;

    >div {
        padding: 30px;
        background-color: #f8f8f8;
        border-radius: 10px;
    }

    > div:last-child{
        padding: 11px 0;
    }
`
const MyGraphTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 500;
    font-family:'Bebas Neue',cursive;
`
const MyGraphSubTitle = styled.p`
    margin-bottom: 20px;
`

const MyGraphScoreBox = styled.div`
    display:flex;
    justify-content: space-between;
    margin-top: 21px;
    padding: 15px 10px 8px;
    background-color:#fff;
    border-radius: 10px;

    dl{
        width: 33.3%;
        margin-left: 10px;
        text-align: center;
        border-right: 1px solid #ccc;
    }

    dl:last-child{
        margin-right: 0;
        border-right: 0;
    }

    dt{
        color: #666;
        font-size: 13px;
        font-family:'Bevan',cursive;
    }

    dd{
        padding: 10px 0 0;
        font-size: 26px;
        letter-spacing:0.3px;
        color: #c3c065;
        font-family: 'Bebas Neue',cursive;
    }
`

export default MyGraph;