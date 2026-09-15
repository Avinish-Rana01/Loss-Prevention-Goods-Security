import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StoreFilter from '../../components/common/StoreFilter';

describe('StoreFilter Component', () => {
  const customStores = [
    { id: 'all', storeCode: '', name: 'All Stores Network', location: 'Pan-India' },
    { id: 'HD55', storeCode: 'HD55', name: 'Downtown Flagship', location: 'Mumbai' },
    { id: 'ST12', storeCode: 'ST12', name: 'Metro Mall', location: 'Bengaluru' },
  ];

  it('renders default "All Stores" selection initially', () => {
    render(<StoreFilter stores={customStores} defaultStore="all" />);

    expect(screen.getByText('All Stores Network')).toBeInTheDocument();
  });

  it('opens store list menu when dropdown button is clicked', () => {
    render(<StoreFilter stores={customStores} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText(/Downtown Flagship/i)).toBeInTheDocument();
    expect(screen.getByText(/Metro Mall/i)).toBeInTheDocument();
  });

  it('filters stores by search keyword', () => {
    render(<StoreFilter stores={customStores} />);

    fireEvent.click(screen.getByRole('button'));

    const searchInput = screen.getByPlaceholderText('Search store name or city...');
    fireEvent.change(searchInput, { target: { value: 'Metro' } });

    expect(screen.getByText(/Metro Mall/i)).toBeInTheDocument();
    expect(screen.queryByText(/Downtown Flagship/i)).not.toBeInTheDocument();
  });

  it('triggers onStoreChange callback when a store is selected', () => {
    const handleStoreChange = vi.fn();
    render(<StoreFilter stores={customStores} onStoreChange={handleStoreChange} />);

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText(/Downtown Flagship/i));

    expect(handleStoreChange).toHaveBeenCalledWith('HD55');
  });
});
