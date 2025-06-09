import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import EnumEspecie from "../enum/enum.species";
import AdopterEntity from "./adopter.entity";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name: string;
    @Column()
    species: EnumEspecie;
    @Column()
    birth: Date;
    @Column()
    adopted: boolean;

    @ManyToOne(() => AdopterEntity, (adopter: AdopterEntity) => adopter.pets)
    adopter!: AdopterEntity;

    constructor(
        name: string,
        species: EnumEspecie,
        birth: Date,
        adopted: boolean
    ) {
        this.name = name;
        this.species = species;
        this.birth = birth;
        this.adopted = adopted;
    }
}
