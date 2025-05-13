import express, { Request, Response } from "express";

import PetController from "../controller/pet.controller";

const router = express.Router();

const petController = new PetController();

router.post('/', petController.criaPet);

export default router;