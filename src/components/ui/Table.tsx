import TableSkeleton from "components/Dashboard/Tables/TableSkelton";
import React, { useState } from "react";
import { TableProps } from "types/types";

interface ExtendedTableProps<T> extends TableProps<T> {
  loading?: boolean; // 👈 extra prop
}

const Table = <T,>({
  data,
  columns,
  rowKey,
  emptyMessage = "No data found",
  loading = false, // 👈 default false
}: ExtendedTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPaginationNumbers = () => {
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
    const maxButtons = windowWidth < 640 ? 3 : 5;
    const pages: (number | string)[] = [];

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      let start = Math.max(2, currentPage - Math.floor(maxButtons / 2));
      let end = Math.min(totalPages - 1, start + maxButtons - 1);

      if (end >= totalPages - 1) {
        start = totalPages - maxButtons;
        end = totalPages - 1;
      }

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div>
      <div className="overflow-auto border rounded-md !max-h-[550px]">
        {loading ? (
          <TableSkeleton rows={8} columns={columns.length} />
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 bg-white dark:bg-transparent">
            <thead className="bg-gray-50 dark:bg-black">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="p-2 md:p-4 text-left text-sm font-semibold dark:text-neutral-300 capitalize whitespace-normal break-words"
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <tr
                    key={String(item[rowKey] ?? index)}
                    className="hover:bg-gray-100 dark:hover:bg-black"
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={`${String(item[rowKey] ?? index)}-${colIndex}`}
                        className="px-4 py-3 text-sm dark:text-neutral-200 whitespace-normal break-words max-w-[300px]"
                      >
                        {col.render
                          ? col.render(item)
                          : String(item[col.key as keyof T])}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center px-4 py-6 dark:text-neutral-300"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 dark:text-white"
          >
            Prev
          </button>

          {getPaginationNumbers().map((page, i) =>
            page === "..." ? (
              <span key={i} className="px-3 py-1 dark:text-white">
                ...
              </span>
            ) : (
              <button
                key={i}
                onClick={() => goToPage(Number(page))}
                className={`px-3 py-1 border rounded ${
                  currentPage === page
                    ? "bg-gray-200 dark:text-black"
                    : "dark:text-white"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 dark:text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
