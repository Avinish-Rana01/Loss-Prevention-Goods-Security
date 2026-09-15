import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EpcCard from '../../components/common/EpcCard';

describe('EpcCard Component', () => {
  const mockProps = {
    articleDescription: 'Men Slim Fit Denim Jeans',
    articleNo: 'ART-10492',
    epc: 'E280116060000219C15234A1',
    amount: 2499,
    date: '14-09-2026',
    time: '14:22',
    variant: 'theft',
  };

  it('renders article description, article number, and EPC code accurately', () => {
    render(<EpcCard {...mockProps} />);

    expect(screen.getByText('Men Slim Fit Denim Jeans')).toBeInTheDocument();
    expect(screen.getByText('ART-10492')).toBeInTheDocument();
    expect(screen.getByText('E280116060000219C15234A1')).toBeInTheDocument();
  });

  it('renders formatted Indian Rupee amount with currency symbol', () => {
    render(<EpcCard {...mockProps} />);

    expect(screen.getByText('₹2,499')).toBeInTheDocument();
  });

  it('renders date and time timestamp accurately', () => {
    render(<EpcCard {...mockProps} />);

    expect(screen.getByText('14-09-2026')).toBeInTheDocument();
    expect(screen.getByText('14:22')).toBeInTheDocument();
  });

  it('renders "Theft Alert" badge with rose styling when variant="theft"', () => {
    render(<EpcCard {...mockProps} variant="theft" />);

    expect(screen.getByText('Theft Alert')).toBeInTheDocument();
  });

  it('renders "Tag Not Removed" badge with sky styling when variant="untagged"', () => {
    render(<EpcCard {...mockProps} variant="untagged" />);

    expect(screen.getByText('Tag Not Removed')).toBeInTheDocument();
  });

  it('renders custom status badge when provided', () => {
    render(<EpcCard {...mockProps} status="Gate Alarm Triggered" />);

    expect(screen.getByText('Gate Alarm Triggered')).toBeInTheDocument();
  });

  it('renders skeleton shimmer state when loading is true', () => {
    render(<EpcCard {...mockProps} loading={true} />);

    expect(screen.getByRole('status', { name: /loading epc card/i })).toBeInTheDocument();
    expect(screen.queryByText('ART-10492')).not.toBeInTheDocument();
  });
});
