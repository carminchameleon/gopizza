import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components'
import Modal from "react-modal";
import { URL } from 'config';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const MyRewardContCount = (props: any) => {

    const [count, setCount] = useState({
        ...props.count
    })

    const [pizzaCount, setPizzaCount] = useState({
        ...props.pizzaCounts
    })

    React.useEffect(() => {
        setCount({
            ...props.count
        })

        setPizzaCount({
            ...props.pizzaCount.myScoreJson.pizza_counts
        })

    }, [props.count, props.pizzaCounts])

    console.log()

    const RewardRequire = async (e: React.MouseEvent<HTMLButtonElement>) => {

        const element = e.currentTarget
        const elementParent = element.parentElement as HTMLElement;
        const buttonId = Number(e.currentTarget.getAttribute("data-id"));
        console.dir(element.innerText);

        console.log(count.quests)

        console.log(count.quests[buttonId - 1].is_achieved)

        /*if (count.quests[buttonId - 1].is_achieved) {

            const requestPostSend = await fetch(`${URL}/quest/claim/${buttonId}`, {
                method: "POST",
                headers: { Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxMzd9.vpQMWR9OlJiCXWe73hiGCHEXaKCVa35Loqm0_jNIkgU" }
            });

            if (requestPostSend.ok) {
                const reqJson = await requestPostSend.json();
                console.log(reqJson);
            }
            props.requestPost({ is_achieved: requestPostSend.ok, buttonId });

        } else {
            alert("달성 이후에 클릭해주세요.")
        }*/

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
                                        <ProgressBarWidth width={(500 / item.quest__goal) * (pizzaCount[item.quest__category__name] > item.quest__goal ? item.quest__goal : pizzaCount[item.quest__category__name])}>
                                            <ProgressBar changeColor={item.is_achieved ? "red" : "blue"}></ProgressBar>
                                        </ProgressBarWidth>
                                    </ProgressBarBox>
                                    <span>{pizzaCount[item.quest__category__name] > item.quest__goal ? item.quest__goal : pizzaCount[item.quest__category__name]} / {item.quest__goal}</span>
                                </div>
                            </div>
                            <div>
                                <GuestButton disabled={item.is_achieved && item.is_claimed === false ? false : true} changeColor={item.is_achieved === false ? "gray" : item.is_achieved && item.is_claimed ? "red" : "blue"} data-id={item.quest_id} onClick={RewardRequire}>{item.is_claimed ? "CLEAR!" : "Reward"}</GuestButton>
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
  border-radius: 7px;
  height: 20px;
  width: 500px;
`

const ProgressBarWidth = styled.div<{ width: number }> `
    width: ${props => props.width ? props.width + "px" : "auto"};
`

const Load = keyframes`
    from { width: 0%; }
    to { width: 100%; }
`
const ProgressBar = styled.div<{ changeColor: string }>`
  width: 0;
  height: 20px;
  background: ${props => props.changeColor === "blue" ? "#44b5e9" : "#ffd01e"};
  border: ${props => props.changeColor === "blue" ? "#3486da" : "#e78810"};
  box-shadow: -1px 2px 4px 1px ${props => props.changeColor === "blue" ? "#3486da" : "#e78810"};
  border-radius: 7px;
  animation: ${Load} 2s forwards;
`

const GuestButton = styled.button<{ changeColor: string }>`
    color:#fff;
    background: ${props => props.changeColor === "gray" ? "#c8cfd5" : props.changeColor === "blue" ? "#45b6fb" : "red"};
    border: ${props => props.changeColor === "red" ? "#fd5a5a" : ""};
    border-radius: 10px;
    cursor: ${props => props.changeColor === "blue" ? "pointer" : "auto"};
`

export default MyRewardContCount;