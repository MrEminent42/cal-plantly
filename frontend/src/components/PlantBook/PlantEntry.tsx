import styled from '@emotion/styled'
import { Box } from '@mui/system'
import "../../pages/plantbook/BookStyle.css";
import { useNavigate } from 'react-router-dom';


const PlantEntry = ({ id, name }: { id: number, name: string }) => {
    const navigate = useNavigate();
    const FlowerPageMapping = ["poppy", "valerian", "violet"]
    return (
        <HomeDiv style={{
            flexGrow: 1,
        }}
            onClick={() => {
                if (id >= FlowerPageMapping.length) {
                    return;
                }
                navigate(FlowerPageMapping[id]);
            }}
        >
            <div className="book-subtitle">{name}</div>
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