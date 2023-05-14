import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { getAuth, signOut } from '@firebase/auth';
import fetchWeatherData from '../../api/getWeather';

const TopBar = () => {

    const [icon, setIcon] = useState();

    async function fetchData() {
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
            <Chip sx={{ flex: 1 }}>
                Points
            </Chip>
            <Chip sx={{ flex: 1 }}>
                hi
            </Chip>
            <Chip sx={{ flex: 1 }}>
                <Button
                    onClick={() => signOut(getAuth())}
                >
                    LOG OUT
                </Button>
            </Chip>
        </AppBar >
    )
}

export default TopBar

const Chip = styled(Typography)`
    background-color: #a4af69;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
`