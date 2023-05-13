
import { IconButton, Typography, Box } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Menu, { MenuProps } from '@mui/material/Menu';
import { useState } from 'react';

const ActionButton = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <Box
            sx={{ backgroundColor: 'red' }}
        >

            <Fab
                disabled={false}
                onClick={() => setMenuOpen(!menuOpen)}
                sx={{
                    position: 'absolute',
                    bottom: 30,
                    right: 30,
                }}>
                <AddIcon />


            </Fab>

            <Menu
                sx={{
                    position: 'absolute',
                    bottom: 100,
                    right: 30,
                }}
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            >
                <Typography>Plant</Typography>
            </Menu>
        </Box>
    )
}

export default ActionButton