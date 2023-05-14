import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { getAuth, signOut } from '@firebase/auth';
import fetchWeatherData from '../../api/getWeather';

import ActionButton from './ActionButton';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {

    const [icon, setIcon] = useState();
    const navigate = useNavigate();

    async function fetchData() {
        await fetchWeatherData(process.env.REACT_APP_WEATHER_API_KEY || '', '93410').then((iconData) => {
            setIcon(iconData);
        });
    }

    fetchData();

    return (
        <AppBar sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible',
            height: '75px',
        }}>
            <ActionButton />
            <SideChip>
                <img src={`https:${icon}`} alt="icon" />
            </SideChip>
            <Chip>
                <Typography
                    sx={{ textAlign: 'center', fontSize: '2.3rem' }}
                    onClick={() => navigate("/game")}
                >
                    Cal Plantly
                </Typography>
            </Chip>
            <SideChip>
                <Button
                    color="secondary"
                    onClick={() => signOut(getAuth())}
                >
                    LOG OUT
                </Button>
            </SideChip>
        </AppBar >
    )
}

export default TopBar

const Chip = styled(Box)(() => ({
    backgroundColor: 'transparent',
    borderRadius: '10px',
    margin: '10px',
    flex: 1,
}))

const SideChip = styled(Box)(() => ({
    backgroundColor: 'transparent',
    borderRadius: '10px',
    margin: '10px',
    flex: .1,
    textAlign: 'center',
}))

