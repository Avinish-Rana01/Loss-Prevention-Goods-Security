import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TheftByDayOfWeek from '../../components/analytics/TheftByDayOfWeek';

describe('TheftByDayOfWeek Component', () => {
  it('renders "Theft by Day of Week" header and days of week', () => {
    render(<TheftByDayOfWeek />);

    expect(screen.getByText('Theft by Day of Week')).toBeInTheDocument();
    expect(screen.getByText('Weekly Trends')).toBeInTheDocument();
  });

  it('opens weekly distribution modal when "View Details" is clicked', () => {
    render(<TheftByDayOfWeek />);

    const detailsBtn = screen.getByText('View Details');
    fireEvent.click(detailsBtn);

    expect(screen.getByText('Theft by Day of Week - Weekly Trends')).toBeInTheDocument();
    expect(screen.getByText('Weekly Total')).toBeInTheDocument();
  });
});
