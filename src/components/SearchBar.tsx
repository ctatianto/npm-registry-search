// src/components/SearchBar.tsx
import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Debounce the search to avoid calling onSearch on every keystroke
    const debounceTimer = setTimeout(() => {
      if (query.trim()) {
        onSearch(query); // Only call onSearch if the query is not empty
      }
    }, 500); // 500ms debounce delay

    // Cleanup the timer on every keystroke
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