import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TagStatusDistributionChart from '../../components/analytics/TagStatusDistributionChart';

describe('TagStatusDistributionChart Component', () => {
  it('renders 3D pie chart header, legend labels, and potential loss bar', () => {
    render(<TagStatusDistributionChart />);

    expect(screen.getByText('Tag Status Distribution (3D)')).toBeInTheDocument();
    expect(screen.getByText(/Potential Loss:/i)).toBeInTheDocument();
    expect(screen.getByText(/₹4,23,010/i)).toBeInTheDocument();
  });

  it('renders slice legend cards for Total Tags, Untagged, and Theft Alerts', () => {
    render(<TagStatusDistributionChart />);

    expect(screen.getByText('Total Tags')).toBeInTheDocument();
    expect(screen.getAllByText(/12,568/i).length).toBeGreaterThan(0);

    expect(screen.getByText('Untagged')).toBeInTheDocument();
    expect(screen.getByText('315')).toBeInTheDocument();

    expect(screen.getByText('Theft Alerts')).toBeInTheDocument();
    expect(screen.getByText('280')).toBeInTheDocument();
  });

  it('updates dynamic focus indicator on slice hover', () => {
    render(<TagStatusDistributionChart />);

    expect(screen.getByText('Hover slices to inspect 3D layers')).toBeInTheDocument();

    const untaggedCard = screen.getByText('Untagged').closest('div');
    fireEvent.mouseEnter(untaggedCard);

    expect(screen.getByText('(2.5%)')).toBeInTheDocument();
  });
});
