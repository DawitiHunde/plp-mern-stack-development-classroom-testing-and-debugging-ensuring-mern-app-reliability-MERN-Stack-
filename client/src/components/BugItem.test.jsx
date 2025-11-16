import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BugItem from './BugItem';

describe('BugItem Component', () => {
  const mockBug = {
    _id: '123',
    title: 'Test Bug',
    description: 'Test description',
    status: 'open',
    priority: 'high',
    reportedBy: 'John Doe',
    createdAt: new Date('2024-01-01').toISOString()
  };

  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnUpdate.mockClear();
    mockOnDelete.mockClear();
    window.confirm = jest.fn(() => true);
  });

  test('renders bug information', () => {
    render(
      <BugItem
        bug={mockBug}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );
    
    expect(screen.getByText('Test Bug')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText(/reported by: john doe/i)).toBeInTheDocument();
  });

  test('displays priority badge', () => {
    render(
      <BugItem
        bug={mockBug}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );
    
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  test('calls onUpdate when status changes', async () => {
    render(
      <BugItem
        bug={mockBug}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );
    
    const statusSelect = screen.getByRole('combobox');
    await userEvent.selectOptions(statusSelect, 'in-progress');
    
    expect(mockOnUpdate).toHaveBeenCalledWith('123', { status: 'in-progress' });
  });

  test('calls onDelete when delete button clicked', () => {
    render(
      <BugItem
        bug={mockBug}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockOnDelete).toHaveBeenCalledWith('123');
  });

  test('does not delete if user cancels confirmation', () => {
    window.confirm = jest.fn(() => false);
    
    render(
      <BugItem
        bug={mockBug}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    expect(window.confirm).toHaveBeenCalled();
    expect(mockOnDelete).not.toHaveBeenCalled();
  });
});
