import React from 'react';

interface props {
    TabClick: (arg: string) => void
}

const MyRewardTap: React.FC<props> = (props: props) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.TabClick(e.currentTarget.name); return null;
    }

    return (
        <>
            <h2>리워드 진행 상태</h2>
            <p>달성완료시 리워드를 GET하세요!</p>
            <div>
                <ul>
                    <li><button type="button" name="time" onClick={handleClick}>Time</button></li>
                    <li><button type="button" name="count" onClick={handleClick}>Count</button></li>
                    <li><button type="button" name="quality" onClick={handleClick}>Quality</button></li>
                </ul>
            </div>
        </>
    );
};

export default MyRewardTap;