import styled from '@emotion/styled'
import { Box } from '@mui/system'
import TopBar from '../components/TopBar/TopBar'
import Map from '../components/Map/Map'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PlantInfo from './PlantInfo'

const Game = () => {

    return (

        <HomeDiv>
            <Box>
                <TopBar />
            </Box>

            <Routes>
                <Route path="/" element={<Map />} />
                <Route path="/plant" element={<PlantInfo />} />
            </Routes>

        </HomeDiv>

    )
}

export default Game

const HomeDiv = styled(Box)(({ theme }) => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
}))