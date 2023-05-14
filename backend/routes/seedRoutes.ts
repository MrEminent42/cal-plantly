import { Request, Response } from "express";
import Seed from "../schemas/seed";
const express = require("express");
const router = express.Router();

//temporary array of seed objects
const seeds: Seed[] = [
  {
    id: 1,
    name: "Sunflower Seed",
    type: "Seed",
    amount: 10,
    owner: "Jane",
  },
  {
    id: 2,
    name: "Rose Seed",
    type: "Seed",
    amount: 5,
    owner: "Josh",
  },
];

//get all seeds
router.get("/api/seeds", (req: Request, res: Response) => {
  res.json(seeds);
});

//get seed by id
router.get("/api/seeds/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const seed = seeds.find((s) => s.id === parseInt(id, 10));
  if (seed) {
    res.json(seed);
  } else {
    res.status(404).json({ message: "Seed not found" });
  }
});

//get seed by name
router.get("/api/seeds/name/:name", (req: Request, res: Response) => {
  const { name } = req.params;
  const seed = seeds.find((s) => s.name === name);
  if (seed) {
    res.json(seed);
  } else {
    res.status(404).json({ message: "Seed not found" });
  }
});

//create a new seed
router.post("/api/seeds", (req: Request, res: Response) => {
  const { id, name, type, amount, owner } = req.body;
  if (!id || !name || !type || !amount || !owner) {
    return res.status(400).json({ message: "Incomplete data" });
  }
  const newSeed: Seed = { id, name, type, amount, owner };
  seeds.push(newSeed);
  res.status(201).json(newSeed);
});

export {};
module.exports = router;
