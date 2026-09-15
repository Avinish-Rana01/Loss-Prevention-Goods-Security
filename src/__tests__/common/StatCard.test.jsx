import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatCard from '../../components/common/StatCard';
import { Tag } from 'lucide-react';

describe('StatCard Component', () => {
  it('renders title and count value accurately', () => {
    render(<StatCard title="Total Tags" count="12,568" icon={Tag} variant="green" />);

    expect(screen.getByText('Total Tags')).toBeInTheDocument();
    expect(screen.getByText('12,568')).toBeInTheDocument();
  });

  it('falls back to default title "NA" and count "0" when props are omitted', () => {
    render(<StatCard />);

    expect(screen.getByText('NA')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders alternative prop "text" as title if "title" is not provided', () => {
    render(<StatCard text="Potential Loss" count="₹4,23,010" variant="rose" />);

    expect(screen.getByText('Potential Loss')).toBeInTheDocument();
    expect(screen.getByText('₹4,23,010')).toBeInTheDocument();
  });

  it('applies correct variant styling classes', () => {
    const { container } = render(<StatCard title="Theft Alerts" count="280" variant="rose" />);
    const card = container.firstChild;
    expect(card).toHaveClass('from-[#ffe4e6]');
  });

  it('renders skeleton shimmer bars when loading is true', () => {
    const { container } = render(<StatCard title="Untagged" count="315" loading={true} />);

    // In loading state, skeleton shimmer element with role="status" is rendered
    expect(screen.getByRole('status', { name: /loading metric/i })).toBeInTheDocument();
    const animatedElements = container.querySelectorAll('.animate-shimmer');
    expect(animatedElements.length).toBeGreaterThan(0);
    // Count value text should not be visible when loading
    expect(screen.queryByText('315')).not.toBeInTheDocument();
  });

  it('renders custom icon when provided as component', () => {
    const CustomIcon = () => <span data-testid="custom-icon">ICON</span>;
    render(<StatCard title="Items" count="50" icon={CustomIcon} />);

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
