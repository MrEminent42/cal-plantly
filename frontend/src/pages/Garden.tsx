import { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Skeleton } from '@mui/material';
import { getGarden, getGardens, getPlantsInGarden } from '../api/gardens';
import { Navigate, useParams } from 'react-router-dom';
import { PlantInfo } from '../api/plants';

const Garden = () => {
  const params = useParams();
  const [selected, setSelected] = useState<number | null>(null);

  function handleClick(index: number): void {
    setSelected(index);
  }
  const [garden, setGarden] = useState();
  const [plants, setPlants] = useState<PlantInfo[]>([]);

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

    }).catch(error => console.log(error))

  }, [])

  if (params.id === undefined || params.id === null) {
    // redirect to game page
    return (
      <Navigate to="/game" replace />
    )

  }


  return (
    <main>
      <h1>Garden</h1>
      <Grid container spacing={2}>
        {Array.from(Array(16)).map((_, index) => (
          <Grid item xs={3} key={index}>
            <Paper
              onClick={() => handleClick(index)}
              sx={{
                backgroundColor: plants[index] ? '' : 'lightgray',
                height: 100,
                cursor: 'pointer',
                alignItems: 'center'
              }}
            >
              <Typography>
                {plants ? (

                  plants[index] ? plants[index].Description : ""
                ) : (
                  <Skeleton variant='text' />
                )}
              </Typography>
            </Paper>

          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Garden;
