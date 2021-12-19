import { render, screen } from "@testing-library/react";
import ExamplePage from "./ExamplePage";

describe("ExamplePage", () => {
    render(<ExamplePage />);
    const examplePage = screen.getByText("example-page");

    it("renders", () => {
        expect(examplePage).toBeInTheDocument();
    });

    it("have class", () => {
        expect(examplePage).toHaveClass("example-page");
    });
});
