// src/pages/HomePage.tsx
import { useState, useCallback } from 'react'; // Add useCallback
import { Container, Pagination, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import PackageList from '../components/PackageList';
import PackageDetails from '../components/PackageDetails';
import { searchPackages, getPackageDetails } from '../services/npmRegistry';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [packages, setPackages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string, page: number) => {
    if (!query) {
      setPackages([]);
      setTotalPages(1); // Reset total pages
      setError(null);
      return;
    }

    try {
      const { objects, total } = await searchPackages(query, page);
      setPackages(objects);
      setTotalPages(Math.ceil(total / 10)); // Calculate total pages based on total results
      setError(null);
    } catch (err) {
      setError('Failed to fetch packages. Please try again.');
      setPackages([]);
      setTotalPages(1); // Reset total pages on error
    }
  };

  const handlePackageClick = async (packageName: string) => {
    try {
      const packageData = await getPackageDetails(packageName);
      setSelectedPackage(packageData);
      setIsModalOpen(true);
    } catch (err) {
      setError('Failed to fetch package details. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value); // Update the page state
    handleSearch(query, value); // Fetch new results for the selected page
  };

  // Memoize handleNewSearch to prevent unnecessary re-renders
  const handleNewSearch = useCallback((query: string) => {
    setQuery(query); // Update the query state
    setPage(1); // Reset page to 1 for a new search
    handleSearch(query, 1); // Perform the search for the first page
  }, []); // Empty dependency array ensures this function is memoized

  return (
    <Container>
      <SearchBar onSearch={handleNewSearch} /> {/* Use memoized handleNewSearch */}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <PackageList
        packages={packages}
        onPackageClick={handlePackageClick}
      />
      {packages.length > 0 && ( // Conditionally render pagination
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        />
      )}
      {selectedPackage && (
        <PackageDetails
          packageData={selectedPackage}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default HomePage;