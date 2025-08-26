import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { Switch } from "@mui/material";
import { Tooltip } from "@mui/material";
import { EyeIcon } from "@heroicons/react/24/outline";
import { toggleUserStatusAPI } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";

const ListVendorKYC: React.FC<{
  data: any;
  search: string;
  totalCount: number;
  pageNumber: number;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
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
}> = ({
  isLoading,
  isSuccess,
  isError,
  data,
  search,
  totalCount,
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
  sortConfig,
  setSortConfig,
}) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState(data);

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
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "phone", label: "Phone", sortable: true },
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
                  navigate(`/vendor-kyc/manager?id=${row.id}`);
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
        data={rows}
        columns={getColumns()}
        totalCount={totalCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
      />
    </>
  );
};

export default ListVendorKYC;
