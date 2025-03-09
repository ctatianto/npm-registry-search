// src/components/SearchBar.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders correctly', () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    // Check if the search input is rendered
    const searchInput = screen.getByLabelText('Search NPM Packages');
    expect(searchInput).toBeInTheDocument();
  });

  it('calls onSearch with the correct value after debouncing', async () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    // Simulate user typing in the search input
    const searchInput = screen.getByLabelText('Search NPM Packages');
    fireEvent.change(searchInput, { target: { value: 'react' } });

    // Wait for the debounce timeout (500ms in this case)
    await waitFor(() => expect(onSearchMock).toHaveBeenCalledWith('react'), {
      timeout: 600, // Slightly longer than the debounce timeout
    });
  });

  it('does not call onSearch if the input is empty', async () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    // Simulate user typing an empty string
    const searchInput = screen.getByLabelText('Search NPM Packages');
    fireEvent.change(searchInput, { target: { value: '' } });

    // Wait for the debounce timeout
    await waitFor(() => expect(onSearchMock).not.toHaveBeenCalled(), {
      timeout: 600,
    });
  });
});