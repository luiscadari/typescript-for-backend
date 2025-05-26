import PetEntity from "../../entities/pet.entity";

export default interface InterfacePetRepository {
  create(pet: PetEntity): void;
  get(): Array<PetEntity>;
  put(id: number, pet: PetEntity): void;
  delete(id: number, pet: PetEntity): void;
}
