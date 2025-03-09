// src/components/PackageList.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PackageList from './PackageList';

describe('PackageList', () => {
  const mockPackages = [
    {
      package: {
        name: 'react',
        publisher: { email: 'facebook@example.com', username: 'Facebook' },
        date: '2023-10-01T12:34:56.789Z',
      },
    },
    {
      package: {
        name: 'react-dom',
        publisher: { email: 'facebook@example.com', username: 'Facebook' },
        date: '2023-10-02T12:34:56.789Z',
      },
    },
  ];

  it('renders correctly', () => {
    const onPackageClickMock = jest.fn();
    render(
      <PackageList
        packages={mockPackages}
        onPackageClick={onPackageClickMock}
      />
    );

    // Check if the package cards are rendered
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('react-dom')).toBeInTheDocument();
  });

  it('displays package details correctly', () => {
    const onPackageClickMock = jest.fn();
    render(
      <PackageList
        packages={mockPackages}
        onPackageClick={onPackageClickMock}
      />
    );

  });

  it('calls onPackageClick when a package card is clicked', () => {
    const onPackageClickMock = jest.fn();
    render(
      <PackageList
        packages={mockPackages}
        onPackageClick={onPackageClickMock}
      />
    );

    // Simulate clicking on the first package card
    const packageCard = screen.getByText('react');
    fireEvent.click(packageCard);

    // Verify that onPackageClick is called with the correct package name
    expect(onPackageClickMock).toHaveBeenCalledWith('react');
  });

  it('displays "Unknown" author if publisher username is not provided', () => {
    const mockPackagesWithoutPublisher = [
      {
        package: {
          name: 'lodash',
          date: '2023-10-03T12:34:56.789Z',
        },
      },
    ];

    const onPackageClickMock = jest.fn();
    render(
      <PackageList
        packages={mockPackagesWithoutPublisher}
        onPackageClick={onPackageClickMock}
      />
    );

    // Verify that "Unknown" is displayed as the author
    expect(screen.getByText('Author: Unknown')).toBeInTheDocument();
  });

  it('does not call onPackageClick when no packages are provided', () => {
    const onPackageClickMock = jest.fn();
    render(
      <PackageList
        packages={[]}
        onPackageClick={onPackageClickMock}
      />
    );

    // Verify that onPackageClick is not called
    expect(onPackageClickMock).not.toHaveBeenCalled();
  });
});