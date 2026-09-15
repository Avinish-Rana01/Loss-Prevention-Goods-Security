import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TopNavbar from '../../components/layout/TopNavbar';

describe('TopNavbar Component', () => {
  it('renders application title and subtitle', () => {
    render(<TopNavbar />);

    expect(screen.getByText('Loss Prevention & Goods Security')).toBeInTheDocument();
    expect(screen.getByText(/Real-time monitoring of your store's inventory/i)).toBeInTheDocument();
  });

  it('calls onToggleSidebar when hamburger menu button is clicked', () => {
    const handleToggle = vi.fn();
    render(<TopNavbar onToggleSidebar={handleToggle} />);

    const toggleBtn = screen.getByLabelText('Toggle Navigation Sidebar');
    fireEvent.click(toggleBtn);

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('toggles notifications dropdown when bell icon is clicked', () => {
    render(<TopNavbar />);

    const bellBtn = screen.getByTitle('Theft & Security Alerts');
    fireEvent.click(bellBtn);

    expect(screen.getByText('Security Alerts')).toBeInTheDocument();
    expect(screen.getByText('2 New')).toBeInTheDocument();
  });

  it('renders user initials and handles logout action', () => {
    const handleLogout = vi.fn();
    render(<TopNavbar user={{ username: 'Manish' }} onLogout={handleLogout} />);

    expect(screen.getByText('MA')).toBeInTheDocument();

    // Click profile dropdown
    const profileBtn = screen.getByText('MA').closest('button');
    fireEvent.click(profileBtn);

    expect(screen.getByText('Store Manager')).toBeInTheDocument();
    const logoutBtn = screen.getByText('Sign Out');
    fireEvent.click(logoutBtn);

    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});
