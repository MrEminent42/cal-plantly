import Box from '@mui/material/Box/Box';
import Fade from '@mui/material/Fade';
import Skeleton from '@mui/material/Skeleton';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { AuthState, currentUserAtom } from '../jotai/authAtoms';
import { Typography } from '@mui/material';
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
                <Typography>Loading ;)</Typography>
            </Fade>
        )
    }


    else if (currentUser === AuthState.LOGGED_OUT) {
        return <Navigate to={{ pathname: "/login" }} />;
    } else {
        return children;
    }
};