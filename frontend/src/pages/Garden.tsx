import { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Skeleton, Box, Slider, Button } from '@mui/material';
import { GardenInfo, getGarden, getGardens, getPlantsInGarden } from '../api/gardens';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PlantInfo, putWaterLevel } from '../api/plants';
import ShowerIcon from '@mui/icons-material/Shower';

const Garden = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  function handleClick(index: number): void {
    setSelected(index);
  }
  const [garden, setGarden] = useState<GardenInfo | null>(null);
  const [plants, setPlants] = useState<PlantInfo[]>([]);

  const plantImages = ["/images/California Poppy.png", "/images/red valerian.png", "/images/violet.png"];

  const updatePlants = () => {
    if (!params.id) return;
    // +params.id means convert into a number!? woah
    getGarden(+params.id).then((garden) => {
      setGarden(garden)

      getPlantsInGarden(+params.id!).then((plants) => {
        setPlants(plants)
      }).catch(error => console.log(error));

    }).catch(error => {
      navigate("/game");
      console.log(error)
    })
  }

  useEffect(() => {
    updatePlants();

  }, [])

  const waterPlants = async () => {
    // for each plant, water it
    plants.forEach((plant) => {
      putWaterLevel(plant.Id, plant.WaterLevel + 10)
    })

    await new Promise(resolve => setTimeout(resolve, 300));
    updatePlants();


  }

  if (params.id === undefined || params.id === null) {
    // redirect to game page
    return (
      <Navigate to="/game" replace />
    )

  }


  return (
    <Box sx={{
      padding: '10px'
    }}>
      <Box sx={{
        display: 'flex',
        position: 'relative'
      }}>
        <Box>
          <Typography variant="h3">Garden</Typography>
          {garden && <Typography variant="h4">{garden.Name}</Typography>}

        </Box>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <Button sx={{ backgroundColor: '#4287f5', color: 'white', width: "100%", maxWidth: '50vw' }}
            onClick={() => waterPlants()}
          >
            <ShowerIcon />
            WATER
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {Array.from(Array(16)).map((_, index) => (
          <Grid item xs={12} lg={3} key={index}>
            <Paper
              onClick={() => handleClick(index)}
              sx={{
                backgroundColor: plants[index] ? '' : 'lightgray',
                height: 100,
                cursor: 'pointer',
                alignItems: 'center'
              }}
            >
              {plants[index] && (<Box
                sx={{
                  padding: '10px',
                  display: 'flex',
                }}
              >
                <Box >
                  <img src={plantImages[index]} alt="plant" width="80" height="80" />
                </Box>

                {/* box for plant name */}
                <Box sx={{ flex: 1 }}>

                  <Typography>
                    {plants[index].Name}
                  </Typography>
                  <Typography>
                    {plants[index].Description}
                  </Typography>
                </Box>

                {/* box for water level */}
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                  <Typography sx={{ textAlign: 'center' }}>
                    water level:<br />
                    {plants[index].WaterLevel}
                  </Typography>

                  <Slider
                    aria-label="Temperature"
                    orientation="vertical"
                    valueLabelDisplay="auto"
                    value={plants[index].WaterLevel}
                  />
                </Box>
              </Box>)}
            </Paper>

          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Garden;
