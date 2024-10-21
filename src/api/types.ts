export type GetCharactersApiResponseData = {
  count: number;
  next: string;
  previous: string;
  results: Character[];
};

export type Character = {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: number[];
  gender: string;
  hair_color: string;
  height: number;
  homeworld: number;
  id: number;
  mass: number;
  name: string;
  skin_color: string;
  species: number[];
  starships: number[];
  url: string;
  vehicles: number[];
};
