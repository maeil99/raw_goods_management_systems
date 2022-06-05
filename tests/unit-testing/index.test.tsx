import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);
    const { container } = render(<Home />);
    const header = screen.findByText(/Hello World/i);

    expect(header).toBeDefined();
    expect(container).toMatchSnapshot();

    screen.debug();
  });
});
