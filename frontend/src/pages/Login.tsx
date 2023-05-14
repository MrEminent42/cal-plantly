import styled from '@emotion/styled'
import React, { useState } from 'react'
import { Box } from '@mui/system'

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { currentUserAtom } from '../jotai/authAtoms';
import { Backdrop, Button, Card, CircularProgress, Fade, Typography } from '@mui/material';

import GoogleIcon from '@mui/icons-material/Google';
import "./LoginStyle.css";


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

                        <div className='full-page'>
                            <div className='card'>
                            <div className='title'>Cal Plantly</div>
                            <div className='button-section'>
                                <Button onClick={signInWithGoogle} variant="contained" color="secondary" >
                                    <GoogleIcon sx={{ mr: '1rem' }} />
                                    Sign in with Google
                                </Button>
                            </div>
                            </div>
                        </div>
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