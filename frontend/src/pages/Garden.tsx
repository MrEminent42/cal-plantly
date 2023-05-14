import { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Skeleton, Box } from '@mui/material';
import { getGarden, getGardens, getPlantsInGarden } from '../api/gardens';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PlantInfo } from '../api/plants';

const Garden = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);

  function handleClick(index: number): void {
    setSelected(index);
  }
  const [garden, setGarden] = useState();
  const [plants, setPlants] = useState<PlantInfo[]>([]);

  const plantImages = ["/images/dirtPoppyBloom.png", "/images/dirtValerianBloom.png", "/images/dirtVioletBloom.png"];

  useEffect(() => {
    if (!params.id) return;
    // +params.id means convert into a number!? woah
    getGarden(+params.id).then((garden) => {
      console.log(garden)
      setGarden(garden)

      getPlantsInGarden(+params.id!).then((plants) => {
        console.log(plants)
        setPlants(plants)
      }).catch(error => console.log(error));

    }).catch(error => {
      navigate("/game");
      console.log(error)
    })

  }, [])

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
      <Typography variant="h3">Garden</Typography>
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

                <Box>

                  <Typography>
                    {plants[index].Name}
                  </Typography>
                  <Typography>
                    {plants[index].Description}
                  </Typography>
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
