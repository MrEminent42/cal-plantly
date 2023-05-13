import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import fetchWeatherData from '../../api/getWeather';

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
            justifyContent: 'space-between',
        }}>
            <Chip sx={{ backgroundColor: 'red', flex: 1 }}>
                <img src={`https:${icon}`} alt="icon" />
            </Chip>
            <Chip sx={{ backgroundColor: 'red', flex: 1 }}>
                Points
            </Chip>
            <Chip sx={{ backgroundColor: 'red', flex: 1 }}>
                hi
            </Chip>
        </AppBar>
    )
}

export default TopBar

const Chip = styled(`div`)`
    background-color: #885cf7;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
`