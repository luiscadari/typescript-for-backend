import express, { Request, Response } from "express";

import PetController from "../controller/pet.controller";

const router = express.Router();

const petController = new PetController();

router.post("/", petController.criaPet);
router.get("/", petController.getPets);
router.put("/:id", petController.patchPet);
router.delete("/:id", petController.deletePet);

export default router;
