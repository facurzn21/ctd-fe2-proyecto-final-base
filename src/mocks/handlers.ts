import { rest } from "msw";
import { API_URL } from "../app/constants";

export const handlers = [
  rest.get(`${API_URL}`, (req, res, ctx) => {
    const character = req.url.searchParams.get("character");
    if (character === "Milhouse Van Houten") {
      return res(
        ctx.json([
          {
            quote: "But my mom says I'm cool.",
            character: "Milhouse Van Houten",
          },
        ])
      );
    } else if (character === "Facundo Correa") {
      return res(
        ctx.status(404),
        ctx.json({ error: "Por favor ingrese un nombre válido" })
      );
    } else {
      return res(ctx.json([{ quote: "Thank you. Come again." }]));
    }
  }),
];
