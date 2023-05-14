import styled from '@emotion/styled'
import { Box } from '@mui/system'
import "../../pages/BookStyle.css";
import { useNavigate } from 'react-router-dom';


const PlantEntry = (props: { id: number }) => {
    const navigate = useNavigate();
    return (
        <HomeDiv style={{
            flexGrow: 1,
        }}
            onClick={() => {
                navigate(props.id.toString());
            }}
        >
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