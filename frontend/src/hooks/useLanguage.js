/**
 * @file useLanguage.js
 * @description Custom hook providing access to the language context and translation functions.
 */

import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export const useLanguage = () => useContext(LanguageContext);
export default useLanguage;
