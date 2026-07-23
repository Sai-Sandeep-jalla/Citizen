/**
 * @file Table.jsx
 * @description Reusable table component for displaying tabular data.
 */


export const Table = ({
  headers = [],
  data = [],
  renderRow,
  isLoading = false,
  emptyMessage = 'No records found.',
  className = ''
}) => {
  return (
    <div className={`overflow-x-auto bg-white border border-gray-100 rounded-xl shadow-sm ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                scope="col"
                className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {isLoading ? (
            // Skeleton loader for table rows
            Array.from({ length: 4 }).map((_, rIdx) => (
              <tr key={rIdx} className="animate-pulse">
                {headers.map((_, hIdx) => (
                  <td key={hIdx} className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-10 text-center text-sm text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => renderRow(item, idx))
          )}
        </tbody>
      </table>
    </div>
  );
};
