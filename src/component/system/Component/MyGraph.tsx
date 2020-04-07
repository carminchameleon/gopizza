import React from 'react';
import ReactDOM from "react-dom";
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import styled from 'styled-components'
import { isArray } from 'util';

interface props {
    data: any,
}

const MyGraph = (props: props) => {

    function customTick({ payload, x, y, textAnchor, stroke, radius }: any) {
        return (
            <g
                className="recharts-layer recharts-polar-angle-axis-tick"
            >
                <text
                    radius={radius}
                    stroke={stroke}
                    x={x}
                    y={textAnchor === "middle" ? y - 15 : y}
                    className="recharts-text recharts-polar-angle-axis-tick-value"
                    textAnchor={textAnchor}
                >
                    <tspan x={x} dy="0em">
                        {payload.value}
                    </tspan>
                </text>
            </g>
        );
    }

    return (
        <div>
            <h2>능숙도</h2>
            <p>내 수치를 그래프로 확인하세요!</p>
            <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={props.data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={customTick} />
                <PolarRadiusAxis angle={90} />
                <Radar name="" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.4} />
            </RadarChart>
        </div>
    );
};

const Secton = styled.section`

`

export default MyGraph;