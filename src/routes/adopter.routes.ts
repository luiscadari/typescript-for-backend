import express, {Request, Response} from "express";
import AdopterRepository from "../repositories/adopter.repository";
import AdopterController from "../controller/adopter.controller";
import {AppDataSource} from "../config/dataSource.config";

const router = express.Router();
const adopterRepository = new AdopterRepository(
    AppDataSource.getRepository("AdopterEntity")
);
const adopterController = new AdopterController(adopterRepository);

router.post("/", (req: Request, res: Response) => adopterController.create(req, res));
router.get("/:id", (req: Request, res: Response) => adopterController.getById(req, res));
router.get("", (res: Response) => adopterController.get(res));
router.put("/:id", (req: Request, res: Response) => adopterController.update(req, res));
router.delete("/:id", (req: Request, res: Response) => adopterController.delete(req, res));
router.patch("/:id", (req: Request, res: Response) => adopterController.updateAddress(req, res));
export default router;
