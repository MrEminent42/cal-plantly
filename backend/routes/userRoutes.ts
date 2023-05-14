import { Request, Response } from "express";
import User from "../schemas/user";
const express = require("express");
const router = express.Router();
const sql = require("mssql");
import dbConfig from "../dbConfig";

//get all users
router.get("/api/users", async (req: Request, res: Response) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM Users");
    const users = result.recordset;
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

//get user by id
router.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`SELECT * FROM Users WHERE Id = ${id}`);
    const user = result.recordset[0];
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Error retrieving user" });
  }
});

//get user by name
router.get("/api/users/name/:name", async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query(`SELECT * FROM Users WHERE Name = '${name}'`);
    const users = result.recordset;
    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: "Users not found" });
    }
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

// get the seeds belonging to user by id
router.get("/api/users/:id/seeds", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .query(`SELECT Seeds.* FROM Seeds 
              INNER JOIN UserSeeds ON UserSeeds.SeedId = Seeds.Id
              WHERE UserSeeds.UserId = ${id}`);
    
    const seeds = result.recordset;
    res.json(seeds);
  } catch (error) {
    console.error("Error retrieving seeds:", error);
    res.status(500).json({ message: "Error retrieving seeds" });
  }
});

//create a new user
router.post("/api/users", async (req: Request, res: Response) => {
  const { Id, Name, Points } = req.body;
  if (!Id || !Name || !Points) {
    return res.status(400).json({ message: "Incomplete data" });
  }
  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("id", sql.Int, Id)
      .input("name", sql.VarChar(255), Name)
      .input("points", sql.Int, Points)
      .query("INSERT INTO Users (Id, Name, Points) VALUES (@id, @name, @points)");

    res.status(201).json({ Id, Name, Points });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// delete user by id
router.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Users WHERE Id = @id");

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

export {};
module.exports = router;
