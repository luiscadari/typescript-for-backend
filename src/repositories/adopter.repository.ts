import {Repository} from "typeorm";
import AdopterEntity from "../entities/adopter.entity";
import AdopterInterface from "./interfaces/adopter.interface";

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

}
