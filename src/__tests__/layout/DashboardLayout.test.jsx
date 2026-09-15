import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import DashboardLayout from '../../components/layout/DashboardLayout';

describe('DashboardLayout Component', () => {
  it('renders sidebar, top navbar, footer, and children content slot', () => {
    render(
      <MemoryRouter>
        <DashboardLayout user={{ username: 'Manish' }}>
          <div data-testid="dashboard-content">Operational Metrics Content</div>
        </DashboardLayout>
      </MemoryRouter>
    );

    expect(screen.getByText('Loss Prevention & Goods Security')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
    expect(screen.getByText(/TeCMi Vyapti/i)).toBeInTheDocument();
  });
});
