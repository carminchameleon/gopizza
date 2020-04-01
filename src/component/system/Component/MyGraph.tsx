// <reference path="../../../dts/react-vis.d.ts"/>
import React from 'react';
import ReactDOM from "react-dom";
//import "react-vis/dist/style.css";
//import {
//    RadialChart, Hint,
//    XYPlot, LineSeries, VerticalGridLines,HorizontalGridLines, XAxis, YAxis
//} from 'react-vis';


import styled from 'styled-components'


const MyGraph = () => {

    return (
        <div>
            <h2>능숙도</h2>
            <p>내 수치를 그래프로 확인하세요!</p>
        </div>
    );
};

const Secton = styled.section`

`

export default MyGraph;