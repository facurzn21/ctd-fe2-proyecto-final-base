
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Noticias from '../Noticias';
import { obtenerNoticias } from '../fakeRest'; 
import { INoticiasNormalizadas } from '../types'; 

jest.mock('../fakeRest'); 

describe('Noticias Component', () => {
  const mockNoticias: INoticiasNormalizadas[] = [
    {
      id: 1,
      titulo: 'Noticia 1',
      descripcion: 'Descripción de la noticia 1',
      fecha: new Date('2024-06-25T08:00:00Z'),
      esPremium: false,
      imagen: 'imagen-noticia-1.jpg',
      descripcionCorta: 'Descripción corta de la noticia 1',
    },
    {
      id: 2,
      titulo: 'Noticia 2',
      descripcion: 'Descripción de la noticia 2',
      fecha: new Date('2024-06-24T09:00:00Z'),
      esPremium: true,
      imagen: 'imagen-noticia-2.jpg',
      descripcionCorta: 'Descripción corta de la noticia 2',
    },
  ];

  beforeEach(() => {
    (obtenerNoticias as jest.Mock).mockImplementation(async () => mockNoticias); // Mockear la función obtenerNoticias para que devuelva mockNoticias
  });

  test('should render noticias', async () => {
    render(<Noticias />);

    // Verificar que el título de las noticias se renderice correctamente
    const tituloNoticias = screen.getByText('Noticias de los Simpsons');
    expect(tituloNoticias).toBeInTheDocument();

    // Verificar que todas las noticias se rendericen correctamente
    const noticiasElements = await screen.findAllByRole('article');
    expect(noticiasElements).toHaveLength(mockNoticias.length);
  });

  test('should open and close modal on button click', async () => {
    render(<Noticias />);

    // Verificar que el modal no está presente inicialmente
    expect(screen.queryByTestId('noticia-modal')).not.toBeInTheDocument();

    // Hacer clic en el botón "Ver más" de la primera noticia
    const verMasButton = screen.getByText('Ver más');
    userEvent.click(verMasButton);

    // Verificar que el modal se abre correctamente
    const modalImage = await screen.findByRole('img', { name: /news-image/i });
    expect(modalImage).toBeInTheDocument();

    // Hacer clic en el botón de cerrar modal
    const cerrarModalButton = screen.getByTestId('cerrar-modal-button');
    userEvent.click(cerrarModalButton);

    // Verificar que el modal se cierra correctamente
    await waitFor(() => {
      expect(screen.queryByTestId('noticia-modal')).not.toBeInTheDocument();
    });
  });

  test('should render subscription modal for premium news', async () => {
    render(<Noticias />);

    // Hacer clic en el botón "Ver más" de la segunda noticia (premium)
    const verMasPremiumButton = await screen.findByText('Ver más', { selector: '[data-premium=true]' });
    userEvent.click(verMasPremiumButton);

    // Verificar que el modal de suscripción se renderice correctamente
    const suscribeteButton = screen.getByRole('button', { name: /suscríbete/i });
    expect(suscribeteButton).toBeInTheDocument();
  });
});
