import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BugForm from './BugForm';

describe('BugForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders all form fields', () => {
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/reported by/i)).toBeInTheDocument();
  });

  test('validates title field', async () => {
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /report bug/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/title must be at least 3 characters/i)).toBeInTheDocument();
    });
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('validates description field', async () => {
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);
    const reporterInput = screen.getByLabelText(/reported by/i);
    
    await userEvent.type(titleInput, 'Valid Title');
    await userEvent.type(descInput, 'Short');
    await userEvent.type(reporterInput, 'John');
    
    const submitButton = screen.getByRole('button', { name: /report bug/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/description must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);
    const reporterInput = screen.getByLabelText(/reported by/i);
    
    await userEvent.type(titleInput, 'Valid Bug Title');
    await userEvent.type(descInput, 'This is a valid bug description');
    await userEvent.type(reporterInput, 'John Doe');
    
    const submitButton = screen.getByRole('button', { name: /report bug/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Valid Bug Title',
        description: 'This is a valid bug description',
        status: 'open',
        priority: 'medium',
        reportedBy: 'John Doe'
      });
    });
  });

  test('clears form after successful submission', async () => {
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    await userEvent.type(titleInput, 'Test Bug');
    
    const descInput = screen.getByLabelText(/description/i);
    await userEvent.type(descInput, 'Test description here');
    
    const reporterInput = screen.getByLabelText(/reported by/i);
    await userEvent.type(reporterInput, 'Tester');
    
    const submitButton = screen.getByRole('button', { name: /report bug/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(titleInput.value).toBe('');
      expect(descInput.value).toBe('');
      expect(reporterInput.value).toBe('');
    });
  });

  test('changes status and priority', async () => {
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    const statusSelect = screen.getByLabelText(/status/i);
    const prioritySelect = screen.getByLabelText(/priority/i);
    
    await userEvent.selectOptions(statusSelect, 'in-progress');
    await userEvent.selectOptions(prioritySelect, 'high');
    
    expect(statusSelect.value).toBe('in-progress');
    expect(prioritySelect.value).toBe('high');
  });
});
