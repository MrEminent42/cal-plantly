import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Box } from '@mui/system'

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../jotai/authAtoms';
import { Backdrop, Button, Card, CircularProgress, Fade, Typography } from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';


const Login = () => {
    const navigate = useNavigate();
    const [, setCurrentUser] = useAtom(currentUserAtom);

    const [, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const signInWithGoogle = () => {

        const provider = new GoogleAuthProvider();
        setSubmitted(true);
        setLoading(true);

        signInWithPopup(getAuth(), provider).then((result) => {
            // initialize();
            setLoading(false);
            navigate("/game");
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            setLoading(false);
            setSubmitted(false);
            alert(error.message);
        })
    }


    const renderSignIn = () => {
        return (
            <Box sx={{ width: { xs: '100%', md: '600px' }}}>
                <Fade in>
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,

                        // bottom: '30rem',
                        // right: '30vw',
                        // left: '30vw',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <h1>Cal Plantly</h1>

                        <Button onClick={signInWithGoogle} variant="contained" color="secondary" >
                            <GoogleIcon sx={{ mr: '1rem' }} />
                            Sign in with Google
                        </Button>

                    </Box>



                </Fade>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="secondary" />
                </Backdrop>
            </Box >
        )
    }

    return renderSignIn();

    // return (
    //     <HomeDiv style={{
    //         flexGrow: 1,
    //     }}>

    //         log in here

    //     </HomeDiv>
    // )
}

export default Login

const HomeDiv = styled(Box)(({ theme }) => ({
    display: 'flex',
    border: '1px solid red',
    flex: 1,
}))