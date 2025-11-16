import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BugItem from '../components/BugItem';

describe('BugItem Component', () => {
  const mockBug = {
    _id: '1',
    title: 'Test Bug',
    description: 'Test Description',
    status: 'open',
    priority: 'high',
    reportedBy: 'John Doe',
    createdAt: new Date().toISOString()
  };

  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnUpdate.mockClear();
    mockOnDelete.mockClear();
  });

  test('renders bug information correctly', () => {
    render(<BugItem bug={mockBug} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Test Bug')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });

  test('calls onUpdate when status is changed', () => {
    render(<BugItem bug={mockBug} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'resolved' } });

    expect(mockOnUpdate).toHaveBeenCalledWith('1', { status: 'resolved' });
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<BugItem bug={mockBug} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  test('displays correct priority badge', () => {
    render(<BugItem bug={mockBug} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  test('displays correct status badge', () => {
    render(<BugItem bug={mockBug} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('open')).toBeInTheDocument();
  });
});
