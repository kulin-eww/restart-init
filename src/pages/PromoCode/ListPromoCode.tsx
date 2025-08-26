import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { Tooltip } from "@mui/material";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const ListPromoCode: React.FC<{
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: any;
  totalCount: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  handleDeletePromoCode: (id: string) => void;
}> = ({
  isLoading,
  isSuccess,
  isError,
  data,
  totalCount,
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
  handleDeletePromoCode,
}) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState(data);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  useEffect(() => {
    setRows(data || []);
  }, [data]);

  const getColumns = () => [
    { key: "id", label: "No.", sortable: false },
    { key: "code", label: "Code", sortable: false, accessor: (row: any) => row.code },
    { key: "discount", label: "Discount", sortable: false, accessor: (row: any) => row.discount },
    { key: "validity", label: "Validity", sortable: false, accessor: (row: any) => row.validity },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      sx: {
        position: "sticky",
        zIndex: 2,
        right: 0,
        textAlign: "right",
        minWidth: 120,
      },
      render: (row: any) => {
        return (
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Tooltip key={"View"} title={"View"} className="cursor-pointer">
              <EyeIcon
                style={{ height: 20, color: "#219564" }}
                onClick={() => {
                  navigate(`/promo-code/view?id=${row.id}`);
                }}
              />
            </Tooltip>
            <Tooltip key={"Edit"} title={"Edit"} className="cursor-pointer">
              <PencilIcon
                style={{ height: 20, color: "#1976d2" }}
                onClick={() => {
                  navigate(`/promo-code/edit?id=${row.id}`);
                }}
              />
            </Tooltip>
            <Tooltip key={"Delete"} title={"Delete"} className="cursor-pointer">
              <TrashIcon
                style={{ height: 20, color: "#ea5455" }}
                onClick={() => {
                  handleDeletePromoCode(row.id);
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleSort = (key: string) => {
    setSortConfig((prev) =>
      prev?.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" }
    );
  };

  return (
    <>
      <BasicTable
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={rows}
        columns={getColumns()}
        // sortConfig={sortConfig}
        // onSort={handleSort}
        totalCount={totalCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </>
  );
};

export default ListPromoCode;
