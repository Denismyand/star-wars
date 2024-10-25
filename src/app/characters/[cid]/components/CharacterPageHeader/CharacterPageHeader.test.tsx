import { render, screen } from "@testing-library/react";
import CharacterPageHeader from "./CharacterPageHeader";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("CharacterPageHeader", () => {
  it("renders the title correctly", () => {
    render(<CharacterPageHeader />);
    const title = screen.getByText("Character page");
    expect(title).toBeInTheDocument();
  });

  it("renders the back button with correct text", () => {
    render(<CharacterPageHeader />);
    const backButton = screen.getByRole("button", {
      name: "Back to all characters",
    });
    expect(backButton).toBeInTheDocument();
  });

  it("navigates back to home page when 'Back to all characters' button is clicked", () => {
    render(<CharacterPageHeader />);
    const backButtonLink = screen.getByRole("link", {
      name: "Back to all characters",
    });
    expect(backButtonLink).toHaveAttribute("href", "/");

    userEvent.click(backButtonLink);
  });
});
