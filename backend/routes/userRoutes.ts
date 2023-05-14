import { Request, Response } from "express";
import User from "../schemas/user";
const express = require("express");
const router = express.Router();
const sql = require("mssql");
const dbConfig = require("../dbConfig");

// //get all users
// router.get("/api/users", (req: Request, res: Response) => {
//   res.json(users);
// });

// //get user by id
// router.get("/api/users/:id", (req: Request, res: Response) => {
//   const { id } = req.params;
//   const user = users.find((u) => u.id === parseInt(id, 10));
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });

// //get user by name
// router.get("/api/users/name/:name", (req: Request, res: Response) => {
//   const { name } = req.params;
//   const user = users.find((u) => u.name === name);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });

// //create a new user
// router.post("/api/users", (req: Request, res: Response) => {
//   const { id, name, points, inventory } = req.body;
//   if (!id || !name || !points || !inventory) {
//     return res.status(400).json({ message: "Incomplete data" });
//   }
//   const newUser: User = { id, name, points, inventory };
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

export {};
module.exports = router;
