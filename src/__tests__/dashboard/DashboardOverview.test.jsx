import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import DashboardOverview from '../../components/dashboard/DashboardOverview';

describe('DashboardOverview Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders 4 KPI StatCards with correct counts', () => {
    render(
      <MemoryRouter>
        <DashboardOverview />
      </MemoryRouter>
    );

    expect(screen.getByText('Total Tags')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();

    expect(screen.getByText('Untagged')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();

    expect(screen.getByText('Theft Alerts')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();

    expect(screen.getByText('Potential Loss')).toBeInTheDocument();
    expect(screen.getByText('₹4,250')).toBeInTheDocument();
  });

  it('renders Untagged and Theft alert dual event feeds', () => {
    render(
      <MemoryRouter>
        <DashboardOverview />
      </MemoryRouter>
    );

    expect(screen.getByText('Untagged (Tag Not Removed)')).toBeInTheDocument();
    expect(screen.getByText('Theft & Gate Alarms')).toBeInTheDocument();
  });

  it('triggers shimmer loading on store filter selection', () => {
    render(
      <MemoryRouter>
        <DashboardOverview />
      </MemoryRouter>
    );

    // Open store filter dropdown
    const storeBtn = screen.getByText('All Stores (Overall)');
    fireEvent.click(storeBtn);

    // Select a store
    const storeOption = screen.getByText(/Dwarka/i);
    fireEvent.click(storeOption);

    // Should now be in loading state with skeleton pulse
    expect(screen.getAllByRole('status').length).toBeGreaterThan(0);

    // Fast forward 600ms
    act(() => {
      vi.advanceTimersByTime(650);
    });

    // Loading should complete
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
