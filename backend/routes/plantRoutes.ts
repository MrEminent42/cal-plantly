import { Request, Response } from 'express';
import Plant from '../schemas/plant';
const express = require('express');
const router = express.Router();

//temporary array of plant objects
const plants: Plant[] = [
    {
      id: 1,
      name: 'Cactus',
      state: 'Healthy',
      latitude: 123.456,
      longitude: 789.012,
      description: 'A spiky desert plant.',
    },
    {
      id: 2,
      name: 'Rose',
      state: 'Needs Water',
      latitude: 456.789,
      longitude: 901.234,
      description: 'Red Color',
    },
    {
      id: 3,
      name: 'Sunflower',
      state: 'Wilted',
      latitude: 423.322,
      longitude: 421.886,
      description: 'looks at the sun'
    },
  ];
router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Cal-Plantly API!');
  });

//get all plants
router.get('/api/plants', (req: Request, res: Response) => {
  res.json(plants);
});

//get plant by ID
router.get('/api/plants/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const plant = plants.find((p) => p.id === parseInt(id, 10));
  if (plant) {
    res.json(plant);
  } else {
    res.status(404).json({ message: 'Plant not found' });
  }
});

//get plant by name
router.get('/api/plants/name/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  const plant = plants.find((p) => p.name === name);
  if (plant) {
    res.json(plant);
  } else {
    res.status(404).json({ message: 'Plant not found' });
  }
});

export {};
module.exports = router;
