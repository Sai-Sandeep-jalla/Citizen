/**
 * @file MetadataContext.jsx
 * @description React Context provider for managing global application metadata.
 */

import { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const MetadataContext = createContext(null);

export const MetadataProvider = ({ children }) => {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await api.getMetadata();
        setMetadata(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load metadata:', err);
        setError('Failed to load application configuration.');
        // Fallback for development if backend isn't ready
        setMetadata({
          COMPLAINT_CATEGORIES: [],
          PRIORITY_LEVELS: [],
          COMPLAINT_STATUSES: {},
          STATES_AND_DISTRICTS: {},
          INDIAN_STATES: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  return (
    <MetadataContext.Provider value={{ metadata, loading, error }}>
      {children}
    </MetadataContext.Provider>
  );
};
