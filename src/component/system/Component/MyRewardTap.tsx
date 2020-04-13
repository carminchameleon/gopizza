import React, { useState } from 'react';
import styled from 'styled-components'

interface props {
    TabClick: (arg: any) => void,
}

const MyRewardTap: React.FC<props> = (props: props) => {


    const [tabName, SetTabName] = useState("time");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        SetTabName(e.currentTarget.name);
        props.TabClick(e.currentTarget.name); return null;
    }

    return (
        <>
            <MyRewardTitle>리워드 진행 상태</MyRewardTitle>
            <MyRewardSubTitle>달성완료시 리워드를 GET하세요!</MyRewardSubTitle>
            <div>
                <TabList>
                    <TabLi color={tabName === "time" ? "yellow" : "gray"}><TabButton color={tabName === "time" ? "yellow" : "gray"} type="button" name="time" onClick={handleClick}>Time</TabButton></TabLi>
                    <TabLi color={tabName === "count" ? "yellow" : "gray"}><TabButton color={tabName === "count" ? "yellow" : "gray"} type="button" name="count" onClick={handleClick}>Count</TabButton></TabLi>
                    <TabLi color={tabName === "quality" ? "yellow" : "gray"}><TabButton color={tabName === "quality" ? "yellow" : "gray"} type="button" name="quality" onClick={handleClick}>Quality</TabButton></TabLi>
                </TabList>
            </div>
        </>
    );
};

const MyRewardTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 500;
`
const MyRewardSubTitle = styled.p`
    margin-bottom: 40px;
`
const TabList = styled.ul`

    border-bottom: 3px solid #ff9800;

    li{
        float:left;
        position: relative;
        width: 20%;
        margin-right: 3px;
        margin-bottom: 0px;
        text-align: center;
        border-radius: 3px 3px 0 0;
        opacity: 0.8;
    }

    &:after {
        display:block;
        clear: both;
        content:'';
    }
`

const TabLi = styled.li`
    border: 2px solid ${props => props.color === "yellow" ? "#ff9800" : "#b8bfc2"};
    border-bottom: 0px;
`

const TabButton = styled.button`
    display:block;
    width: 100%;
    height: auto;
    padding: 10px;
    font-size: 17px;
    letter-spacing: 0.8px;
    font-family:'Bebas Neue',cursive;
    color:${props => props.color === "yellow" ? "#ff9800" : "#b8bfc2"};
    outline: none;

    &:focus {
        outline: none;
    } 
`

export default MyRewardTap;