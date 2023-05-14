import { useState } from 'react';
import Game from './pages/Game';
import PlantBook from './pages/PlantBook';
import { ThemeProvider } from '@mui/material';
import theme from './config/config.theme';

import { useAtom } from 'jotai/react';

import { onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { AuthState, currentUserAtom } from './jotai/authAtoms';


import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';


function App() {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const setupFirebase = () => {
    // Import the functions you need from the SDKs you need
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };

    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);
    const firebaseAuth = getAuth();

    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setCurrentUser(user)

      } else {
        setCurrentUser(AuthState.LOGGED_OUT)
      }
    });

  }

  setupFirebase();

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <ThemeProvider theme={theme}>

        <BrowserRouter>
          <Routes>
            <Route path="/game/*" element={<ProtectedRoute><Game /></ProtectedRoute>} />
            <Route path="/plantbook" element={<ProtectedRoute><PlantBook /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={<Navigate to="/game" replace />}
            />
          </Routes>
        </BrowserRouter>

      </ThemeProvider>

    </div>
  );
}


export default App;
