/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { render, screen } from '@testing-library/react';
import Home from '../../pages';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);
    const { container } = render(<Home />);
    const header = screen.findByText(/Hello World/i);

    expect(header).toBeDefined();
    expect(container).toMatchSnapshot();

    screen.debug();
  });
});
