import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  return (
    <TextField
      fullWidth
      label="Search NPM Packages"
      variant="outlined"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchBar;