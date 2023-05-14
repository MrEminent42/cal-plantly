import { Request, Response } from 'express';
import Garden from '../schemas/garden';
const express = require('express');
const router = express.Router();

//temporary array of garden objects
const gardens: Garden[] = [
  {
    id: 1,
    name: 'Baker',
    plants: [
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
    ],
    latitude: 37.123,
    longitude: 32.444,
    radius: 10,
  },
];

//get all gardens
router.get('/api/gardens', (req: Request, res: Response) => {
  res.json(gardens);
});

//get garden by id
router.get('/api/gardens/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const garden = gardens.find((g) => g.id === parseInt(id, 10));

  if (garden) {
    res.json(garden);
  } else {
    res.status(404).json({ message: 'Garden not found' });
  }
});

//get garden by name
router.get('/api/gardens/name/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const garden = gardens.find((g) => g.name === name);
    if (garden) {
      res.json(garden);
    } else {
      res.status(404).json({ message: 'Garden not found' });
    }
  });

//get plants in a garden
router.get('/api/gardens/:id/plants', (req: Request, res: Response) => {
  const { id } = req.params;
  const garden = gardens.find((g) => g.id === parseInt(id, 10));
  if (garden) {
    res.json(garden.plants);
  } else {
    res.status(404).json({ message: 'Garden not found' });
  }
});

//create a new garden
router.post('/api/gardens', (req: Request, res: Response) => {
  const { id, name, plants, latitude, longitude, radius } = req.body;
  if (!id || !name || !plants || !latitude || !longitude || !radius) {
    return res.status(400).json({ message: 'Incomplete data' });
  }
  const newGarden: Garden = { id, name, plants, latitude, longitude, radius };
  gardens.push(newGarden);
  res.status(201).json(newGarden);
});


export {};
module.exports = router;