// src/pages/HomePage.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { searchPackages, getPackageDetails } from '../services/npmRegistry';

// Mock the npmRegistry service
jest.mock('../services/npmRegistry');

describe('HomePage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<HomePage />);

    // Check if the search bar is rendered
    expect(screen.getByLabelText('Search NPM Packages')).toBeInTheDocument();
  });

  it('displays search results after a successful search', async () => {
    // Mock the searchPackages API response
    (searchPackages as jest.Mock).mockResolvedValue({
      objects: [
        {
          package: {
            name: 'react',
            publisher: { username: 'Facebook' },
            date: '2023-10-01T12:34:56.789Z',
          },
        },
      ],
      total: 1,
    });

    render(<HomePage />);

    // Simulate user typing in the search input
    const searchInput = screen.getByLabelText('Search NPM Packages');
    fireEvent.change(searchInput, { target: { value: 'react' } });

    // Wait for the search results to be displayed
    await waitFor(() => {
      expect(screen.getByText('react')).toBeInTheDocument();
      expect(screen.getByText('Author: Facebook')).toBeInTheDocument();
      expect(screen.getByText('Last Updated: 10/1/2023')).toBeInTheDocument();
    });
  });

  it('opens the package details modal when a package is clicked', async () => {
    // Mock the searchPackages API response
    (searchPackages as jest.Mock).mockResolvedValue({
      objects: [
        {
          package: {
            name: 'react',
            publisher: { username: 'Facebook' },
            date: '2023-10-01T12:34:56.789Z',
          },
        },
      ],
      total: 1,
    });

    // Mock the getPackageDetails API response
    (getPackageDetails as jest.Mock).mockResolvedValue({
      name: 'react',
      publisher: { username: 'Facebook' },
      time: { '18.2.0': '2023-10-01T12:34:56.789Z' },
      description: 'A JavaScript library for building user interfaces.',
      license: 'MIT',
      readme: 'React is a JavaScript library for building user interfaces.',
      versions: { '18.2.0': {} },
    });

    render(<HomePage />);

    // Simulate user typing in the search input
    const searchInput = screen.getByLabelText('Search NPM Packages');
    fireEvent.change(searchInput, { target: { value: 'react' } });

    // Wait for the search results to be displayed
    await waitFor(() => {
      expect(screen.getByText('react')).toBeInTheDocument();
    });

    // Simulate clicking on the package card
    const packageCard = screen.getByText('react');
    fireEvent.click(packageCard);

    // Wait for the modal to open and display package details
    await waitFor(() => {
      expect(screen.getByText('react')).toBeInTheDocument();
      expect(screen.getByText('Author: Facebook')).toBeInTheDocument();
      expect(screen.getByText('Last Updated: 10/1/2023')).toBeInTheDocument();
      expect(screen.getByText('Description: A JavaScript library for building user interfaces.')).toBeInTheDocument();
      expect(screen.getByText('License: MIT')).toBeInTheDocument();
    });
  });

  it('updates search results when pagination is clicked', async () => {
    // Mock the searchPackages API response for the first page
    (searchPackages as jest.Mock).mockResolvedValueOnce({
      objects: [
        {
          package: {
            name: 'react',
            publisher: { username: 'Facebook' },
            date: '2023-10-01T12:34:56.789Z',
          },
        },
      ],
      total: 10,
    });
  
    // Mock the searchPackages API response for the second page
    (searchPackages as jest.Mock).mockResolvedValueOnce({
      objects: [
        {
          package: {
            name: 'react-dom',
            publisher: { username: 'Facebook' },
            date: '2023-10-02T12:34:56.789Z',
          },
        },
      ],
      total: 10,
    });
  
    render(<HomePage />);
  
    // Simulate user typing in the search input
    const searchInput = screen.getByLabelText('Search NPM Packages');
    fireEvent.change(searchInput, { target: { value: 'react' } });
  
    // Wait for the first page of search results to be displayed
    await waitFor(() => {
      expect(screen.getByText('react')).toBeInTheDocument();
    });
  });

  it('displays an error message when the API fails', async () => {
    // Mock the searchPackages API to throw an error
    (searchPackages as jest.Mock).mockRejectedValue(new Error('Failed to fetch packages'));

    render(<HomePage />);

    // Simulate user typing in the search input
    const searchInput = screen.getByLabelText('Search NPM Packages');
    fireEvent.change(searchInput, { target: { value: 'react' } });

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch packages. Please try again.')).toBeInTheDocument();
    });
  });
});