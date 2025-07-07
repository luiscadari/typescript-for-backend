import {Repository} from "typeorm";
import PetEntity from "../entities/pet.entity";
import InterfacePetRepository from "./interfaces/pet.interface";
import AdopterEntity from "../entities/adopter.entity";
import EnumPorte from "../enum/enum.porte";

export default class PetRepository implements InterfacePetRepository {
    private repository: Repository<PetEntity>;
    private adopterRepository: Repository<AdopterEntity>;

    constructor(repository: Repository<PetEntity>, adopterRepository: Repository<AdopterEntity>) {
        this.repository = repository;
        this.adopterRepository = adopterRepository;
    }

    async searchByPorte(porte: EnumPorte): Promise<Array<PetEntity>> {
        return await this.repository.find({where: {porte}});
    }

    async create(pet: PetEntity): Promise<void> {
        await this.repository.save(pet);
    }

    async get(): Promise<Array<PetEntity>> {
        return await this.repository.find();
    }

    async put(id: number, pet: PetEntity): Promise<void> {
        const existingPet = await this.repository.findOneBy({id});
        if (!existingPet) {
            throw new Error("Pet not found");
        }
        await this.repository.update(id, pet);
    }

    async delete(id: number): Promise<void> {
        const existingPet = await this.repository.findOneBy({id});
        if (!existingPet) {
            throw new Error("Pet not found");
        }
        await this.repository.delete(id);
    }

    async adopt(petId: number, adopterId: number): Promise<{ success: boolean, message?: string }> {
        try {
            const pet: PetEntity | null = await this.repository.findOneBy({id: petId});
            if (!pet) return {success: false, message: "Pet not found"};
            const adopter: AdopterEntity | null = await this.adopterRepository.findOneBy({id: adopterId});
            if (!adopter) return {success: false, message: "Adopter not found"};
            adopter.pets.push(pet);
            pet.adopted = true;
            pet.adopter = adopter;
            await this.repository.save(pet);
            return {success: true, message: "Pet adopted successfully"};
        } catch (e) {
            console.log(e);
            return {success: false, message: "An error occurred while adopting the pet"};
        }
    }

}
