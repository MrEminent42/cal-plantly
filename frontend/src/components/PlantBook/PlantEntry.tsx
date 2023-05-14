import styled from '@emotion/styled'
import { Box } from '@mui/system'
import "../../pages/plantbook/BookStyle.css";


const PlantEntry = (props: { id: number }) => {
    return (
        <HomeDiv style={{
            flexGrow: 1,
        }}>
            <div className="book-subtitle">????</div>
        </HomeDiv>


    )
}

export default PlantEntry

const HomeDiv = styled(Box)(() => ({
    display: 'flex',
    border: '1px solid grey',
    background: 'linear-gradient(to bottom right, #FBBAA6, #FBBAA6)',
    flex: 1,
}))