import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TheftByTimeOfDay from '../../components/analytics/TheftByTimeOfDay';

describe('TheftByTimeOfDay Component', () => {
  it('renders "Theft by Time of Day" header and hourly chart slots', () => {
    render(<TheftByTimeOfDay />);

    expect(screen.getByText('Theft by Time of Day')).toBeInTheDocument();
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });

  it('opens detailed hourly breakdown modal when "View Details" is clicked', () => {
    render(<TheftByTimeOfDay />);

    const detailsBtn = screen.getByText('View Details');
    fireEvent.click(detailsBtn);

    expect(screen.getByText('Theft by Time of Day - Detailed Analysis')).toBeInTheDocument();
    expect(screen.getByText('Total Thefts')).toBeInTheDocument();
  });

  it('closes modal when close button is clicked', () => {
    render(<TheftByTimeOfDay />);

    fireEvent.click(screen.getByText('View Details'));
    expect(screen.getByText('Theft by Time of Day - Detailed Analysis')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByText('Theft by Time of Day - Detailed Analysis')).not.toBeInTheDocument();
  });
});
