import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { Chip, Switch } from "@mui/material";
import { Tooltip } from "@mui/material";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { toggleVendorStatusAPI } from "../../api/vendor";

const ListVendor: React.FC<{
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: any;
  totalCount: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  sortConfig: {
    sortBy: string;
    sortOrder: string;
  };
  setSortConfig: React.Dispatch<
    React.SetStateAction<{
      sortBy: string;
      sortOrder: string;
    }>
  >;
  handleDeleteVendor: (id: string) => void;
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
  sortConfig,
  setSortConfig,
  handleDeleteVendor,
}) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState(data);

  useEffect(() => {
    setRows(data || []);
  }, [data]);

  const toggleMutation = useMutation({
    mutationFn: toggleVendorStatusAPI,
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const getColumns = () => [
    { key: "id", label: "No", sortable: false },
    { key: "company_name", label: "Company Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "commercial_register_number", label: "Commercial Register No.", sortable: true },
    { key: "license_number", label: "License No.", sortable: true },
    { key: "createdAt", label: "Created At", sortable: true, accessor: (row: any) => row?.created_at?.split("T")?.[0] },
    {
      key: "kyc_status",
      label: "Kyc Status",
      sortable: true,
      render: (row: any) => {
        return (
          <>
            {row.kyc_status === "approved" && <Chip label="Approved" color="primary" variant="outlined" />}
            {row.kyc_status === "pending" && <Chip label="Pending" color="warning" variant="outlined" />}
            {row.kyc_status === "rejected" && <Chip label="Rejected" color="error" variant="outlined" />}
          </>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row: any) => (
        <Switch
          defaultChecked={row?.status}
          onChange={() => {
            toggleMutation.mutate(row.id);
          }}
          slotProps={{
            input: { "aria-label": "Activate/Deactivate" },
          }}
        />
      ),
    },
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
                  navigate(`/vendors/view?id=${row.id}`);
                }}
              />
            </Tooltip>
            <Tooltip key={"Delete"} title={"Delete"} className="cursor-pointer">
              <TrashIcon
                style={{ height: 20, color: "#d32f2f" }}
                onClick={() => {
                  handleDeleteVendor(row.id);
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <BasicTable
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={rows}
        columns={getColumns()}
        totalCount={totalCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    </>
  );
};

export default ListVendor;
