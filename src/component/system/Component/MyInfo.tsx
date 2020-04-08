import React from 'react';

interface props {
    name: string,
    store: string
}

const MyInfo = (props: props) => {
    return (
        <div>
            <div>프로필사진</div>
            <ul>
                <li>
                    <em>이름</em>
                    <p>{props.name}</p>
                </li>
                <li>
                    <em>지점</em>
                    <p>{props.store}</p>
                </li>
                <li>
                    <em>뱃지레벨</em>
                    <p>Lv. 2</p>
                </li>
                <li>
                    <em>쿠폰개수</em>
                    <p>7</p>
                </li>
            </ul>
        </div>
    );
};

export default MyInfo;