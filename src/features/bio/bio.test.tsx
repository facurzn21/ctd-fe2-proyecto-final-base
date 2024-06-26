

import { screen } from "@testing-library/react";
import { render } from "../../test-utils";
import Bio from "./Bio";

describe("bio", () => {
  test('should render "bio Container"', () => {
    render(<Bio></Bio>);
    const BIO_CONTAINER = screen.getByTestId("bioContainer");
    expect(BIO_CONTAINER).toBeDefined();
  });
});
