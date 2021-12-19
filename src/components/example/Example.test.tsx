import { render } from "@testing-library/react";
import Example from "./Example";

describe("Example", () => {
    const { getByTestId } = render(<Example data-testid="example">Example Component</Example>);
    const example = getByTestId("example");
    it("renders", () => {
        expect(example).toBeInTheDocument();
    });

    it("have class", () => {
        expect(example).toHaveClass("example");
    });
});
