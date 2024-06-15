import { rest } from 'msw';
import { API_URL } from '../app/constants';

export const handlers = [
  rest.get(`${API_URL}`, (req, res, ctx) => {
    const character = req.url.searchParams.get("character");
    return res(
      ctx.json([{ quote: "Test Quote", character: character || undefined }])
    );
  })
];
