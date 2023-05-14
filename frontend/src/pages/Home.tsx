import styled from '@emotion/styled'
import React from 'react'
import { Box } from '@mui/system'
import Map from '../components/Map/Map';
import Location from '../api/getLocation'
import ActionButton from '../components/ActionButton'; 

const Home = () => {

    return (
        <HomeDiv style={{
            flexGrow: 1,
            flexDirection: "column",
        }}>
            <Map />
        </HomeDiv>

    )
}

export default Home

const HomeDiv = styled(Box)(({ theme }) => ({
    display: 'flex',
    flex: 1,
}))