import styled from '@emotion/styled'
import { Box } from '@mui/system'
import "./BookStyle.css";


const PoppyPage = () => {
    return (
        <HomeDiv style={{
            flexGrow: 1,
            flexDirection: 'column'
        }}>
            <div className='full-page'>
                
                <div className="book-title">California Poppy</div>
                <div className='main'>
                    
                    <div className='leftside'>
                        <div className='plimage'>
                        <img src="/images/California Poppy.png" height="500" />
                        </div>
                    </div>
                    
                    <div className='maincontainer'>
                    <div className='notes'>
                    California Poppy<br />
                    ‣ Eschscholzia californica<br />
                    ‣ Full sun<br />
                    ‣ 6 to 12 inches<br />
                    ‣ Sandy or rocky soil<br />
                    ‣ No fertilizer<br />
                    <br />
                    California Poppies are hardly flowers that grow in dry environments. The flowers close during night or on overcast or windy days.<br />
                    </div>
                    </div>
                </div>
            </div>
            
        </HomeDiv>
        

    )
}

export default PoppyPage

const HomeDiv = styled(Box)(() => ({
    display: 'flex',
}))
