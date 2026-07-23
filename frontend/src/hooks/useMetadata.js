/**
 * @file useMetadata.js
 * @description Custom hook providing access to the application metadata context.
 */

import { useContext } from 'react';
import { MetadataContext } from '../context/MetadataContext';

export const useMetadata = () => {
  const context = useContext(MetadataContext);
  if (context === undefined) {
    throw new Error('useMetadata must be used within a MetadataProvider');
  }
  return context;
};
