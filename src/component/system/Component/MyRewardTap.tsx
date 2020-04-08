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
            <h2>리워드 진행 상태</h2>
            <p>달성완료시 리워드를 GET하세요!</p>
            <div>
                <ul>
                    <li><TabButton color={tabName === "time" ? "yellow" : "gray"} type="button" name="time" onClick={handleClick}>Time</TabButton></li>
                    <li><TabButton color={tabName === "count" ? "yellow" : "gray"} type="button" name="count" onClick={handleClick}>Count</TabButton></li>
                    <li><TabButton color={tabName === "quality" ? "yellow" : "gray"} type="button" name="quality" onClick={handleClick}>Quality</TabButton></li>
                </ul>
            </div>
        </>
    );
};

const TabButton = styled.button`
    color:${props => props.color === "yellow" ? "yellow" : "gray"}
`

export default MyRewardTap;