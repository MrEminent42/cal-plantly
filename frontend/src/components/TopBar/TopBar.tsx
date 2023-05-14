import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import fetchWeatherData from '../../api/getWeather';

import ActionButton from '../ActionButton'; 

const TopBar = () => {

    const [icon, setIcon] = useState();

    async function fetchData(){
        await fetchWeatherData(process.env.REACT_APP_WEATHER_API_KEY || '', '93410').then((iconData) => {
            setIcon(iconData);
        });
    }

    fetchData();

    return (
        <AppBar position="static" sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
             alignItems: 'center',
            overflow: 'visible'
        }}>
            <Chip sx={{ flex: 1 }}>
                <ActionButton/>
            </Chip>
            <Chip sx={{ position:'absolute' }}>
                <h1>Cal Plantly</h1>
            </Chip>
            <Chip>
            <img src={`https:${icon}`} alt="icon" />
            </Chip>
        </AppBar >
    )
}

export default TopBar

const Chip = styled(`div`)`
    background-color: transparent;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
`