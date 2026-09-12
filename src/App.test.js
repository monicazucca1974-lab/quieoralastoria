import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import curiosita from './curiosita';

test('mostra il titolo e il sottotitolo dell\'app', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /qui e ora/i })).toBeInTheDocument();
  expect(screen.getByText(/la storia a portata di mano/i)).toBeInTheDocument();
});

test('mostra il bottone per trovare la posizione', () => {
  render(<App />);
  expect(
    screen.getByRole('button', { name: /trova la mia posizione/i })
  ).toBeInTheDocument();
});

test('elenca gli eventi storici', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /inaugurazione del colosseo/i })
  ).toBeInTheDocument();
});

test('il tasto "Lo sapevi che" mostra una curiosità', () => {
  render(<App />);
  const tasto = screen.getByRole('button', { name: /lo sapevi che/i });
  userEvent.click(tasto);
  const testiCuriosita = curiosita.map((c) => screen.queryByText(c));
  expect(testiCuriosita.some((el) => el !== null)).toBe(true);
});

test('la ricerca filtra gli eventi per titolo', () => {
  render(<App />);
  const campo = screen.getByLabelText(/cerca luogo, evento, personaggio/i);
  userEvent.type(campo, 'Colosseo');
  expect(screen.getByRole('heading', { name: /inaugurazione del colosseo/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /assassinio di giulio cesare/i })).not.toBeInTheDocument();
});

test('il filtro epoca mostra solo gli eventi della categoria scelta', () => {
  render(<App />);
  const selezione = screen.getByLabelText(/^epoca$/i);
  userEvent.selectOptions(selezione, 'Novecento');
  expect(screen.getByRole('heading', { name: /nascita della repubblica italiana/i })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /inaugurazione del colosseo/i })).not.toBeInTheDocument();
});

test('si può aggiungere e togliere un evento dai preferiti', () => {
  render(<App />);
  const tastoPreferito = screen.getByRole('button', { name: /aggiungi inaugurazione del colosseo ai preferiti/i });
  userEvent.click(tastoPreferito);
  expect(screen.getByRole('button', { name: /rimuovi inaugurazione del colosseo dai preferiti/i })).toBeInTheDocument();
  expect(screen.getByText(/★ solo preferiti \(1\)/i)).toBeInTheDocument();
});
