import { useState } from 'react';
import Home from './pages/Home';
import PlantBook from './pages/PlantBook';
import { ThemeProvider } from '@mui/material';
import theme from './config/config.theme';
import TopBar from './components/TopBar/TopBar';
import Map from './components/Map/Map';
import ActionButton from './components/ActionButton'; 


function App() {

  const [showBook, setShowBook] = useState(false);
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <ThemeProvider theme={theme}>

        <TopBar />

        {
          showBook ? <PlantBook /> : <Home />
        }
      </ThemeProvider>
      
    </div>
  );
}


export default App;
