import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SYSTEMURL } from 'config';
import Header from "../../shared/Header"
import Banner from "../../shared/Banner"
import MyCal from "./Component/MyCal"
import MyGraph from "./Component/MyGraph"
import MyInfo from "./Component/MyInfo"
import MyRewardContTime from "./Component/MyRewardContTime"
import MyRewardContCount from "./Component/MyRewardContCount"
import MyRewardContQuality from "./Component/MyRewardContQuality"
import MyRewardTap from "./Component/MyRewardTap"


const System: React.SFC = () => {

    const [TabName, setTabName] = useState("");

    const [userInfo, setUserInfo] = useState({
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

    useEffect(() => {
        fetchInfo();
        requestList();

    }, [])

    const TabClick = (arg: string) => {
        setTabName(arg);
    }

    const fetchInfo = async () => {

        const info = await fetch("http://localhost:3000/Data/userInfo.json")

        const infoJson = await info.json();

        setUserInfo({
            name: infoJson.name,
            store: infoJson.store
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


    const requestList = async () => {

        const info = await fetch(`${SYSTEMURL}/quest`, {
            method: "GET",
            headers: {
                Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxMzd9.vpQMWR9OlJiCXWe73hiGCHEXaKCVa35Loqm0_jNIkgU"
            }
        })

        const infoJson = await info.json();

        setquestList({
            questList: infoJson
        })

        console.log(infoJson);
    }

    const requestPost = async () => {
        console.log("a");

        const loginCheck = await fetch(`${SYSTEMURL}/Data/requestList.json`, {
            method: "POST",
            body: JSON.stringify({
                is_claimed: true,
                quest_id: 1
            })
        });

        if (loginCheck.status === 404) {
            console.log("a");
        }
    }

    const renderSwitch = () => {
        switch (TabName) {
            case "time":
                return <MyRewardContTime />

            case "count":
                return <MyRewardContCount count={questList.questList} />

            case "quality":
                return <MyRewardContQuality />

            default:
                return <MyRewardContCount count={questList.questList} />
        }
    }

    return (
        <>
            <Header />
            <Banner />
            <SystemSection>
                <UserSection>
                    <MyInfo name={userInfo.name} store={userInfo.store} />
                    <MyCal shortest_time={userScore.shortest_time} count={userScore.count} topping={userScore.topping} cheese={userScore.cheese} sauce={userScore.sauce} average_time={userScore.average_time} quality={userScore.quality} />
                    <MyGraph data={graphData} />
                </UserSection>
                <AwardSection>
                    <MyRewardTap TabClick={TabClick} />
                    <div>
                        {renderSwitch()}
                    </div>
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
    margin-left: 20px;
    background-color: #f8f8f8;
    border-radius: 10px;
  }

  >div:first-child {
      margin-left: 0;
  }
`
const AwardSection = styled.article`
    background-color: #f8f8f8;
    border-radius: 10px;
`

export default System
