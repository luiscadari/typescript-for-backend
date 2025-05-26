import { Repository } from "typeorm";
import AdopterEntity from "../entities/adopter.entity";
import AdopterInterface from "./interfaces/adopter.interface";

export default class AdopterRepository implements AdopterInterface {
  constructor(private repository: Repository<AdopterEntity>) {}
  async create(adopter: AdopterEntity): Promise<void> {
    await this.repository.save(adopter);
  }
}
