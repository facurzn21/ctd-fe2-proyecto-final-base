import { screen, fireEvent } from "@testing-library/react";
import { render } from "../../test-utils";
import Bio from "./Bio";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";

describe("Bio", () => {
  test('should render "bio Container"', () => {
    render(<Bio />);
    const bioContainer = screen.getByTestId("bioContainer");
    expect(bioContainer).toBeInTheDocument();
  });

  test('should render initial bio info', () => {
    render(<Bio />);
    const initialBio = INFO_SIMPSONS[NombresSimpsons.BART];
    const bioImage = screen.getByAltText(initialBio.nombre);
    const bioName = screen.getByText(initialBio.nombre);
    const bioDescription = screen.getByText(initialBio.descripcion);

    expect(bioImage).toBeInTheDocument();
    expect(bioName).toBeInTheDocument();
    expect(bioDescription).toBeInTheDocument();
  });

  test('should switch to Homer\'s bio when the corresponding button is clicked', () => {
    render(<Bio />);
    const homerButton = screen.getByText(INFO_SIMPSONS[NombresSimpsons.HOMER].nombre);
    fireEvent.click(homerButton);

    const homerBio = INFO_SIMPSONS[NombresSimpsons.HOMER];
    const bioImage = screen.getByAltText(homerBio.nombre);
    const bioName = screen.getByText(homerBio.nombre);
    const bioDescription = screen.getByText(homerBio.descripcion);

    expect(bioImage).toBeInTheDocument();
    expect(bioName).toBeInTheDocument();
    expect(bioDescription).toBeInTheDocument();
  });

  test('should switch to Lisa\'s bio when the corresponding button is clicked', () => {
    render(<Bio />);
    const lisaButton = screen.getByText(INFO_SIMPSONS[NombresSimpsons.LISA].nombre);
    fireEvent.click(lisaButton);

    const lisaBio = INFO_SIMPSONS[NombresSimpsons.LISA];
    const bioImage = screen.getByAltText(lisaBio.nombre);
    const bioName = screen.getByText(lisaBio.nombre);
    const bioDescription = screen.getByText(lisaBio.descripcion);

    expect(bioImage).toBeInTheDocument();
    expect(bioName).toBeInTheDocument();
    expect(bioDescription).toBeInTheDocument();
  });
});
