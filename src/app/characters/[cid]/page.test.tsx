import { render, screen, waitFor } from "@testing-library/react";
import { useParams, redirect } from "next/navigation";
import { useGetGraphData } from "@/api/hooks/useGetGraphData";
import "@testing-library/jest-dom";
import CharacterPage from "./page";

const mockCharacterData = {
  id: 10,
  name: "Obi-Wan Kenobi",
  height: "182",
  mass: "77",
  hair_color: "auburn, white",
  skin_color: "fair",
  eye_color: "blue-gray",
  birth_year: "57BBY",
  gender: "male",
  homeworld: 20,
  films: [1, 2, 3, 4, 5, 6],
  species: [1],
  vehicles: [38],
  starships: [48, 59, 64, 65, 74],
  created: "2014-12-10T16:16:29.192000Z",
  edited: "2014-12-20T21:17:50.325000Z",
  url: "https://sw-api.starnavi.io/people/10/",
};

const mockFilmsData = [
  {
    id: 1,
    title: "A New Hope",
    episode_id: 4,
    opening_crawl:
      "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
    director: "George Lucas",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1977-05-25",
    characters: [10, 12, 13, 14, 15, 16, 18, 19, 1, 2, 3, 4, 5, 6, 7, 8, 9, 81],
    planets: [1, 2, 3],
    starships: [2, 3, 5, 9, 10, 11, 12, 13],
    vehicles: [4, 6, 7, 8],
    species: [1, 2, 3, 4, 5],
    created: "2014-12-10T14:23:31.880000Z",
    edited: "2014-12-20T19:49:45.256000Z",
    url: "https://sw-api.starnavi.io/films/1/",
  },
];

const mockStarshipsData = [
  {
    id: 59,
    name: "Trade Federation cruiser",
    model: "Providence-class carrier/destroyer",
    manufacturer: "Rendili StarDrive, Free Dac Volunteers Engineering corps.",
    cost_in_credits: "125000000",
    length: "1088",
    max_atmosphering_speed: "1050",
    crew: "600",
    passengers: "48247",
    cargo_capacity: "50000000",
    consumables: "4 years",
    hyperdrive_rating: "1.5",
    MGLT: "unknown",
    starship_class: "capital ship",
    pilots: [10, 11],
    films: [6],
    created: "2014-12-20T19:40:21.902000Z",
    edited: "2014-12-20T21:23:49.941000Z",
    url: "https://sw-api.starnavi.io/starships/59/",
  },
];

class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  redirect: jest.fn(),
}));

jest.mock("@/api/hooks/useGetGraphData");

jest.mock("react-loader-spinner", () => ({
  Oval: jest.fn(() => <div data-testid="loading-spinner" />),
}));

describe("CharacterPage", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ cid: "10" });
  });

  it("renders loading spinner when data is loading", () => {
    (useGetGraphData as jest.Mock).mockReturnValue({
      characterData: null,
      filmsData: [],
      starshipsData: [],
      isLoading: true,
    });

    render(<CharacterPage />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("redirects to home if data loading completes without characterData", async () => {
    (useGetGraphData as jest.Mock).mockReturnValue({
      characterData: null,
      filmsData: [],
      starshipsData: [],
      isLoading: false,
    });

    render(<CharacterPage />);

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith("/");
    });
  });

  it("doesn't show loading spinner when data is available", async () => {
    (useGetGraphData as jest.Mock).mockReturnValue({
      characterData: mockCharacterData,
      filmsData: mockFilmsData,
      starshipsData: mockStarshipsData,
      isLoading: false,
    });

    render(<CharacterPage />);

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
  });
});
