import {Request, Response} from "express";
import AdopterRepository from "../repositories/adopter.repository";
import AdopterEntity from "../entities/adopter.entity";

export default class AdopterController {
    constructor(private repository: AdopterRepository) {
    }

    async criaAdotante(req: Request, res: Response) {
        try {
            const {name, phone, address, photo, password} =
                req.body as AdopterEntity;

            const novoAdotante = new AdopterEntity(
                name,
                password,
                phone,
                address,
                photo,
            );
            await this.repository.create(novoAdotante);
            res.status(201).json(novoAdotante);
        } catch (error) {
            res.status(500).json({error: "Erro ao criar o adotante"});
            return;
        }
    }
}
