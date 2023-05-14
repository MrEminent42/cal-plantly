import { Request, Response } from "express";
import Plant from "../schemas/plant";
const express = require("express");
const router = express.Router();
const sql = require("mssql");
import dbConfig from "../dbConfig";

//get all plants
router.get('/api/plants', async (req: Request, res: Response) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`SELECT * FROM Plants`);
    const plants = result.recordset;
    res.json(plants);
  } catch (error) {
    console.error('Error retrieving plants:', error);
    res.status(500).json({ message: 'Error retrieving plants' });
  }
});

// get plant by id
router.get("/api/plants/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`SELECT * FROM Plants WHERE Id = ${id}`);
    const plant = result.recordset[0];
    if (plant) {
      res.json(plant);
    } else {
      res.status(404).json({ message: "Plant not found" });
    }
  } catch (error) {
    console.error('Error retrieving plant:', error);
    res.status(500).json({ message: 'Error retrieving plant' });
  }
});

// get all species
router.get("/api/species", async (req: Request, res: Response) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`SELECT * FROM Species`);
    const species = result.recordset;
    res.json(species);
  } catch (error) {
    console.error('Error retrieving species:', error);
    res.status(500).json({ message: 'Error retrieving species' });
  }
});

// get plant by species id
router.get("/api/plants/species/:speciesId", async (req: Request, res: Response) => {
  try {
    const { speciesId } = req.params;
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`SELECT * FROM Plants WHERE SpeciesId = ${speciesId}`);
    const plants = result.recordset;
    if (plants.length > 0) {
      res.json(plants);
    } else {
      res.status(404).json({ message: "No plants found for the specified species" });
    }
  } catch (error) {
    console.error('Error retrieving plants:', error);
    res.status(500).json({ message: 'Error retrieving plants' });
  }
});

// create a new plant
router.post("/api/plants", async (req: Request, res: Response) => {
  const { Id, SpeciesId, Growth, WaterLevel, Lat, Long, Description } = req.body;
  if (!Id || !SpeciesId || !Growth || !WaterLevel || !Lat || !Long || !Description) {
    return res.status(400).json({ message: 'Incomplete data' });
  }

  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input('Id', sql.Int, Id)
      .input('SpeciesId', sql.Int, SpeciesId)
      .input('Growth', sql.Int, Growth)
      .input('WaterLevel', sql.Int, WaterLevel)
      .input('Lat', sql.Decimal(9, 6), Lat)
      .input('Long', sql.Decimal(9, 6), Long)
      .input('Description', sql.VarChar(2000), Description)
      .query(
        'INSERT INTO Plants (Id, SpeciesId, Growth, WaterLevel, Lat, Long, Description) VALUES (@Id, @SpeciesId, @Growth, @WaterLevel, @Lat, @Long, @Description)'
      );

    res.status(201).json({ message: 'Plant created successfully' });
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).json({ message: 'Error creating plant' });
  }
});

// update WaterLevel of plant
router.put("/api/plants/:id/water-level", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { waterLevel } = req.body;

    if (!waterLevel) {
      return res.status(400).json({ message: 'Incomplete data' });
    }

    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input('Id', sql.Int, id)
      .input('WaterLevel', sql.Int, waterLevel)
      .query('UPDATE Plants SET WaterLevel = @WaterLevel WHERE Id = @Id');

    res.status(200).json({ message: 'WaterLevel updated successfully' });
  } catch (error) {
    console.error('Error updating WaterLevel:', error);
    res.status(500).json({ message: 'Error updating WaterLevel' });
  }
});


export { };
module.exports = router;
