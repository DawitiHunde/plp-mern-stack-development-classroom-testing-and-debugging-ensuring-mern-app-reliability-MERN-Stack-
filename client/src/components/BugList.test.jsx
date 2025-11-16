import React from 'react';
import { render, screen } from '@testing-library/react';
import BugList from './BugList';

describe('BugList Component', () => {
  const mockBugs = [
    {
      _id: '1',
      title: 'Bug 1',
      description: 'Description 1',
      status: 'open',
      priority: 'high',
      reportedBy: 'User 1',
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      title: 'Bug 2',
      description: 'Description 2',
      status: 'in-progress',
      priority: 'medium',
      reportedBy: 'User 2',
      createdAt: new Date().toISOString()
    }
  ];

  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  test('renders loading state', () => {
    render(
      <BugList
        bugs={[]}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        loading={true}
        error={null}
      />
    );
    
    expect(screen.getByText(/loading bugs/i)).toBeInTheDocument();
  });

  test('renders error state', () => {
    render(
      <BugList
        bugs={[]}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        loading={false}
        error="Failed to fetch bugs"
      />
    );
    
    expect(screen.getByText(/error: failed to fetch bugs/i)).toBeInTheDocument();
  });

  test('renders empty state when no bugs', () => {
    render(
      <BugList
        bugs={[]}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        loading={false}
        error={null}
      />
    );
    
    expect(screen.getByText(/no bugs reported yet/i)).toBeInTheDocument();
  });

  test('renders list of bugs', () => {
    render(
      <BugList
        bugs={mockBugs}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        loading={false}
        error={null}
      />
    );
    
    expect(screen.getByText(/reported bugs \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText('Bug 1')).toBeInTheDocument();
    expect(screen.getByText('Bug 2')).toBeInTheDocument();
  });

  test('displays correct bug count', () => {
    render(
      <BugList
        bugs={mockBugs}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        loading={false}
        error={null}
      />
    );
    
    expect(screen.getByText(/reported bugs \(2\)/i)).toBeInTheDocument();
  });
});
