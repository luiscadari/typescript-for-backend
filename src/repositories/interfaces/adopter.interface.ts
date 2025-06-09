import AdopterEntity from "../../entities/adopter.entity";
import AddressEntity from "../../entities/addressEntity";

export default interface AdopterInterface {
    create(adopter: AdopterEntity): Promise<AdopterEntity>;

    listAdopters(): Promise<AdopterEntity[]>;

    getAdopter(id: number): Promise<AdopterEntity | null>;

    updateAdopter(id: number, adopter: AdopterEntity): Promise<AdopterEntity>;

    deleteAdopter(id: number): Promise<AdopterEntity>;

    updateAddress(id: number, address: AddressEntity): Promise<{ success: boolean, message?: string } | void>;
};