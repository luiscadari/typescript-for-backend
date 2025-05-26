import express, { Request, Response } from "express";

import PetController from "../controller/pet.controller";
import PetRepositorry from "../repositories/pet.repository";
import { AppDataSource } from "../config/dataSource.config";

const router = express.Router();
const petRepositorry = new PetRepositorry(
  AppDataSource.getRepository("PetEntity")
);
const petController = new PetController(petRepositorry);

router.post("/", (req, res) => petController.criaPet(req, res));
router.get("/", (req, res) => petController.getPets(req, res));
router.put("/:id", (req, res) => petController.putPet(req, res));
router.delete("/:id", (req, res) => petController.deletePet(req, res));

export default router;
