import styled from '@emotion/styled'
import { Box } from '@mui/system'
import "./BookStyle.css";


const PlantPage = () => {
    return (
        <HomeDiv style={{
            flexGrow: 1,
            flexDirection: 'column'
        }}>
            <div className='full-page'>
                
                <div className="book-title">Red Valerian</div>
                <div className='main'>
                    
                    <div className='leftside'>
                        <div className='plimage'>
                        <img src="/images/red valerian.png" height="500" />
                        </div>
                    </div>
                    
                    <div className='maincontainer'>
                    <div className='notes'>
                    Red Valerian<br />
                    ‣ Centranthus ruber<br />
                    ‣ Full sun<br />
                    ‣ 32 inches<br />
                    ‣ Sandy or rocky soil<br />
                    ‣ Fertilize once when planted<br />
                    <br />
                    Initially from the Mediterranian region, this perennial attracts both bees and butterflies.<br />
                    </div>
                    </div>
                </div>
            </div>
            
        </HomeDiv>
        

    )
}

export default PlantPage

const HomeDiv = styled(Box)(() => ({
    display: 'flex',
}))
