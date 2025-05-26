import PetEntity from "../../entities/pet.entity";

export default interface InterfacePetRepository {
  create(pet: PetEntity): void;
  get(): Promise<Array<PetEntity>> | PetEntity[];
  put(id: number, pet: PetEntity): Promise<void>;
  delete(id: number, pet: PetEntity): Promise<void>;
}
