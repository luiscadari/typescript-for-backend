import express from "express";
import AdopterRepository from "../repositories/adopter.repository";
import AdopterController from "../controller/adopter.controller";
import {AppDataSource} from "../config/dataSource.config";

const router = express.Router();
const adopterRepository = new AdopterRepository(
    AppDataSource.getRepository("AdopterEntity")
);
const adopterController = new AdopterController(adopterRepository);

router.post("/", (req, res) => adopterController.create(req, res));
router.get("/:id", adopterController.getById);
router.get("", adopterController.get);
router.patch("/:id", adopterController.update);
router.delete("/:id", adopterController.delete);
export default router;
