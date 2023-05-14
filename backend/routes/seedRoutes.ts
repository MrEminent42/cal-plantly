import { Request, Response } from "express";
import Seed from "../schemas/seed";
const express = require("express");
const router = express.Router();
const sql = require("mssql");
import dbConfig from "../dbConfig";

//get all seeds
router.get("/api/seeds", async (req: Request, res: Response) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM Seeds");
    const seeds = result.recordset;
    res.json(seeds);
  } catch (error) {
    console.error("Error retrieving seeds:", error);
    res.status(500).json({ message: "Error retrieving seeds" });
  }
});

//get seed by id
router.get("/api/seeds/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`SELECT * FROM Seeds WHERE Id = ${id}`);
    const seed = result.recordset[0];
    if (seed) {
      res.json(seed);
    } else {
      res.status(404).json({ message: "Seed not found" });
    }
  } catch (error) {
    console.error("Error retrieving seed:", error);
    res.status(500).json({ message: "Error retrieving seed" });
  }
});

//get seed by speciesId
router.get("/api/seeds/species/:speciesId", async (req: Request, res: Response) => {
  const { speciesId } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`SELECT * FROM Seeds WHERE SpeciesId = ${speciesId}`);
    const seeds = result.recordset;
    if (seeds.length > 0) {
      res.json(seeds);
    } else {
      res.status(404).json({ message: "No seeds found for the specified species" });
    }
  } catch (error) {
    console.error("Error retrieving seeds:", error);
    res.status(500).json({ message: "Error retrieving seeds" });
  }
});

//create a new seed
router.post("/api/seeds", async (req: Request, res: Response) => {
  const { Id, SpeciesId, OwnerId } = req.body;
  if (!Id || !SpeciesId || !OwnerId) {
    return res.status(400).json({ message: "Incomplete data" });
  }
  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("Id", sql.Int, Id)
      .input("SpeciesId", sql.Int, SpeciesId)
      .input("OwnerId", sql.Int, OwnerId)
      .query(
        "INSERT INTO Seeds (Id, SpeciesId, OwnerId) VALUES (@Id, @SpeciesId, @OwnerId)"
      );

    res.status(201).json({ message: "Seed created successfully" });
  } catch (error) {
    console.error("Error creating seed:", error);
    res.status(500).json({ message: "Error creating seed" });
  }
});

// delete seed by id
router.delete("/api/seeds/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Seeds WHERE Id = @id');

    res.status(200).json({ message: 'Seed deleted successfully' });
  } catch (error) {
    console.error('Error deleting seed:', error);
    res.status(500).json({ message: 'Error deleting seed' });
  }
});

export {};
module.exports = router;
