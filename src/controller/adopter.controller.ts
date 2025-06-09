import {Request, Response} from "express";
import AdopterRepository from "../repositories/adopter.repository";
import AdopterEntity from "../entities/adopter.entity";
import AddressEntity from "../entities/addressEntity";

export default class AdopterController {
    constructor(private repository: AdopterRepository) {
    }

    async create(req: Request, res: Response) {
        try {
            const {name, phone, address, photo, password} =
                req.body as AdopterEntity;

            const newAdopter = new AdopterEntity(
                name,
                password,
                phone,
                address,
                photo,
            );
            await this.repository.create(newAdopter);
            res.status(201).json(newAdopter);
        } catch (error) {
            res.status(500).json({error: "Erro ao criar o adotante"});
            return;
        }
    };

    async get(res: Response) {
        try {
            const adopters = await this.repository.listAdopters();
            res.status(200).json(adopters);
        } catch (e) {
            res.status(500).json({error: e});
        }
    };

    async getById(req: Request, res: Response) {
        const {id} = req.params;
        if (!id) throw res.status(400).json({error: "No adopter id provided"});
        const adopter = await this.repository.getAdopter(Number(id));
        res.status(200).json(adopter);
    };

    async update(req: Request, res: Response) {
        const {id, name, phone, password, photo, address}: AdopterEntity = req.body as AdopterEntity;
        if (!id) throw res.status(400).json({error: "No adopter id provided"});
        await this.repository.updateAdopter(id, {id, name, phone, password, photo, address});
        res.status(200).json({id, name, phone, photo, address});
    };

    async delete(req: Request, res: Response) {
        const {id} = req.params;
        if (!id) throw res.status(400).json({error: "No adopter id provided"});
        const deletedAdopter = await this.repository.deleteAdopter(Number(id));
        res.status(200).json({deletedAdopter});
    }

    async updateAddress(req: Request, res: Response) {
        const {id} = req.params;
        const {success, message} = await this.repository.updateAddress(
            Number(id),
            req.body as AddressEntity
        );
        if (success) res.status(200).json({success, message});
        else res.status(500).json({error: message});
    }
}
