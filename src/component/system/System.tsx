import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { URL } from 'config';
import Header from "../../shared/Header"
import Banner from "../../shared/Banner"
import MyCal from "./Component/MyCal"
import MyGraph from "./Component/MyGraph"
import MyInfo from "./Component/MyInfo"
import MyRewardContTime from "./Component/MyRewardContTime"
import MyRewardContCount from "./Component/MyRewardContCount"
import MyRewardContQuality from "./Component/MyRewardContQuality"
import MyRewardTap from "./Component/MyRewardTap"

interface _props {
    status: boolean,
}

const System: React.SFC = () => {

    const [TabName, setTabName] = useState("");

    const [userInfo, setUserInfo] = useState({
        image: null,
        name: "",
        store: "",
        badge: 0,
        coupon: 0,
    })

    const [userScore, setUserSocre] = useState({
        quality: 0,
        average_time: 0,
        shortest_time: 0,
        count: 0,
        sauce: 0,
        cheese: 0,
        topping: 0
    })

    const [questList, setquestList] = useState({
        questList: {},
    })

    const [graphData, setGraphData] = useState(
        [
            {
                subject: 'Count', A: 60, fullMark: 100,
            },
            {
                subject: 'Quality', A: 48, fullMark: 100,
            },
            {
                subject: 'Time', A: 86, fullMark: 100,
            },
        ]
    )

    const [pizzaCount, setpizzaCount] = useState({});

    useEffect(() => {
        fetchInfo();
        requestList();

    }, [])

    const TabClick = (arg: string) => {
        setTabName(arg);
    }

    const fetchInfo = async () => {

        const info = await fetch(`${URL}/record/user/137`, {
            method: "GET",
            headers: {
                Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxMzd9.vpQMWR9OlJiCXWe73hiGCHEXaKCVa35Loqm0_jNIkgU"
            }
        })



        const score = await fetch(`${URL}/quest/reward/137`, {
            method: "GET",
            headers: {
                Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxMzd9.vpQMWR9OlJiCXWe73hiGCHEXaKCVa35Loqm0_jNIkgU"
            }
        })

        if (info.status === 200 && score.status === 200) {
            const infoJson = await info.json();
            const scoreJson = await score.json();

            console.log(infoJson)

            setUserInfo({
                image: infoJson.user_info.image,
                name: infoJson.user_info.name,
                store: infoJson.user_info.store_name,
                badge: scoreJson.reward.badge_count,
                coupon: scoreJson.reward.coupon_count
            })

            setUserSocre({
                average_time: infoJson.user_info.average_time,
                shortest_time: infoJson.user_info.shortest_time,
                count: infoJson.user_info.total_count,
                quality: infoJson.user_info.average_quality,
                sauce: infoJson.user_info.average_sauce,
                cheese: infoJson.user_info.average_cheese,
                topping: infoJson.user_info.average_topping
            })

            setGraphData(
                [
                    {
                        subject: 'Count', A: Math.floor(infoJson.user_info.count_standard), fullMark: 100,
                    },
                    {
                        subject: 'Quality', A: Math.floor(infoJson.user_info.completion_standard), fullMark: 100,
                    },
                    {
                        subject: 'Time', A: Math.floor(infoJson.user_info.time_standard), fullMark: 100,
                    },
                ]
            )
        }


    }


    const requestList = async () => {

        const info = await fetch(`${URL}/quest`, {
            method: "GET",
            headers: {
                Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxMzd9.vpQMWR9OlJiCXWe73hiGCHEXaKCVa35Loqm0_jNIkgU"
            }
        })

        const myScore = await fetch(`${URL}/quest/get-my-score`, {
            method: "POST",
            headers: {
                Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxMzd9.vpQMWR9OlJiCXWe73hiGCHEXaKCVa35Loqm0_jNIkgU"
            }
        })

        if (info.status === 200 && myScore.status === 200) {
            const infoJson = await info.json();
            const myScoreJson = await myScore.json();

            setquestList({
                questList: infoJson
            })

            setpizzaCount({
                myScoreJson
            })
        }

    }

    const requestPost = async (arg: _props) => {

        if (arg.status) {

            console.log(arg);

            fetchInfo();
            requestList();

        }
    }

    const renderSwitch = () => {
        switch (TabName) {
            case "time":
                return <MyRewardContTime />

            case "count":
                return <MyRewardContCount requestPost={requestPost} pizzaCount={pizzaCount} count={questList.questList} />

            case "quality":
                return <MyRewardContQuality />

            default:
                return <MyRewardContTime />
        }
    }

    return (
        <>
            <Header />
            <Banner title="REWARD SYSTEM" background="rgb(222, 222, 80)" navBackground="rgb(206, 208, 29)" />
            <SystemSection>
                <UserSection>
                    <MyInfo image={userInfo.image} name={userInfo.name} store={userInfo.store} badge={userInfo.badge} coupon={userInfo.coupon} />
                    <MyCal shortest_time={userScore.shortest_time} count={userScore.count} topping={userScore.topping} cheese={userScore.cheese} sauce={userScore.sauce} average_time={userScore.average_time} quality={userScore.quality} />
                    <MyGraph data={graphData} />
                </UserSection>
                <AwardSection>
                    <MyRewardTap TabClick={TabClick} />
                    <AwardBox>
                        {renderSwitch()}
                    </AwardBox>
                </AwardSection>
            </SystemSection>
        </>
    )
}

const SystemSection = styled.section`
    max-width: 1090px;
    margin: 20px auto;
    padding: 74px 15px 0;
`

const UserSection = styled.section`
  display:flex;
  justify-content:space-between;
  margin-bottom: 20px;

  >div {
    background-color: #f8f8f8;
    border-radius: 10px;
  }
`
const AwardSection = styled.article`
    padding: 30px;
    background-color: #f8f8f8;
    border-radius: 10px;
`

const AwardBox = styled.div`
`

export default System
