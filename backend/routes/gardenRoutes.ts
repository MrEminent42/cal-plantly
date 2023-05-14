import { Request, Response } from "express";
import Garden from "../schemas/garden";
const express = require("express");
const router = express.Router();
const sql = require("mssql");
import dbConfig from "../dbConfig";
import { type } from "os";

//get all gardens
router.get("/api/gardens", async (req: Request, res: Response) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM Gardens");
    const gardens = result.recordset;
    res.json(gardens);
  } catch (error) {
    console.error("Error retrieving gardens:", error);
    res.status(500).json({ message: "Error retrieving gardens" });
  }
});

//get garden collections
router.get("/api/garden_collection", async (req: Request, res: Response) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM Gardens");
    const gardens: any[] = result.recordset;

    let featureCollections: Feature[] = [];
    gardens.forEach((garden) => {
      const feature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [garden.Long, garden.Lat],
        },
      };
      featureCollections.push(feature);
    });
    res.json({
      type: 'FeatureCollection',
      features: featureCollections
    });
  } catch (error) {
    console.error("Error retrieving garden collection:", error);
    res.status(500).json({ message: "Error retrieving garden collection" });
  }
});

//get garden by id
router.get("/api/gardens/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Gardens WHERE Id = @id");

    const garden = result.recordset[0];
    if (garden) {
      res.json(garden);
    } else {
      res.status(404).json({ message: "Garden not found" });
    }
  } catch (error) {
    console.error("Error retrieving garden:", error);
    res.status(500).json({ message: "Error retrieving garden" });
  }
});

//get garden by name
router.get("/api/gardens/name/:name", async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("name", sql.VarChar(255), name)
      .query("SELECT * FROM Gardens WHERE Name = @name");

    const gardens = result.recordset;
    if (gardens.length > 0) {
      res.json(gardens);
    } else {
      res.status(404).json({ message: "Gardens not found" });
    }
  } catch (error) {
    console.error("Error retrieving gardens:", error);
    res.status(500).json({ message: "Error retrieving gardens" });
  }
});

//get plants in a garden
router.get("/api/gardens/:id/plants", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().input("GardenId", sql.Int, id).query(`
      SELECT Plants.Id, Growth, WaterLevel, 
      Description, Name, WaterLow, WaterHigh,
      LossRate
      FROM Plantings
      INNER JOIN Plants ON Plantings.PlantId = Plants.Id
      INNER JOIN Species ON Plants.SpeciesId = Species.Id
      WHERE Plantings.GardenId = @GardenId
      `);

    const plants = result.recordset;
    res.json(plants);
  } catch (error) {
    console.error("Error retrieving plants in garden:", error);
    res.status(500).json({ message: "Error retrieving plants in garden" });
  }
});

//create a new garden
router.post("/api/gardens", async (req: Request, res: Response) => {
  const { Id, Name, Lat, Long, Radius } = req.body;
  if (!Id || !Name || !Lat || !Long || !Radius) {
    return res.status(400).json({ message: "Incomplete data" });
  }
  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("Id", sql.Int, Id)
      .input("Name", sql.VarChar(256), Name)
      .input("Lat", sql.Decimal(9, 6), Lat)
      .input("Long", sql.Decimal(9, 6), Long)
      .input("Radius", sql.Int, Radius)
      .query(
        "INSERT INTO Gardens (Id, Name, Lat, Long, Radius) VALUES (@Id, @Name, @Lat, @Long, @Radius)"
      );

    res.status(201).json({ message: "Garden created successfully" });
  } catch (error) {
    console.error("Error creating garden:", error);
    res.status(500).json({ message: "Error creating garden" });
  }
});

module.exports = router;

interface Feature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  }
} 