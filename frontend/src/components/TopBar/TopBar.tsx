import React from 'react'
import { styled } from '@mui/system';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

const TopBar = () => {
    return (
        <AppBar position="static" sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <Chip sx={{ backgroundColor: 'red', flex: 1 }}>
                Weather
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