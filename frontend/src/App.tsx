import { useState } from 'react';
import Home from './pages/Home';
import PlantBook from './pages/PlantBook';
import { ThemeProvider } from '@mui/material';
import theme from './config/config.theme';
import TopBar from './components/TopBar/TopBar';
import ActionButton from './components/ActionButton';
import Map from './components/Map/Map';

function App() {

  const [showBook, setShowBook] = useState(true);
  return (
    <div style={{
      border: '1px dotted blue',
      height: '99vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <ThemeProvider theme={theme}>

        <TopBar />

        <p>Welcome to Cal Plantly!</p>

        {
          showBook ? <PlantBook /> : <Home />
        }

        <ActionButton />
      </ThemeProvider>
    </div>
  );
}


export default App;
