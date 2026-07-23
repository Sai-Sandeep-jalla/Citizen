/**
 * @file Pagination.jsx
 * @description Pagination component for navigating through large lists of data.
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../hooks/useLanguage';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
  className = ''
}) => {
  const { t } = useLanguage();

  if (totalPages <= 1) return null;

  const startIdx = (currentPage - 1) * itemsPerPage + 1;
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const getCountHtml = () => {
    const template = t('showingEntries') || 'Showing {start} to {end} of {total} entries';
    const safeStart = `<span class="font-semibold text-gray-800">${startIdx}</span>`;
    const safeEnd = `<span class="font-semibold text-gray-800">${endIdx}</span>`;
    const safeTotal = `<span class="font-semibold text-gray-800">${totalItems}</span>`;
    return template
      .replace('{start}', safeStart)
      .replace('{end}', safeEnd)
      .replace('{total}', safeTotal);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-1 bg-transparent ${className}`}>
      {/* Items count indicator */}
      <div 
        className="text-xs text-gray-500 font-medium"
        dangerouslySetInnerHTML={{ __html: getCountHtml() }}
      />

      {/* Control Buttons */}
      <div className="flex items-center space-x-1.5">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          icon={ChevronLeft}
          className="p-1.5"
        />

        {getPages().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 focus:outline-none
              ${currentPage === page
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white border border-gray-250 text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            {page}
          </button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          icon={ChevronRight}
          className="p-1.5"
        />
      </div>
    </div>
  );
};
export default Pagination;

