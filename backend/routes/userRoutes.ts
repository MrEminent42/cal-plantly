import { Request, Response } from 'express';
import User from '../schemas/user';
const express = require('express');
const router = express.Router();

//temporary array of user objects
const users: User[] = [
  {
    id: 1,
    name: 'James',
    points: 12,
    inventory: [
      {
        id: 1,
        type: 'Seed',
        name: 'Sunflower Seed',
        amount: 1,
        owner: "joe",
      },
      {
        id: 2,
        type: 'Seed',
        name: 'Rose Seed',
        amount: 3,
        owner: "None"
      },
    ],
  },
];

//get all users
router.get('/api/users', (req: Request, res: Response) => {
  res.json(users);
});

//get user by id
router.get('/api/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id, 10));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

//get user by name
router.get('/api/users/name/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  const user = users.find((u) => u.name === name);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export {};
module.exports = router;
