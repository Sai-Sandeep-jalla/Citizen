import { Shield, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

export const AuthLayout = ({ children }) => {
  const { darkMode } = useTheme();
  const { lang, changeLanguage } = useLanguage();

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-250 ${darkMode ? 'dark bg-gray-900' : ''} relative`}>
      {/* Floating Language Dropdown */}
      <div className="absolute top-4 right-4 z-30">
        <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-white text-gray-700 border border-gray-200 text-xs font-black rounded-lg shadow-xs">
          <Globe className="w-3.5 h-3.5 text-[#F97316]" />
          <select
            value={lang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-transparent border-0 text-xs font-black text-gray-700 focus:ring-0 focus:outline-none cursor-pointer pr-1"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="te">తెలుగు (Telugu)</option>
          </select>
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        
        {/* Brand/Logo */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
            <Shield className="w-7 h-7 fill-white/10" />
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wide">
            Citizen Grievance Portal
          </h2>
          <p className="mt-1.5 text-xs font-semibold text-primary dark:text-lightgreen tracking-wider uppercase">
            Government of India / भारत सरकार
          </p>
        </div>

        {/* Form panel wrapper */}
        <div className="mt-8 space-y-6">
          {children}
        </div>

      </div>
    </div>
  );
};
export default AuthLayout;
