import { Repository } from "typeorm";
import PetEntity from "../entities/pet.entity";
import InterfacePetRepository from "./interfaces/pet.interface";

export default class PetRepositorry implements InterfacePetRepository {
  private repository: Repository<PetEntity>;
  constructor(repository: Repository<PetEntity>) {
    this.repository = repository;
  }
  create(pet: PetEntity): void {
    this.repository.save(pet);
  }
  get(): Array<PetEntity> {
    throw new Error("Method not implemented.");
  }
  put(id: number, pet: PetEntity): void {
    throw new Error("Method not implemented.");
  }
  delete(id: number, pet: PetEntity): void {
    throw new Error("Method not implemented.");
  }
}
