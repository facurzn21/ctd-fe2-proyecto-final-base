import { rest } from "msw";

export const hanlders = [
  rest.get("", (req, res, ctx) => {
    return res();
  }),
];
