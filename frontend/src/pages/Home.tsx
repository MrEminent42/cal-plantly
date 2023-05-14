import styled from '@emotion/styled'
import React from 'react'
import { Box } from '@mui/system'
import ActionButton from '../components/ActionButton'
import TopBar from '../components/TopBar/TopBar'
import Map from '../components/Map/Map'
import Location from '../api/getLocation'
import ActionButton from '../components/ActionButton'; 

const Home = () => {

    return (

        <HomeDiv>
            <Box>
                <TopBar />
            </Box>

            <p>Welcome to Cal Plantly!</p>

            <Map />

            <ActionButton />

            home screen
        </HomeDiv>

    )
}

export default Home

const HomeDiv = styled(Box)(({ theme }) => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
}))