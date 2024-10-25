import "@testing-library/jest-dom";
import ListCharacter from "./ListCharacter";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const character = {
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

describe("CharactersList", () => {
  beforeEach(async () => {
    await waitFor(() => render(<ListCharacter character={character} />));
  });
  it("ListCharacter component renders", () => {});
  it("List character has all their characteristics", () => {
    const name = screen.getByText("Name: Obi-Wan Kenobi");
    const height = screen.getByText("Height: 182");
    const mass = screen.getByText("Weight: 77");
    const hairColor = screen.getByText("Hair color: auburn, white");
    const skinColor = screen.getByText("Skin color: fair");
    const eyeColor = screen.getByText("Eye color: blue-gray");
    const birthYear = screen.getByText("Birth year: 57BBY");
    const gender = screen.getByText("Gender: male");
    expect(name).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(mass).toBeInTheDocument();
    expect(hairColor).toBeInTheDocument();
    expect(skinColor).toBeInTheDocument();
    expect(eyeColor).toBeInTheDocument();
    expect(birthYear).toBeInTheDocument();
    expect(gender).toBeInTheDocument();
  });

  it("should navigate to the correct character URL when clicked", async () => {
    render(<ListCharacter character={character} />);

    const characterLink = screen.getAllByRole("link")[0];

    expect(characterLink).toHaveAttribute(
      "href",
      `/characters/${character.id}`
    );

    fireEvent.click(characterLink);

    expect(characterLink.getAttribute("href")).toBe(
      `/characters/${character.id}`
    );
  });
});
