import Box from '@mui/material/Box/Box';
import Fade from '@mui/material/Fade';
import Skeleton from '@mui/material/Skeleton';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { AuthState, currentUserAtom } from '../jotai/authAtoms';
// import { firebaseAuth } from '../config/firebase';


export type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath: string;
    outlet: JSX.Element;
};

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

    if (currentUser === AuthState.LOADING) {
        return (
            <Fade in={true}
                style={{
                    transitionDelay: '800ms',
                }}
            >
                <Box sx={{ width: { xs: '100%', md: '600px' } }}>
                    <Box sx={{ px: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Skeleton variant="rectangular" height={'50px'} width={'80%'} sx={{ my: '15px', borderRadius: '20px' }} />
                        <Skeleton variant="rectangular" height={'130px'} width={'100%'} sx={{ my: '15px', borderRadius: '20px' }} />
                        <Skeleton variant="rectangular" height={'130px'} width={'100%'} sx={{ my: '15px', borderRadius: '20px' }} />
                        <Skeleton variant="rectangular" height={'130px'} width={'100%'} sx={{ my: '15px', borderRadius: '20px' }} />
                        <Skeleton variant="rectangular" height={'130px'} width={'100%'} sx={{ my: '15px', borderRadius: '20px' }} />
                    </Box >
                </Box>
            </Fade>
        )
    }


    else if (currentUser === AuthState.LOGGED_OUT) {
        return <Navigate to={{ pathname: "/login" }} />;
    } else {
        return children;
    }
};