import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { useParams } from 'react-router-dom'
import { PlantInfo as GardenPlantPage, getPlant, getPlants } from '../api/plants'

const GardenPlantPage = () => {
    const params = useParams();
    // if id is undefined or invalid, redirect to plant book

    const [plants, setPlants] = useState<GardenPlantPage | null>(null);

    useEffect(() => {
        if (params.id === undefined || params.id === null) return;
        // +params.id turns it into number
        getPlant(+params.id).then((plant) => {
            console.log(plant)
            setPlants(plant)
        }).catch(error => console.log)

    }, [])



    return (
        <FillDiv>

            PlantInfo
            <br />
            {params.id}

        </FillDiv>
    )
}

export default GardenPlantPage

const FillDiv = styled(Box)(() => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
}))