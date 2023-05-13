import styled from '@emotion/styled'
import React from 'react'
import { Box } from '@mui/system'
import Map from '../components/Map/Map';

const Home = () => {
    return (
        <HomeDiv style={{
            flexGrow: 1,
            flexDirection: "column",
        }}>
        
            home screen
            <Map />
        </HomeDiv>
    )
}

export default Home

const HomeDiv = styled(Box)(({ theme }) => ({
    display: 'flex',
    border: '1px solid red',
    flex: 1,
}))