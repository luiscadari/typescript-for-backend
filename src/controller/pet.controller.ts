import {Request, Response} from "express";

import type Pet from "../types/pet.type";
import EnumEspecie from "../enum/enum.species";
import PetRepositorry from "../repositories/pet.repository";
import PetEntity from "../entities/pet.entity";
import EnumPorte from "../enum/enum.porte";

const pets: Pet[] = [];
let id = 0;

function geraId() {
    id = id + 1;
    return id;
}

export default class PetController {
    constructor(private repository: PetRepositorry) {
    }

    criaPet = async (req: Request, res: Response) => {
        const {name, species, porte, birth, adopted} = req.body as PetEntity;

        if (!name || !species || !birth || adopted === undefined || !porte) {
            res.status(400).json({
                message: "Params are required",
            });
            return;
        }
        if (!Object.values(EnumEspecie).includes(species)) {
            res.status(400).json({error: "Especie inválida"});
        }
        if (porte && !(porte in EnumPorte)) {
            res.status(400).json({error: "Porte inválido"});
            return;
        }
        const newPet = new PetEntity(name, species, porte, birth, adopted);

        await this.repository.create(newPet);
        res.status(200).json(newPet);
    };

    async getPets(req: Request, res: Response) {
        const list = await this.repository.get();
        res.status(200).json(list);
    }

    async putPet(req: Request, res: Response) {
        const {id} = req.params;
        const {name, species, birth, adopted, adopter} = req.body as PetEntity;
        if (!name || !species || !birth || adopted === undefined) {
            res.status(400).json({
                message: "Params are required",
            });
            return;
        }
        if (!Object.values(EnumEspecie).includes(species)) {
            res.status(400).json({error: "Especie inválida"});
            return;
        }
        await this.repository.put(Number(id), {
            name,
            species,
            birth,
            adopted,
            id: Number(id),
            adopter
        });
        res.status(200).json({
            message: "Pet updated successfully",
            pet: {
                name,
                species,
                birth,
                adopted,
                id: Number(id),
            },
        });
    }

    async deletePet(req: Request, res: Response) {
        const {id} = req.params;
        await this.repository.delete(Number(id));
        res.status(200).json({
            message: "Pet deleted successfully",
        });
    }

    async adopt(req: Request, res: Response): Promise<void> {
        const {pet} = req.params;
        const {adopter} = req.body as { pet: number, adopter: number };
        const {success, message} = await this.repository.adopt(Number(pet), adopter);
        if (!success) {
            res.status(404).json({message});
            return;
        }
        res.status(200).json({
            message: "Pet adopted successfully",
            pet,
            adopter
        });
    }

    async seatchByPorte(req: Request, res: Response): Promise<void> {
        const {porte} = req.query;
        if (!porte) {
            res.status(400).json({error: "Porte inválido"});
            return;
        }
        const pets = await this.repository.searchByPorte(porte as EnumPorte);
        res.status(200).json(pets)
    }
}
