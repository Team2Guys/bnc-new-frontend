interface ITableSkeleton {
  rows: number;
  columns: number;
}

const TableSkeleton = ({ rows, columns }: ITableSkeleton) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <th
                key={colIndex}
                className="border px-4 py-3 text-left text-primary"
              >
                <div className="h-4 w-32 rounded-md bg-gray-200 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="border px-4 py-3">
                  <div className="h-4 w-full rounded-md bg-gray-200 animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
