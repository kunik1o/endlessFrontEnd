import { render, screen } from '@testing-library/react';
import TDL from './TDL';

test('renders learn react link', () => {
  render(<TDL />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
