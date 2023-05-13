import React from 'react';
import Home from './pages/Home';
import { ThemeProvider } from '@mui/material';
import theme from './config/config.theme';
import TopBar from './components/TopBar/TopBar';
import ActionButton from './components/ActionButton';
import Map from './components/Map/Map';

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <TopBar />

        <p>Welcome to Cal Plantly!</p>
        <Home />
        <Map />
        <ActionButton />
      </ThemeProvider>
    </div>
  );
}


export default App;
