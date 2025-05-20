import { Request, Response } from "express";

import type Pet from "../types/pet.type";

let pets: Pet[] = [];

export default class PetController {
  criaPet = (req: Request, res: Response) => {
    const { adopted, age, id, name, species } = req.body as Pet;
    const newPet: Pet = { adopted, age, id, name, species };
    pets.push(newPet);
    res.status(200).json(newPet);
  };
}
