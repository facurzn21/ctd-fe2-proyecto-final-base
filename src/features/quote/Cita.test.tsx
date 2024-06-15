import {  screen, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { render } from "../../test-utils";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { API_URL } from "../../app/constants";
import Cita from "./Cita";

const server = setupServer(
  rest.get(`${API_URL}`, (req, res, ctx) => {
    const character = req.url.searchParams.get("character");
    return res(
      ctx.json([{ quote: "Test Quote", character: character || undefined }])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("hacer request a la API con texto introducido en el input", async () => {
  render(
    <Provider store={store}>
      <Cita />
    </Provider>
  );

  fireEvent.change(screen.getByLabelText("Author Cita"), {
    target: { value: "Bart" },
  });
  fireEvent.click(screen.getByText(/Obtener Cita/i));

  // Usamos findByText en vez de waitFor + getByText
  const quoteElem = await screen.findByText(/Test Quote/i);

  expect(quoteElem).toBeInTheDocument();
});
