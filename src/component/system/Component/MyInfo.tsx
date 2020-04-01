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
                    <em>멤버쉽 번호</em>
                    <p>10101010</p>
                </li>
                <li>
                    <em>이름</em>
                    <p>{props.name}</p>
                </li>
                <li>
                    <em>지역</em>
                    <p>서울</p>
                </li>
                <li>
                    <em>지점</em>
                    <p>{props.store}</p>
                </li>
            </ul>
        </div>
    );
};

export default MyInfo;