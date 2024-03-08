import { render, screen } from "@testing-library/react";

import Navbar from "./Navbar";

describe("renders navbar", () => {
  it("should show a title", async () => {
    render(<Navbar />);

    const titleElement = await screen.findByText("Analytics Dashboard");
    expect(titleElement).toBeInTheDocument();
  });

  it("should show the user's name or ask to sign in", async () => {
    render(<Navbar />);

    const userElement = await screen.findByText("Sign In");
    expect(userElement).toBeInTheDocument();
  });
});
