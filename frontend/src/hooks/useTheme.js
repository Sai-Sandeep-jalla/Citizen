/**
 * @file useTheme.js
 * @description Custom hook providing access to the theme context and toggle functionality.
 */

import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useTheme = () => useContext(ThemeContext);
export default useTheme;
