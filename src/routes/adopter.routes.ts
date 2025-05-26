import express, { Request, Response } from "express";

import PetController from "../controller/pet.controller";
import AdopterRepository from "../repositories/adopter.repository";
import AdopterController from "../controller/adopter.controller";
import { AppDataSource } from "../config/dataSource.config";
import { Repository } from "typeorm";

const router = express.Router();
const adopterRepository = new AdopterRepository(
  AppDataSource.getRepository("AdopterEntity")
);
const adopterController = new AdopterController(adopterRepository);

router.post("/", (req, res) => adopterController.criaAdotante(req, res));

export default router;
