import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataTable from '../../components/common/DataTable';

describe('DataTable Component', () => {
  const columns = [
    { id: 'id', name: 'ID', selector: (row) => row.id, sortable: true },
    { id: 'name', name: 'Product Name', selector: (row) => row.name, sortable: true },
    { id: 'qty', name: 'Quantity', selector: (row) => row.qty, sortable: true, right: true },
  ];

  const data = [
    { id: 1, name: 'Denim Jeans', qty: 10 },
    { id: 2, name: 'Cotton Shirt', qty: 25 },
    { id: 3, name: 'Leather Jacket', qty: 5 },
  ];

  it('renders table headers and data rows accurately', () => {
    render(<DataTable columns={columns} data={data} />);

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument();

    expect(screen.getByText('Denim Jeans')).toBeInTheDocument();
    expect(screen.getByText('Cotton Shirt')).toBeInTheDocument();
    expect(screen.getByText('Leather Jacket')).toBeInTheDocument();
  });

  it('sorts rows when sortable column header is clicked', () => {
    render(<DataTable columns={columns} data={data} />);

    const nameHeader = screen.getByText('Product Name');
    // First click: sorts ascending (Cotton Shirt, Denim Jeans, Leather Jacket)
    fireEvent.click(nameHeader);

    const cells = screen.getAllByRole('cell');
    expect(cells.some((c) => c.textContent === 'Cotton Shirt')).toBe(true);

    // Second click: sorts descending
    fireEvent.click(nameHeader);
    expect(screen.getByText('Leather Jacket')).toBeInTheDocument();
  });

  it('renders empty state when data array is empty', () => {
    render(<DataTable columns={columns} data={[]} />);

    expect(screen.getByText('There are no records to display')).toBeInTheDocument();
  });

  it('renders skeleton shimmer rows when progressPending is true', () => {
    const { container } = render(<DataTable columns={columns} data={data} progressPending={true} />);

    expect(container.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
    expect(screen.queryByText('Denim Jeans')).not.toBeInTheDocument();
  });

  it('triggers onRowClicked callback when row is clicked', () => {
    const handleRowClick = vi.fn();
    render(<DataTable columns={columns} data={data} onRowClicked={handleRowClick} />);

    const rowItem = screen.getByText('Denim Jeans');
    fireEvent.click(rowItem);

    expect(handleRowClick).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Denim Jeans' }),
      expect.any(Object)
    );
  });

  it('renders subHeaderComponent when subHeader is true', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        subHeader={true}
        subHeaderComponent={<div data-testid="test-toolbar">Search Toolbar</div>}
      />
    );

    expect(screen.getByTestId('test-toolbar')).toBeInTheDocument();
  });
});
