import styled from '@emotion/styled'
import React from 'react'
import { Box } from '@mui/system'
import { useParams } from 'react-router-dom'

const PlantInfo = () => {
    const params = useParams();
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