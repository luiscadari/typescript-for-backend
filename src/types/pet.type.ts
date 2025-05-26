import EnumEspecie from "../enum/enum.species";

type Pet = {
  id: number;
  name: string;
  species: EnumEspecie;
  adopted: boolean;
  age: number;
};

export default Pet;
