import styled from '@emotion/styled'
import { Box } from '@mui/system'
import TopBar from '../components/TopBar/TopBar'
import Map from '../components/Map/Map'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PlantInfo from './PlantInfo'
import PlantBook from './PlantBook'

const Game = () => {

    return (

        <HomeDiv>
            <Box>
                <TopBar />
            </Box>

            <Routes>
                <Route path="/" element={<Map />} />
                <Route path="/plant/:id" element={<PlantInfo />} />
                <Route path="/book/*" element={<PlantBook />} />
                <Route
                    path="/plant"
                    element={<Navigate to="/game" replace />}
                />
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