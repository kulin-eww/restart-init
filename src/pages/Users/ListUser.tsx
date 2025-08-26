import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { Switch } from "@mui/material";
import { Tooltip } from "@mui/material";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toggleUserStatusAPI } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";

const ListUser: React.FC<{
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
  handleDeleteUser: (id: string) => void;
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
  handleDeleteUser,
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
    { key: "id", label: "No.", sortable: false },
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
                  navigate(`/users/view?id=${row.id}`);
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

export default ListUser;
