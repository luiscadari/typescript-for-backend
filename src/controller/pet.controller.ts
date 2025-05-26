import { Request, Response } from "express";

import type Pet from "../types/pet.type";

let pets: Pet[] = [];

export default class PetController {
  criaPet = (req: Request, res: Response) => {
    const { id, name, species, age, adopted } = req.body as Pet;
    const newPet: Pet = { adopted, age, id, name, species };
    pets.push(newPet);
    res.status(200).json(newPet);
  };
  getPets = (req: Request, res: Response) => {
    res.status(200).json(pets);
  };
  patchPet = (req: Request, res: Response) => {
    const { id } = req.params;
    const petIndex = pets.findIndex((pet) => pet.id === Number(id));
    if (petIndex === -1) {
      res.status(404).json({ message: "Pet not found" });
      return;
    }
    const newPet = req.body as Pet;
    pets[petIndex] = { ...newPet };
    res.status(200).json(newPet);
  };
  deletePet = (req: Request, res: Response) => {
    const { id } = req.params;
    const petIndex = pets.findIndex((pet) => pet.id === Number(id));
    if (petIndex === -1) {
      res.status(404).json({ message: "Pet not found" });
      return;
    }
    pets.splice(petIndex, 1);
    res.status(204).send();
  };
}
