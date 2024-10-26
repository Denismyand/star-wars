import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Character } from "@/api/types";
import CharactersList from "./CharactersList";
import { mocked } from "jest-mock";
import { useInfiniteCharactersFetch } from "@/api/hooks/useInfiniteCharactersFetch";
import { useInView } from "react-intersection-observer";

jest.mock("@/api/hooks/useInfiniteCharactersFetch");

jest.mock("react-intersection-observer", () => ({
  useInView: jest.fn(),
}));

const mockUseInfiniteCharactersFetch = mocked(useInfiniteCharactersFetch);
const mockUseInView = mocked(
  useInView as () => { ref: (node?: Element | null) => void; inView: boolean }
);

const mockData: Character[] = [
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
];

describe("CharactersList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("display loading spinner while fetching data", async () => {
    mockUseInfiniteCharactersFetch.mockReturnValue({
      data: [],
      fetchMore: jest.fn(),
      isLoading: true,
    });

    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    render(<CharactersList />);

    const loadingSpinner = screen.getByLabelText("oval-loading");
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("displays 'No characters found' when there are no characters", async () => {
    mockUseInfiniteCharactersFetch.mockReturnValue({
      data: [],
      fetchMore: jest.fn(),
      isLoading: false,
    });

    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    render(<CharactersList />);

    const noCharactersText = screen.getByText("No characters found");
    expect(noCharactersText).toBeInTheDocument();
  });

  it("renders characters list when data is fetched", async () => {
    mockUseInfiniteCharactersFetch.mockReturnValue({
      data: mockData,
      fetchMore: jest.fn(),
      isLoading: false,
    });

    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    render(<CharactersList />);

    expect(screen.getByText("Obi-Wan Kenobi")).toBeInTheDocument();
    expect(screen.getByText("Wilhuff Tarkin")).toBeInTheDocument();
  });

  it("fetches more characters when inView is true", async () => {
    const mockFetchMore = jest.fn();

    mockUseInfiniteCharactersFetch.mockReturnValue({
      data: [],
      fetchMore: mockFetchMore,
      isLoading: false,
    });

    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: true,
    });

    render(<CharactersList />);

    await waitFor(() => {
      expect(mockFetchMore).toHaveBeenCalled();
    });
  });

  it("shows a loading spinner while loading more characters", async () => {
    mockUseInfiniteCharactersFetch.mockReturnValue({
      data: mockData,
      fetchMore: jest.fn(),
      isLoading: true,
    });

    mockUseInView.mockReturnValue({
      ref: jest.fn(),
      inView: false,
    });

    render(<CharactersList />);

    const loadingSpinner = screen.getByLabelText("oval-loading");
    expect(loadingSpinner).toBeInTheDocument();
  });
});
