import { screen } from "@testing-library/react";
import { server } from "../../mocks/server";
import { render } from "../../test-utils";
import Cita from "./Cita";
import userEvent from "@testing-library/user-event";

// servidor mock
beforeAll(() => server.listen()); // Iniciar el servidor 
afterEach(() => server.resetHandlers()); // manejadores restablecidos 
afterAll(() => server.close()); // se cierra el servidor despues de las pruebas

describe("Componente Cita", () => {
  it("debería mostrar la cita por defecto", () => {
    render(<Cita />);
    expect(screen.getByText("No se encontro ninguna cita")).toBeInTheDocument();
  });

  it("debería mostrar 'CARGANDO...' al hacer clic en el botón de cita aleatoria", async () => {
    render(<Cita />);
    userEvent.click(screen.getByText("Obtener cita aleatoria")); // Hace click en el botón
    expect(await screen.findByText("CARGANDO...")).toBeInTheDocument(); // Verifica que el texto de carga aparezca
  });

  it("debería mostrar 'CARGANDO...' al hacer clic en el botón de cita de personaje", async () => {
    render(<Cita />);
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
    userEvent.type(input, "Milhouse Van Houten"); // Escribe en el campo de entrada
    userEvent.click(screen.getByText("Obtener Cita")); // Hace click en el botón
    expect(await screen.findByText("CARGANDO...")).toBeInTheDocument();
  });

  it("debería mostrar la cita del personaje al hacer clic en el botón con un valor válido", async () => {
    render(<Cita />);
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
    userEvent.type(input, "Milhouse Van Houten"); // Escribe en el campo de entrada
    userEvent.click(screen.getByText("Obtener Cita")); // Hace click en el botón
    expect(
      await screen.findByText("But my mom says I'm cool.") // Verifica la cita específica
    ).toBeInTheDocument();
    expect(screen.queryByText("Bart Simpson")).not.toBeInTheDocument();
  });

  it("debería mostrar una cita aleatoria al hacer clic en el botón sin valor de entrada", async () => {
    render(<Cita />);
    userEvent.click(screen.getByText("Obtener cita aleatoria")); // Hace click en el botón
    expect(
      await screen.findByText("Thank you. Come again.")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("No se encontro ninguna cita")
    ).not.toBeInTheDocument();
  });

  it("debería mostrar un error cuando no se encuentra el nombre del personaje", async () => {
    render(<Cita />);
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
    userEvent.type(input, "Facundo Correa"); // Escribe en el campo de entrada
    userEvent.click(screen.getByText("Obtener Cita")); // Hace click en el botón
    expect(
      await screen.findByText("Por favor ingrese un nombre válido")
    ).toBeInTheDocument();
  });

  it("debería mostrar un error con una entrada inválida", async () => {
    render(<Cita />);
    const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
    userEvent.type(input, "1"); // Escribe en el campo de entrada
    userEvent.click(screen.getByText("Obtener Cita")); // Hace click en el botón
    expect(
      await screen.findByText("Por favor ingrese un nombre válido")
    ).toBeInTheDocument();
  });
});
