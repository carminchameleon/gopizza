import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components'

interface AniamtionProps {
    changeColor: boolean,
};

interface WidthProps {
    width: string;
}

const MyRewardContCount = (props: any) => {

    const [count, setCount] = useState({
        ...props.count
    })

    React.useEffect(() => {
        setCount({
            ...props.count
        })
    }, [props.count])

    const RewardRequire = async (e: React.MouseEvent<HTMLButtonElement>) => {

        const element = e.currentTarget
        const elementParent = element.parentElement as HTMLElement;
        const buttonId = Number(e.currentTarget.getAttribute("data-id"));
        const buttonElement = element.childNodes[0];
        console.dir(element.innerText);

        if (count.quests[buttonId - 1].is_achieved) {

            const loginCheck = await fetch(`http://localhost:3000/Data/requestList.json`, {
                method: "POST",
                body: JSON.stringify({
                    is_claimed: true,
                    quest_id: buttonId
                })
            });

        }

    }

    return (

        <div>
            <ul>
                {Array.isArray(count.quests) && count.quests.map((item: any, idx: number) => {
                    return (
                        <li data-id={item.quest_id} key={idx}>
                            <div>{item.quest__name}</div>
                            <div>
                                <p>{item.quest__description}</p>
                                <div>
                                    <ProgressBarBox>
                                        <ProgressBarWidth width="300">
                                            <ProgressBar changeColor={true}></ProgressBar>
                                        </ProgressBarWidth>
                                    </ProgressBarBox>
                                    <span>10 / {item.quest__goal}</span>
                                </div>
                            </div>
                            <div>
                                <button data-id={item.quest_id} onClick={RewardRequire}>Reward</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div >
    );
};

const ProgressBarBox = styled.div`
  background: #d9e0e9;
  border-radius: 100px;
  height: 20px;
  width: 500px;
`

const ProgressBarWidth = styled.div<WidthProps>`
    width: ${props => props.width ? props.width + "px" : "auto"};
`

const Load = keyframes`
    from { width: 0%; }
    to { width: 100%; }
`
const ProgressBar = styled.div<AniamtionProps>`
  width: 0;
  height: 20px;
  background: #3fb3e9;
  box-shadow: 0 10px 40px -10px #3486da;
  border-radius: 100px;
  animation: ${Load} 2s forwards;
`

export default MyRewardContCount;