import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DebounceSearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [results, setResults] = useState([]);

  // Handle the debouncing mechanism
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); // 500ms debounce time

    return () => {
      clearTimeout(timerId); // Cleanup timer
    };
  }, [searchTerm]);

  // API call whenever debouncedTerm changes
  useEffect(() => {
    if (debouncedTerm) {
      const fetchResults = async () => {
        try {
          // Replace this with your actual API endpoint
          const response = await axios.get(`https://api.example.com/search?q=${debouncedTerm}`);
          setResults(response.data.results); // Assuming the API returns a 'results' array
        } catch (error) {
          console.error('Error fetching results', error);
        }
      };

      fetchResults();
    } else {
      setResults([]);
    }
  }, [debouncedTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default DebounceSearchInput;
