import PetEntity from "../../entities/pet.entity";
import EnumPorte from "../../enum/enum.porte";

export default interface InterfacePetRepository {
    create(pet: PetEntity): void;

    get(): Promise<Array<PetEntity>> | PetEntity[];

    put(id: number, pet: PetEntity): Promise<void>;

    delete(id: number, pet: PetEntity): Promise<void>;

    searchByPorte(porte: EnumPorte): Promise<Array<PetEntity>> | void;

    searchPetByParam<Tipo extends keyof PetEntity>(campo:Tipo, valor: PetEntity[Tipo]): Promise<Array<PetEntity>>;
}
