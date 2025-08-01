import express, {Request, Response} from "express";

import PetController from "../controller/pet.controller";
import PetRepository from "../repositories/pet.repository";
import {AppDataSource} from "../config/dataSource.config";

const router = express.Router();
const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdopterEntity")
);
const petController = new PetController(petRepository);

router.post("/", (req: Request, res: Response) => petController.criaPet(req, res));
router.get("/", (req: Request, res: Response) => petController.getPets(req, res));
router.get("/porte", (req: Request, res: Response) => petController.searchByPorte(req, res)
)
router.get("/search", (req: Request, res: Response)=> petController.searchPetByParams(req, res))
router.put("/:id", (req: Request, res: Response) => petController.putPet(req, res));
router.delete("/:id", (req: Request, res: Response) => petController.deletePet(req, res));
router.put("/adopt/:petId", (req: Request, res: Response) => petController.adopt(req, res));
export default router;
