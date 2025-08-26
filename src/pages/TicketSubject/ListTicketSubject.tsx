import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { Tooltip } from "@mui/material";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const ListTicketSubject: React.FC<{
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
  handleDeleteTicketSubject: (id: string) => void;
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
  handleDeleteTicketSubject,
}) => {
  const navigate = useNavigate();
  const [rows, setRows] = useState(data);

  useEffect(() => {
    setRows(data || []);
  }, [data]);

  const getColumns = () => [
    { key: "id", label: "No.", sortable: false },
    { key: "en", label: "English", sortable: false, accessor: (row: any) => row.subject.en },
    { key: "ar", label: "Arabic", sortable: false, accessor: (row: any) => row.subject.ar },
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
                  navigate(`/ticket-subject/view?id=${row.id}`);
                }}
              />
            </Tooltip>
            <Tooltip key={"Edit"} title={"Edit"} className="cursor-pointer">
              <PencilIcon
                style={{ height: 20, color: "#1976d2" }}
                onClick={() => {
                  navigate(`/ticket-subject/edit?id=${row.id}`);
                }}
              />
            </Tooltip>
            <Tooltip key={"Delete"} title={"Delete"} className="cursor-pointer">
              <TrashIcon
                style={{ height: 20, color: "#ea5455" }}
                onClick={() => {
                  handleDeleteTicketSubject(row.id);
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

export default ListTicketSubject;
