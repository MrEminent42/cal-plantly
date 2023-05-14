import styled from '@emotion/styled'
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system'
import PlantEntry from '../../components/PlantBook/PlantEntry';
import "./BookStyle.css";
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import PoppyPage from './PoppyPage';
import { useEffect, useState } from 'react'
import { PlantInfo, SpeciesInfo, getAllPlantSpecies, getPlants } from '../../api/plants';
import PlantPage from './PlantPage';
import VioletPage from './VioletPage';


const PlantBook = () => {

    const [plants, setPlants] = useState<SpeciesInfo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllPlantSpecies().then((plants) => {
            console.log(plants)
            setPlants(plants)
        }).catch(error => console.log)

    }, []);


    const showMainScreen = () => {
        return (
            <div className='main-box'>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {plants.map((plant, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <PlantEntry species={plant.Id} name={plant.Name}></PlantEntry>
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    }

    return (
        <HomeDiv style={{
            flexGrow: 1,
            flexDirection: 'column'
        }}>

            <div className="book-title"
                onClick={() => navigate("/game/book")}
            >Plant Book</div>

            <Routes>
                <Route path="/" element={showMainScreen()} />
                <Route path="/poppy" element={<PoppyPage />} />
                <Route path="/valerian" element={<PlantPage />} />
                <Route path="/violet" element={<VioletPage />} />
                <Route
                    path="*"
                    element={<Navigate to="/game/book" replace />}
                />
            </Routes>


        </HomeDiv>


    )
}

export default PlantBook

const HomeDiv = styled(Box)(() => ({
    display: 'flex',
    paddingBottom: '50px',
    flex: 1,
}))
