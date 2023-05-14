import { useState } from 'react';
import { Grid, Paper } from '@mui/material';

const Plot = () => {
  const [selected, setSelected] = useState<number | null>(null);

  function handleClick(index: number): void {
    setSelected(index);
  }

  return (
    <main>
      <h1>Plot</h1>
      <Grid container spacing={2}>
        {Array.from(Array(16)).map((_, index) => (
          <Grid item xs={3} key={index}>
            <Paper
              onClick={() => handleClick(index)}
              sx={{
                height: 100,
                cursor: 'pointer',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Plot;
