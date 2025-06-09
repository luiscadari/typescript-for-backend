import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import AddressEntity from "./addressEntity";

@Entity()
export default class AdopterEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column({nullable: true})
    photo?: string;

    @OneToOne(() => AddressEntity, {
        nullable: true,
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    address?: AddressEntity;

    constructor(
        name: string,
        password: string,
        phone: string,
        address?: AddressEntity,
        photo?: string,
    ) {
        this.name = name;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.photo = photo;
    }
}
