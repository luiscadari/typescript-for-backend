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
  async get(): Promise<Array<PetEntity>> {
    return await this.repository.find();
  }
  async put(id: number, pet: PetEntity): Promise<void> {
    const existingPet = await this.repository.findOneBy({ id });
    if (!existingPet) {
      throw new Error("Pet not found");
    }
    await this.repository.update(id, pet);
  }
  async delete(id: number): Promise<void> {
    const existingPet = await this.repository.findOneBy({ id });
    if (!existingPet) {
      throw new Error("Pet not found");
    }
    await this.repository.delete(id);
  }
}
