import {Repository} from "typeorm";
import AdopterEntity from "../entities/adopter.entity";
import AdopterInterface from "./interfaces/adopter.interface";
import AddressEntity from "../entities/addressEntity";

export default class AdopterRepository implements AdopterInterface {
    constructor(private repository: Repository<AdopterEntity>) {
    }

    async getAdopter(id: number): Promise<AdopterEntity | null> {
        return await this.repository.findOneBy({id});
    }

    async listAdopters(): Promise<AdopterEntity[]> {
        return await this.repository.find();
    }

    async updateAdopter(id: number, adopter: AdopterEntity): Promise<AdopterEntity> {
        const existAdopter = await this.repository.findOneBy({id});
        if (!existAdopter) throw new Error("Adopter not found");
        await this.repository.update(id, existAdopter);
        return adopter;
    }

    async deleteAdopter(id: number): Promise<AdopterEntity> {
        const existAdopter = await this.repository.findOneBy({id});
        if (!existAdopter) throw new Error("Adopter not found");
        await this.repository.delete(id);
        return existAdopter;
    }

    async create(adopter: AdopterEntity): Promise<AdopterEntity> {
        await this.repository.save(adopter);
        return adopter;
    }

    async updateAddress(id: number, address: AddressEntity): Promise<{ success: boolean, message?: string }> {
        const adopter = await this.repository.findOneBy({id});
        if (!adopter) return {success: false, message: "Adopter not found"};
        adopter.address = new AddressEntity(
            address.city,
            address.state,
        );
        await this.repository.save(adopter);
        return {success: true, message: "Adopter Address updated"};
    }
}
