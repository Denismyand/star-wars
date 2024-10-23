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
  height: string;
  homeworld: number;
  id: number;
  mass: string;
  name: string;
  skin_color: string;
  species: number[];
  starships: number[];
  url: string;
  vehicles: number[];
};

export type GetFilmsApiResponseData = {
  count: number;
  next: string;
  previous: string;
  results: Film[];
};

export type Film = {
  characters: number[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  id: number;
  opening_crawl: string;
  planets: number[];
  producer: string;
  release_date: string;
  species: number[];
  starships: number[];
  title: string;
  url: string;
  vehicles: string;
};

export type GetStarshipsApiResponseData = {
  count: number;
  next: string;
  previous: string;
  results: Starship[];
};

export type Starship = {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  films: number[];
  hyperdrive_rating: string;
};
