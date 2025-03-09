// src/components/PackageDetails.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PackageDetails from './PackageDetails';

describe('PackageDetails', () => {
    const mockPackageData = {
        name: 'react',
        author: { name: 'Facebook' }, // Ensure the author field is correctly structured
        time: { '18.2.0': '2023-10-01T12:34:56.789Z' },
        description: 'A JavaScript library for building user interfaces.',
        license: 'MIT',
        readme: 'React is a JavaScript library for building user interfaces.',
        versions: { '18.2.0': {} },
      };

  const mockOnClose = jest.fn();

  it('renders correctly when open is true', () => {
    render(
      <PackageDetails
        packageData={mockPackageData}
        open={true}
        onClose={mockOnClose}
      />
    );
  
    // Check if the modal is rendered
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('Author: Facebook')).toBeInTheDocument(); // Check for "Author: Facebook"
    expect(screen.getByText('Last Updated: 10/1/2023')).toBeInTheDocument();
    expect(screen.getByText('Latest Version: 18.2.0')).toBeInTheDocument();
    expect(screen.getByText('License: MIT')).toBeInTheDocument();
    expect(screen.getByText('Description: A JavaScript library for building user interfaces.')).toBeInTheDocument();
    expect(screen.getByText('README')).toBeInTheDocument();
    expect(screen.getByText('React is a JavaScript library for building user interfaces.')).toBeInTheDocument();
  });
  
  it('calls onClose when the close button is clicked', () => {
    render(
      <PackageDetails
        packageData={mockPackageData}
        open={true}
        onClose={mockOnClose}
      />
    );

    // Simulate clicking on the close button
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    // Verify that onClose is called
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('displays fallback values for missing fields', () => {
    const mockPackageDataWithMissingFields = {
      name: 'lodash',
      time: {}, // No versions or last updated date
      versions: {}, // No versions
    };

    render(
      <PackageDetails
        packageData={mockPackageDataWithMissingFields}
        open={true}
        onClose={mockOnClose}
      />
    );

  });

  it('does not render when open is false', () => {
    render(
      <PackageDetails
        packageData={mockPackageData}
        open={false}
        onClose={mockOnClose}
      />
    );

    // Verify that the modal is not rendered
    expect(screen.queryByText('react')).not.toBeInTheDocument();
  });
});