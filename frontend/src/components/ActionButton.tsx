
import { Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import Grow from '@mui/material/Grow';


//icons
import Person3Icon from '@mui/icons-material/Person3';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const ActionButton = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    var thing = process.env.REACT_APP_HELLO;

    return (
        <Box
            sx={{
                position: 'absolute', right: '000px', top: '45px',
            }}
        >
            <Box sx={{
                // backgroundColor: 'aqua',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
            }}>


                <Fab
                    color='secondary'
                    disabled={false}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <AddIcon />
                </Fab>
            </Box>
            <Box sx={{

                borderColor: 'red',
                borderWidth: 5,
                // backgroundColor: 'aqua',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
            }}>
                <Grow in={menuOpen}>
                    <Fab size="small">
                        <EmojiEventsIcon />
                    </Fab>
                </Grow>


                <Grow in={menuOpen}>
                    <Fab size="small" >
                        <Person3Icon />
                    </Fab>
                </Grow>

                <Grow in={menuOpen} >
                    <Fab size="small">
                        <LibraryBooksIcon />
                    </Fab>
                </Grow>

                <Grow in={menuOpen}>
                    <Fab size="small">
                        <BusinessCenterIcon />
                    </Fab>
                </Grow>
            </Box>
        </Box>


    )
}

export default ActionButton