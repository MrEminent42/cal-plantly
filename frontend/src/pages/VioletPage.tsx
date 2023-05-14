import styled from '@emotion/styled'
import { Box } from '@mui/system'
import "./BookStyle.css";


const VioletPage = () => {
    return (
        <HomeDiv style={{
            flexGrow: 1,
            flexDirection: 'column'
        }}>
            <div className='full-page'>
                
                <div className="book-title">Sweet Violet</div>
                <div className='main'>
                    
                    <div className='leftside'>
                        <div className='plimage'>
                        <img src="/images/violet.png" height="500" />
                        </div>
                    </div>
                    
                    <div className='maincontainer'>
                    <div className='notes'>
                    Sweet Violet<br />
                    ‣ Viola odorata<br />
                    ‣ Partial sun, shade<br />
                    ‣ 4 to 6 inches<br />
                    ‣ Moist, rich soil<br />
                    ‣ Fertilize with mulch<br />
                    <br />
                    Sweet violets are aromatic flowers that have often been used in perfumes and as a syrup in French cooking.<br />
                    </div>
                    </div>
                </div>
            </div>
            
        </HomeDiv>
        

    )
}

export default VioletPage

const HomeDiv = styled(Box)(() => ({
    display: 'flex',
}))
