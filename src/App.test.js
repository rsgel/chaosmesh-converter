import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Chaos Mesh JSON Builder/i });
  expect(heading).toBeInTheDocument();
});
