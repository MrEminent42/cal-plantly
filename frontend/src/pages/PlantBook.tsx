import styled from '@emotion/styled'
import React from 'react'
import { Box } from '@mui/system'

const Home = () => {
    return (
        <HomeDiv style={{
            flexGrow: 1,
            flexDirection: 'column'
        }}>

            PlantBook

        </HomeDiv>
    )
}

export default Home

const HomeDiv = styled(Box)(() => ({
    display: 'flex',
    border: '1px solid red',
    flex: 1,
}))