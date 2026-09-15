import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import PageHeader from '../../components/common/PageHeader';

describe('PageHeader Component', () => {
  it('renders explicit title and subtitle accurately', () => {
    render(
      <MemoryRouter>
        <PageHeader title="Store Reports" subtitle="Comprehensive audit logs" />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Store Reports');
    expect(screen.getByText('Comprehensive audit logs')).toBeInTheDocument();
  });

  it('auto-detects page title from route path when title prop is omitted', () => {
    render(
      <MemoryRouter initialEntries={['/analytics']}>
        <PageHeader />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Analytics');
  });

  it('renders children action elements on the right slot', () => {
    render(
      <MemoryRouter>
        <PageHeader title="Dashboard">
          <button data-testid="export-btn">Export</button>
        </PageHeader>
      </MemoryRouter>
    );

    expect(screen.getByTestId('export-btn')).toBeInTheDocument();
  });
});
