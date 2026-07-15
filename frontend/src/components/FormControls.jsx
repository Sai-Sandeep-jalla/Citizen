import { forwardRef } from 'react';
import { Search, X } from 'lucide-react';

export const Input = forwardRef(({
  label,
  name,
  type = 'text',
  error,
  placeholder,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={`
          block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition duration-200 outline-none
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'}
          bg-white text-gray-800 placeholder-gray-400
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 font-medium">{error.message || error}</p>
      )}
    </div>
  );
});

export const TextArea = forwardRef(({
  label,
  name,
  error,
  placeholder,
  rows = 4,
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        name={name}
        id={name}
        rows={rows}
        placeholder={placeholder}
        className={`
          block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition duration-200 outline-none resize-none
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'}
          bg-white text-gray-800 placeholder-gray-400
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 font-medium">{error.message || error}</p>
      )}
    </div>
  );
});

export const Dropdown = forwardRef(({
  label,
  name,
  error,
  options = [],
  emptyOption = 'Select an option',
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          name={name}
          id={name}
          className={`
            block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition duration-200 outline-none appearance-none bg-white text-gray-800
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'}
          `}
          {...props}
        >
          <option value="">{emptyOption}</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value !== undefined ? opt.value : opt}>
              {opt.label !== undefined ? opt.label : opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium">{error.message || error}</p>
      )}
    </div>
  );
});

export const SearchBox = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className = ''
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <Search className="h-4.5 w-4.5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-9 py-2 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400 text-gray-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm transition"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-650"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
