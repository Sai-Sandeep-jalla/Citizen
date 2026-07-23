/**
 * @file useAuth.js
 * @description Custom hook providing access to the authentication context and related methods.
 */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => useContext(AuthContext);
export default useAuth;
