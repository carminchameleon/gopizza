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
    is_achieved: boolean,
    buttonId: number
}

const System: React.SFC = () => {

    const [TabName, setTabName] = useState("");

    const [userInfo, setUserInfo] = useState({
        image: null,
        name: "",
        store: "",
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
        console.log("a");
    }

    const fetchInfo = async () => {

        const info = await fetch(`${URL}/user/info`, {
            method: "GET",
            headers: {
                Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxMzd9.vpQMWR9OlJiCXWe73hiGCHEXaKCVa35Loqm0_jNIkgU"
            }
        })

        if (info.status === 200) {
            const infoJson = await info.json();

            console.log(infoJson)

            setUserInfo({
                image: infoJson.user_info[0].name,
                name: infoJson.user_info[0].name,
                store: infoJson.user_info[0].store__name
            })

            setUserSocre({
                average_time: infoJson.average_time,
                shortest_time: infoJson.shortest_time,
                count: infoJson.count,
                quality: infoJson.quality,
                sauce: infoJson.sauce,
                cheese: infoJson.cheese,
                topping: infoJson.topping
            })

            setGraphData(
                [
                    {
                        subject: 'Count', A: infoJson.quality, fullMark: 100,
                    },
                    {
                        subject: 'Quality', A: 48, fullMark: 100,
                    },
                    {
                        subject: 'Time', A: 86, fullMark: 100,
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

            console.log(infoJson, myScoreJson)

            setquestList({
                questList: infoJson
            })

            setpizzaCount({
                myScoreJson
            })
        }

    }

    const requestPost = async (arg: _props) => {
        console.log(arg);

        console.log(arg, "내용이 있으면~~~~~~~ fetch 다시 불러오고~~~ 내용 다시 불러오기~~~")
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
            <Banner title="REWARD SYSTEM" />
            <SystemSection>
                <UserSection>
                    <MyInfo name={userInfo.name} store={userInfo.store} />
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
