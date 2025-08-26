import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import CustomButton from "../../components/button/CustomButton";
import { MenuItem, Switch, TextField } from "@mui/material";
import { Tooltip } from "@mui/material";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { StatusSwitch } from "../../components/common/Switch";
import { toggleUserStatusAPI } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { toggleTicketStatusAPI } from "../../api/ticket";

const ListTicket: React.FC<{
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: any;
  search: string;
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
    mutationFn: toggleTicketStatusAPI,
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const getColumns = () => [
    { key: "id", label: "ID", sortable: true },
    { key: "user_id", label: "User ID", sortable: true },
    { key: "user_type", label: "Type", sortable: true },
    { key: "ticket_number", label: "Ticket Number", sortable: true },
    { key: "ticket_subject", label: "Subject", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row: any) => (
        <TextField
          size="small"
          name="ticket_status"
          select
          fullWidth
          defaultValue={row.ticket_status}
          onChange={(e) => {
            toggleMutation.mutate({ id: row.id, ticket_status: e.target.value });
          }}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="inprocess">In process</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
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
                  navigate(`/tickets/view?id=${row.id}`);
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

export default ListTicket;
