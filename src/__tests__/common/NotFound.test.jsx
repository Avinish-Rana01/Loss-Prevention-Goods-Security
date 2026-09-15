import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import NotFound from '../../components/common/NotFound';

describe('NotFound Component', () => {
  it('renders "Oops! Page Not Found" title and branding elements', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Oops! Page Not Found');
    expect(screen.getByAltText('Vyapti Logo')).toBeInTheDocument();
    expect(screen.getByAltText('404 Page Not Found')).toBeInTheDocument();
  });

  it('renders "Back to Dashboard" button linking to /dashboard', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const backLink = screen.getByRole('link', { name: /back to dashboard/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/dashboard');
  });

  it('renders copyright footer with current year', () => {
    const currentYear = new Date().getFullYear();
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });
});
