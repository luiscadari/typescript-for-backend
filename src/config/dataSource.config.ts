import { DataSource } from "typeorm";
import PetEntity from "../entities/pet.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/config/database.sqlite",
  entities: [PetEntity],
  synchronize: true,
});
