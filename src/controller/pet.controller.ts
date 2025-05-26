import { Request, Response } from "express";

import type Pet from "../types/pet.type";
import EnumEspecie from "../enum/enum.species";
import PetRepositorry from "../repositories/pet.repository";
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
  async getPets(req: Request, res: Response) {
    const list = await this.repository.get();
    res.status(200).json(list);
  }
  async putPet(req: Request, res: Response) {
    const { id } = req.params;
    const { name, species, birth, adopted } = req.body as PetEntity;
    if (!name || !species || !birth || adopted === undefined) {
      res.status(400).json({
        message: "Params are required",
      });
      return;
    }
    if (!Object.values(EnumEspecie).includes(species)) {
      res.status(400).json({ error: "Especie inválida" });
      return;
    }
    await this.repository.put(Number(id), {
      name,
      species,
      birth,
      adopted,
      id: Number(id),
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
    const { id } = req.params;
    await this.repository.delete(Number(id));
    res.status(200).json({
      message: "Pet deleted successfully",
    });
  }
}
