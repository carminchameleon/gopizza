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
            <MyGraphTitle>능숙도</MyGraphTitle>
            <MyGraphSubTitle>내 수치를 그래프로 확인하세요!</MyGraphSubTitle>
            <RadarChart cx={195} cy={210} outerRadius={150} width={500} height={400} data={props.data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={customTick} />
                <PolarRadiusAxis angle={90} />
                <Radar name="" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.4} />
            </RadarChart>
        </GraphBox>
    );
};

const GraphBox = styled.section`
    overflow:hidden;
    width: 460px;
    height: 450px;
    padding: 30px;
    background-color: #f8f8f8;
    border-radius: 10px;

    >div {

    }
`
const MyGraphTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 500;
`
const MyGraphSubTitle = styled.p`
    margin-bottom: 20px;
`

export default MyGraph;