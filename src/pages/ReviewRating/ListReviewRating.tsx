import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { Tooltip } from "@mui/material";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toggleUserStatusAPI } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";

const ListReviewRating: React.FC<{
  data: any;
  search: string;
  isLoading: boolean;
  totalCount: number;
  pageNumber: number;
  isSuccess: boolean;
  isError: boolean;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  handleDeleteUser: (id: string) => void;
}> = ({ data, search, totalCount, pageNumber, setPageNumber, pageSize, setPageSize, handleDeleteUser, isLoading, isSuccess, isError }) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  useEffect(() => {
    setRows(data || []);
  }, [data]);

  const toggleMutation = useMutation({
    mutationFn: toggleUserStatusAPI,
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const getColumns = () => [
    { key: "id", label: "ID", sortable: true },
    { key: "user", label: "User", sortable: true },
    { key: "vendor", label: "Vendor", sortable: true },
    { key: "rating", label: "Rating", sortable: true },
    { key: "review", label: "Review", sortable: true },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      sx: { position: "sticky", zIndex: 2, right: 0 },
      render: (row: any) => {
        return (
          <div style={{ display: "flex", gap: 8 }}>
            <Tooltip key={"View"} title={"View"} className="cursor-pointer">
              <EyeIcon
                style={{ height: 20, color: "#1976d2" }}
                onClick={() => {
                  navigate(`/review-rating/view?id=${row.id}`);
                }}
              />
            </Tooltip>
            <Tooltip key={"Delete"} title={"Delete"} className="cursor-pointer">
              <TrashIcon
                style={{ height: 20, color: "#d32f2f" }}
                onClick={() => {
                  handleDeleteUser(row.id);
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const filteredRows = rows.filter((row) => {
    const searchText = "";
    const search = searchText.toLowerCase();
    return (
      row.user.toLowerCase().includes(search) ||
      row.vendor.toLowerCase().includes(search) ||
      row.rating.includes(search) ||
      row.review.toLowerCase().includes(search)
    );
  });

  const sortedRows = sortConfig
    ? [...filteredRows].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      return sortConfig.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    })
    : filteredRows;

  const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSort = (key: string) => {
    setSortConfig((prev) =>
      prev?.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" }
    );
  };

  return (
    <>
      <BasicTable
        data={paginatedRows}
        columns={getColumns()}
        totalCount={totalCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
      />
    </>
  );
};

export default ListReviewRating;
