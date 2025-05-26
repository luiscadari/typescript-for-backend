import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class AdopterEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  photo: string;

  @Column()
  adress: string;

  @Column()
  phone: string;

  constructor(
    name: string,
    password: string,
    adress: string,
    photo: string,
    phone: string
  ) {
    this.name = name;
    this.password = password;
    this.adress = adress;
    this.photo = photo;
    this.phone = phone;
  }
}
