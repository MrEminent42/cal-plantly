import styled from '@emotion/styled'
import React from 'react'
import { Box } from '@mui/system'

const Plot = () => {
    return (
        <HomeDiv style={{
            flexGrow: 1,
        }}>

            Plot

        </HomeDiv>
    )
}

export default Plot

const HomeDiv = styled(Box)(() => ({
    display: 'flex',
    border: '1px solid red',
    flex: 1,
}))