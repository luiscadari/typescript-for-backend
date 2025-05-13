import { Request, Response } from "express"

let pets = [];

export default class PetController {
    criaPet = (req: Request, res: Response) => {
        const newPet = req.body;
        pets.push(newPet);
        res.status(200).json(newPet);
    }
}