import styled from '@emotion/styled'
import React, { useEffect } from 'react'
import { Box } from '@mui/system'
import { useParams } from 'react-router-dom'
import { getPlants } from '../api/plants'

const PlantInfo = () => {
    const params = useParams();
    // if id is undefined or invalid, redirect to plant book

    const [plants, setPlants] = React.useState([]);

    useEffect(() => {
        getPlants().then((plants) => {
            console.log(plants)
            setPlants(plants)
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

export default PlantInfo

const FillDiv = styled(Box)(() => ({
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
}))