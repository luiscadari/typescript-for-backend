import EnumEspecie from "../enum/enum.species";

type Pet = {
  id: number;
  name: string;
  species: EnumEspecie;
  adopted: boolean;
  birth: Date;
};

export default Pet;
