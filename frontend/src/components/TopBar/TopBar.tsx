import React from 'react'
import { styled } from '@mui/system';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { getAuth, signOut } from '@firebase/auth';

const TopBar = () => {
    return (
        <AppBar position="static"
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                background: 'linear-gradient(to bottom, rgb(237, 229, 128), rgba(237, 229, 128, 0.1))',
                paddingBottom: '10px',
            }}>
            <Chip sx={{ flex: 1 }}>
                Weather
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