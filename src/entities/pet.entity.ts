import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/enum.species";

@Entity()
export default class PetEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  species: EnumEspecie;
  @Column()
  birth: Date;
  @Column()
  adopted: boolean;
}
