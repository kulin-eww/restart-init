import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { StatusSwitch } from '../../components/common/Switch';
import { Switch, Tooltip } from '@mui/material';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { BasicTable } from '../../components/Table/BasicTable';
import useToast from '../../hooks/useToast';
import { changeFAQStatusAPI } from '../../api/faq';

const ListFAQ:React.FC<{
  data: any;
  search: string;
  totalCount: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  handleDeleteFAQ: (id: string) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean
}> = ({ data, search, totalCount, pageNumber, setPageNumber, pageSize, setPageSize, handleDeleteFAQ, isLoading, isSuccess, isError }) => {
    const navigate = useNavigate();
      const [rows, setRows] = useState(data??[]);
      const [filterText, setFilterText] = useState("");
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
      const toggleMutation = useMutation({
        mutationFn: changeFAQStatusAPI,
        onError: (error) => {
          useToast(error.message, "error");
        },
      });
    
   useEffect(() => {
    setRows(data || []);
  }, [data]);

      const getColumns = () => [
        { key: "id", label: "No.", sortable: false,},
        { key: "question", label: "Question", sortable: true, accessor: (row: any)=> row?.question?.en},
        { key: "answer", label: "Answer", sortable: true, accessor: (row: any)=> row?.answer?.en },
        { key: "createdAt", label: "Created At", sortable: true,accessor: (row: any)=> row?.created_at?.split("T")?.[0] },
        {
          key: "status",
          label: "Status",
          sortable: true,
          render: (row: any) => (
            <Switch
              defaultChecked={row?.status}
              onChange={() => {
                toggleMutation.mutate(row?.id);
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
                  <EyeIcon style={{ height: 20, color: "#1976d2" }} onClick={()=>navigate(`/faq/view?id=${row?.id}`)} />
                </Tooltip>
                <Tooltip key={"Edit"} title={"Edit"} className="cursor-pointer">
                  <PencilIcon
                    style={{ height: 20, color: "#ed6c02" }}
                    onClick={() => {
                      navigate(`/faq/edit?id=${row.id}`);
                    }}
                  />
                </Tooltip>
                <Tooltip key={"Delete"} title={"Delete"} className="cursor-pointer">
                  <TrashIcon style={{ height: 20, color: "#d32f2f" }} onClick={() => {handleDeleteFAQ(row?.id)}} />
                </Tooltip>
              </div>
            );
          },
        },
      ];
    
      const filteredRows = search !== "" ? rows?.filter((row) => {
        const searchText = "";
        const search = searchText?.toLowerCase();
        return (
          row?.question?.en?.toLowerCase()?.includes(search) ||
          row?.answer?.en?.toLowerCase()?.includes(search)
        );
      }) : rows;
    
      const sortedRows = sortConfig
        ? [...filteredRows]?.sort((a, b) => {
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
    
      const paginatedRows = sortedRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    
      const handleSort = (key: string) => {
        setSortConfig((prev) =>
          prev?.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" }
        );
      };

    console.log("Line 140", data, rows, paginatedRows, sortedRows, filteredRows)
      
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
  )
}

export default ListFAQ
