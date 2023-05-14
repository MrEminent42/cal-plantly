import styled from '@emotion/styled'
import { Box } from '@mui/system'
import TopBar from '../components/TopBar/TopBar'
import Map from '../components/Map/Map'

const Home = () => {

    return (

        <HomeDiv>
            <Box>
                <TopBar />
            </Box>

            <Map />

        </HomeDiv>

    )
}

export default Home

const HomeDiv = styled(Box)(({ theme }) => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
}))