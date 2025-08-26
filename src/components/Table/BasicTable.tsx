// components/CommonTable.tsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableSortLabel,
  TablePagination,
  Skeleton,
} from "@mui/material";
import React from "react";
import ErrorLottie from "../lottie/ErrorLottie";
import Loader from "../Loader/Loader";

type Column<T = any> = {
  key: string;
  label: string;
  sortable?: boolean;
  sx?: any;
  render?: (row: T) => React.ReactNode; // ✅ added render
  accessor?: (row: any) => any;
};

interface CommonTableProps<T> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: T[];
  columns: Column<T>[];
  hidePagination?: boolean;
  totalCount: number;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  sortConfig?: {
    sortBy: string;
    sortOrder: string;
  };
  setSortConfig?: React.Dispatch<
    React.SetStateAction<{
      sortBy: string;
      sortOrder: string;
    }>
  >;
}

export function BasicTable<T extends { id: number | string }>({
  isLoading,
  isSuccess,
  isError,
  data,
  columns,
  hidePagination = false,
  totalCount,
  pageSize,
  setPageSize,
  pageNumber,
  setPageNumber,
  sortConfig,
  setSortConfig,
}: CommonTableProps<T>) {
  return (
    <>
      <div className="flex-1 overflow-x-auto max-w-full mt-2">
        <TableContainer
          sx={{
            borderRadius: 3,
            // overflow: "hidden",
          }}
          className="sidebar-scroll"
        >
          <Table
            stickyHeader
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  position: "sticky",
                  zIndex: 1,
                  top: 0,
                  backgroundColor: (theme) => theme.palette.background.default,
                }}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    sx={{
                      ...col?.sx,
                      fontWeight: "bold",
                      backgroundColor: (theme) => theme.palette.background.paper,
                      color: (theme) => theme.palette.text.primary,
                      borderBottom: "2px solid",
                      borderColor: (theme) => theme.palette.divider,
                    }}
                  >
                    {col.sortable ? (
                      <TableSortLabel
                        active={sortConfig?.sortBy === col.key}
                        direction={sortConfig?.sortBy === col.key ? (sortConfig.sortOrder as "asc" | "desc") : "asc"}
                        onClick={() => {
                          setSortConfig((prev) =>
                            prev?.sortBy === col.key
                              ? { sortBy: col.key, sortOrder: prev?.sortOrder === "asc" ? "desc" : "asc" }
                              : { sortBy: col.key, sortOrder: "asc" }
                          );
                        }}
                        sx={{
                          color: (theme) => theme.palette.text.primary,
                          "&.Mui-active": {
                            color: (theme) => theme.palette.primary.main,
                          },
                        }}
                      >
                        {col.label}
                      </TableSortLabel>
                    ) : (
                      col.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading &&
                Array.from({ length: 3 }).map((_, id) => (
                  <TableRow key={`skeleton-${id}`}>
                    <TableCell colSpan={columns.length} sx={{ p: 0 }}>
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width="100%"
                        height={48}
                        sx={{ borderBottom: "0.5px solid #ffffff" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              {isSuccess &&
                !isLoading &&
                totalCount > 0 &&
                data.map((row, idx) => {
                  const serialNumber = (pageNumber - 1) * pageSize + idx + 1;
                  console.log("Line 137", row);
                  return (
                    <TableRow
                      key={row.id}
                      sx={{
                        backgroundColor: (theme) =>
                          idx % 2 === 0 ? theme.palette.action.hover : theme.palette.background.paper,
                        "&:hover": {
                          backgroundColor: (theme) => theme.palette.action.selected,
                        },
                        transition: "background 0.2s",
                      }}
                    >
                      {columns.map((col) => {
                        return (
                          <TableCell
                            key={col.key}
                            sx={{
                              ...col?.sx,
                              color: (theme) => theme.palette.text.primary,
                              borderBottom: "1px solid",
                              borderColor: (theme) => theme.palette.divider,
                              py: 1.5,
                              px: 2,
                              ...(col.key === "actions" && {
                                backgroundColor: (theme) => theme.palette.background.paper,
                              }),
                            }}
                          >
                            <div
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "normal",
                              }}
                            >
                              {col.render
                                ? col.render(row)
                                : col.accessor
                                  ? col.accessor(row)
                                  : col?.key === "id"
                                    ? serialNumber
                                    : row[col.key]}
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}

              {isSuccess && !isLoading && totalCount === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    align="center"
                    sx={{
                      py: 4,
                      color: (theme) => theme.palette.text.secondary,
                      backgroundColor: (theme) => theme.palette.action.hover,
                      fontWeight: "bold",
                    }}
                  >
                    No data found
                  </TableCell>
                </TableRow>
              )}

              {isError && (
                <TableRow
                  sx={{
                    backgroundColor: (theme) => theme.palette.action.hover,
                  }}
                >
                  <TableCell colSpan={columns.length} align="center" sx={{ p: 0 }}>
                    <ErrorLottie />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {!hidePagination && (
        <TablePagination
          className="mt-2"
          component="div"
          count={totalCount}
          page={pageNumber - 1}
          onPageChange={(_, newPage) => {
            setPageNumber(newPage + 1);
          }}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNumber(1);
          }}
          rowsPerPageOptions={[10, 25, 50, 100]}
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            borderRadius: 2,
            mt: 2,
            ".MuiTablePagination-toolbar": {
              color: (theme) => theme.palette.text.primary,
            },
            ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
              fontSize: "0.95rem",
            },
          }}
        />
      )}
    </>
  );
}
