import { render, screen } from "@testing-library/react";

import OverdueSales from "./OverdueSales";

describe("renders overdue sales component", () => {
  it("should show a title", () => {
    render(<OverdueSales />);

    const titleElement = screen.getByText("Overdue Orders");
    expect(titleElement).toBeInTheDocument();
  });
});
