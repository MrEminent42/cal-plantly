import styled from '@emotion/styled'
import React from 'react'
import { Box } from '@mui/system'

const PlantInfo = () => {
    return (
        <FillDiv>

            PlantInfo

        </FillDiv>
    )
}

export default PlantInfo

const FillDiv = styled(Box)(() => ({
    display: 'flex',
    border: '1px solid red',
    flex: 1,
    flexDirection: 'column',
}))