import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../../components/layout/Footer';

describe('Footer Component', () => {
  it('renders copyright with current year and version badge', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);

    expect(screen.getByText(new RegExp(`© ${currentYear} TeCMi Vyapti`))).toBeInTheDocument();
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
  });
});
