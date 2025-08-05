import { Skeleton } from 'antd';
interface ITableSkelton {
  rows: number;
  columns: number;
}
const TableSkeleton = ({ rows, columns }: ITableSkelton) => {
  return (
    <div className="overflow-x-scroll lg:overflow-auto">
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 w-full">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <th
                key={colIndex}
                className="border px-4 py-2 text-left text-gray-500 overflow-hidden"
              >
                <Skeleton.Input
                  active={true}
                  className='!w-full !h-12'                  
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="border px-4 py-2">
                  <Skeleton.Input
                    active={true}
                    className='!w-full !h-12'                    
                  />
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
