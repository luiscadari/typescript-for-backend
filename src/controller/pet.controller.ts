import { Request, Response } from "express";

import type Pet from "../types/pet.type";
import EnumEspecie from "../enum/enum.species";
import PetRepositorry from "../repositories/pet.rerpository";
import PetEntity from "../entities/pet.entity";

let pets: Pet[] = [];
let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
  constructor(private repository: PetRepositorry) {}
  criaPet = (req: Request, res: Response) => {
    const { name, species, birth, adopted } = req.body as PetEntity;

    if (!name || !species || !birth || adopted === undefined) {
      res.status(400).json({
        message: "Params are required",
      });
      return;
    }
    if (!Object.values(EnumEspecie).includes(species)) {
      res.status(400).json({ errorr: "Especie inválida" });
    }
    const newPet = new PetEntity();
    newPet.adopted = adopted;
    newPet.birth = birth;
    newPet.id = geraId();
    newPet.name = name;
    newPet.species = species;
    this.repository.create(newPet);
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
