import { screen, fireEvent } from '@testing-library/react';
import { server } from '../../mocks/server'; 
import { render } from '../../test-utils'; 
import Cita from './Cita';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('hacer request a la API con texto introducido en el input', async () => {
  render(<Cita />);

  fireEvent.change(screen.getByLabelText('Author Cita'), {
    target: { value: 'Bart' },
  });
  fireEvent.click(screen.getByText(/Obtener Cita/i));

  // Usamos findByText en vez de waitFor + getByText
  const quoteElem = await screen.findByText(/Test Quote/i);

  expect(quoteElem).toBeInTheDocument();
});
