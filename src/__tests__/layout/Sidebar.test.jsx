import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Sidebar from '../../components/layout/Sidebar';

describe('Sidebar Component', () => {
  it('renders navigation links (Dashboard, Analytics, Reports) in expanded mode', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={false} isOpen={true} />
      </MemoryRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
  });

  it('renders circular logo badge in collapsed mini mode', () => {
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={true} isOpen={true} />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('Vyapti Logo');
    expect(logo).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked on mobile', () => {
    const handleClose = vi.fn();
    render(
      <MemoryRouter>
        <Sidebar isCollapsed={false} isOpen={true} onClose={handleClose} />
      </MemoryRouter>
    );

    const closeBtn = screen.getByTitle('Close Navigation Drawer');
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalled();
  });
});
