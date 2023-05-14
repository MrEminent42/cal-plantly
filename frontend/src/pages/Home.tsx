import styled from '@emotion/styled'
import React from 'react'
import { Box } from '@mui/system'
import ActionButton from '../components/ActionButton'
import TopBar from '../components/TopBar/TopBar'

const Home = () => {
    return (

        <HomeDiv>
            <Box>
                <TopBar />
            </Box>

            <p>Welcome to Cal Plantly!</p>


            <ActionButton />

            home screen

        </HomeDiv>
    )
}

export default Home

const HomeDiv = styled(Box)(({ theme }) => ({
    display: 'flex',
    border: '1px solid red',
    flex: 1,
    flexDirection: 'column'
}))