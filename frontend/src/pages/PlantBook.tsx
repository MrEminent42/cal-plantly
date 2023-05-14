import styled from '@emotion/styled'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system'
import PlantEntry from '../components/PlantBook/PlantEntry';
import "./BookStyle.css";


const PlantBook = () => {
    return (
        <HomeDiv style={{
            flexGrow: 1,
            flexDirection: 'column'
        }}>

            <div className="book-title">Plant Book</div>
            
            <div className='main-box'>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(3)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <PlantEntry id = {index}></PlantEntry>
                    </Grid>
                ))}
                </Grid>
            </div>
            
        </HomeDiv>
        

    )
}

export default PlantBook

const HomeDiv = styled(Box)(() => ({
    display: 'flex',
    paddingBottom: '50px',
    flex: 1,
}))
