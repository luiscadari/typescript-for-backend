import AdopterEntity from "../../entities/adopter.entity";

export default interface AdopterInterface {
  create(adopter: AdopterEntity): void | Promise<void>;
}
