import React from 'react';

interface props {
    TabName: string;
}

const MyRewardCont: React.FC<props> = (props: props) => {

    return (
        <div>
            {props.TabName === "time" && <div>TIME CONTENT</div>}
            <div>
                <ul>
                    <li>
                        <div></div>
                        <div>
                            <p>피자 만들기 10개를 달성해보세요!</p>
                            <div>
                                <span>10 / 10</span>
                            </div>
                        </div>
                        <div>
                            <span>CLEAR!</span>
                            <button>Reward</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div>QUALITY CONTENT</div>
        </div>
    );
};

export default MyRewardCont;