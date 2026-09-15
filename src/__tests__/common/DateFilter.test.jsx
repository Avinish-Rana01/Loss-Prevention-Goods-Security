import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DateFilter from '../../components/common/DateFilter';

describe('DateFilter Component', () => {
  it('renders default date label "Today"', () => {
    render(<DateFilter defaultDate="Today" />);

    expect(screen.getByText('Today')).toBeInTheDocument();
  });

  it('opens preset menu when trigger button is clicked', () => {
    render(<DateFilter />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Presets')).toBeInTheDocument();
    expect(screen.getByText('Yesterday')).toBeInTheDocument();
    expect(screen.getByText('Last 7 Days')).toBeInTheDocument();
  });

  it('calls onDateChange when preset option is selected', () => {
    const handleDateChange = vi.fn();
    render(<DateFilter onDateChange={handleDateChange} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Yesterday'));

    expect(handleDateChange).toHaveBeenCalledWith(
      'Yesterday',
      expect.objectContaining({
        preset: 'Yesterday',
        startDate: expect.any(Date),
        endDate: expect.any(Date),
      })
    );
  });
});
