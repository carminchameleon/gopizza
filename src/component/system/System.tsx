import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Status from "./Component/Status"
import MyCal from "./Component/MyCal"
import MyGraph from "./Component/MyGraph"
import MyInfo from "./Component/MyInfo"
import MyRewardContTime from "./Component/MyRewardContTime"
import MyRewardContCount from "./Component/MyRewardContCount"
import MyRewardContQuality from "./Component/MyRewardContQuality"
import MyRewardTap from "./Component/MyRewardTap"


const System: React.SFC = () => {

    const [TabName, setTabName] = React.useState("");

    const TabClick = (arg: string) => {
        setTabName(arg);
    }

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

    useEffect(() => {
        fetchInfo();

    }, [])

    const fetchInfo = async () => {

        const info = await fetch("http://localhost:3000/data/userInfo.json")

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

    }

    const renderSwitch = () => {
        switch (TabName) {
            case "time":
                return <MyRewardContTime />

            case "count":
                return <MyRewardContCount />

            case "quality":
                return <MyRewardContQuality />

            default:
                return <MyRewardContTime />
        }
    }

    return (
        <Systemdiv>
            <Status />
            <section>
                <MyInfo name={userInfo.name} store={userInfo.store} />
                <MyCal shortest_time={userScore.shortest_time} count={userScore.count} topping={userScore.topping} cheese={userScore.cheese} sauce={userScore.sauce} average_time={userScore.average_time} quality={userScore.quality} />
                <MyGraph />
            </section>
            <article>
                <MyRewardTap TabClick={TabClick} />
                <div>
                    {renderSwitch()}
                </div>
            </article>
        </Systemdiv>
    )
}

const Systemdiv = styled.section``

export default System
