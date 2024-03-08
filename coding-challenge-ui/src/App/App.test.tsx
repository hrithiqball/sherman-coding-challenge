import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("renders entire app", () => {
  it("should have children", () => {
    render(<App />);

    const titleElement = screen.getByText("Analytics Dashboard");
    expect(titleElement).toBeInTheDocument();

    const overdueElement = screen.getByText("Overdue Orders");
    expect(overdueElement).toBeInTheDocument();
  });
});
