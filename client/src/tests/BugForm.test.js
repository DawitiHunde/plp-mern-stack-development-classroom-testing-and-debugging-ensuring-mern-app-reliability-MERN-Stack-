import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BugForm from '../components/BugForm';

describe('BugForm Component', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders form with all fields', () => {
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/reported by/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /report bug/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty fields', async () => {
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /report bug/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/description is required/i)).toBeInTheDocument();
      expect(screen.getByText(/reporter name is required/i)).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('shows validation error for short title', async () => {
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'AB' } });
    
    const submitButton = screen.getByRole('button', { name: /report bug/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/title must be at least 3 characters/i)).toBeInTheDocument();
    });
  });

  test('shows validation error for short description', async () => {
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    const descInput = screen.getByLabelText(/description/i);
    fireEvent.change(descInput, { target: { value: 'Short' } });
    
    const submitButton = screen.getByRole('button', { name: /report bug/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/description must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    mockOnSubmit.mockResolvedValue({ success: true });
    
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Test Bug' }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'This is a test bug description' }
    });
    fireEvent.change(screen.getByLabelText(/priority/i), {
      target: { value: 'high' }
    });
    fireEvent.change(screen.getByLabelText(/reported by/i), {
      target: { value: 'John Doe' }
    });

    const submitButton = screen.getByRole('button', { name: /report bug/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Bug',
        description: 'This is a test bug description',
        priority: 'high',
        reportedBy: 'John Doe'
      });
    });
  });

  test('clears form after successful submission', async () => {
    mockOnSubmit.mockResolvedValue({ success: true });
    
    render(<BugForm onSubmit={mockOnSubmit} />);
    
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'Test Bug' } });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'This is a test bug description' }
    });
    fireEvent.change(screen.getByLabelText(/reported by/i), {
      target: { value: 'John Doe' }
    });

    fireEvent.click(screen.getByRole('button', { name: /report bug/i }));

    await waitFor(() => {
      expect(titleInput.value).toBe('');
    });
  });
});
