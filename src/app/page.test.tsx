import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import MainPage from "./page";
import axios from "axios";
import { GetCharactersApiResponseData } from "@/api/types";

jest.mock("react-intersection-observer", () => {
  return {
    useInView: () => {
      return { ref: null, inView: false };
    },
  };
});

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockData: GetCharactersApiResponseData = {
  count: 2,
  next: "",
  previous: "",
  results: [
    {
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
    },
    {
      id: 12,
      name: "Wilhuff Tarkin",
      height: "180",
      mass: "unknown",
      hair_color: "auburn, grey",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "64BBY",
      gender: "male",
      homeworld: 21,
      films: [1, 6],
      species: [1],
      vehicles: [],
      starships: [],
      created: "2014-12-10T16:26:56.138000Z",
      edited: "2014-12-20T21:17:50.330000Z",
      url: "https://sw-api.starnavi.io/people/12/",
    },
  ],
};

mockedAxios.get.mockImplementation(() => Promise.resolve({ data: mockData }));

describe("MainPage", () => {
  beforeEach(async () => {
    await waitFor(() => render(<MainPage />));
  });
  it("Main page renders", () => {});
  it("Main page has a character list heading", () => {
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Characters list");
  });
});
