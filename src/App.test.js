import { render, screen } from '@testing-library/react';
import App from './App';

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
