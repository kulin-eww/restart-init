import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { StatusSwitch } from '../../components/common/Switch';
import { Switch, Tooltip } from '@mui/material';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { BasicTable } from '../../components/Table/BasicTable';

const ListContactUs:React.FC<{
  data: any;
  search: string;
  totalCount: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  handleDeleteContactUs: (id: string) => void;
  handleReplyModal: (id: string) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}> = ({ data, search, totalCount, pageNumber, setPageNumber, pageSize, setPageSize, handleDeleteContactUs, handleReplyModal, isLoading, isSuccess, isError }) => {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
    //   const toggleMutation = useMutation({
    //     mutationFn: toggleUserStatusAPI,
    //     onError: (error) => {
    //       useToast(error.message, "error");
    //     },
    //   });

    // useEffect(() => {
    //     setRows(data || []);
    // }, [data]);

    // useEffect(() => {
    //     setRows([{
    //         id: 1,
    //         user: "John Doe",
    //         email: "john@example.com",
    //         description: "This is a test message",
    //         status: true,
    //         role: "Vendor",
    //         createdAt: "01/01/2022",
    //     }]);
    // }, []);

    const getColumns = () => [
        { key: "id", label: "No.", sortable: true },
        { key: "user", label: "User", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "description", label: "Description", sortable: true },
        { key: "role", label: "Role", sortable: true },
        { key: "createdAt", label: "Created At", sortable: true },
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: (row: any) => (
                <Switch
                    defaultChecked={row?.status}
                    //   onChange={() => {
                    //     toggleMutation.mutate(row.id);
                    //   }}
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
                // For conditional rendering of Actions
                // if (row.gender === "male") {
                //   return (
                //     <div style={{ display: "flex", gap: 8 }}>
                //       <Tooltip key={"View"} title={"View"} className="cursor-pointer">
                //         <EyeIcon style={{ height: 20, color: "#1976d2" }} onClick={() => {}} />
                //       </Tooltip>
                //       <Tooltip key={"Edit"} title={"Edit"} className="cursor-pointer">
                //         <PencilIcon style={{ height: 20, color: "#ed6c02" }} />
                //       </Tooltip>
                //       <Tooltip key={"Delete"} title={"Delete"} className="cursor-pointer">
                //         <TrashIcon style={{ height: 20, color: "#d32f2f" }} />
                //       </Tooltip>
                //     </div>
                //   );
                // }
                // return (
                //   <div style={{ display: "flex", gap: 8 }}>
                //     <Tooltip title="View" className="cursor-pointer">
                //       <EyeIcon style={{ height: 20, color: "#1976d2" }} />
                //     </Tooltip>
                //   </div>
                // );
                return (
                    <div style={{ display: "flex", gap: 8 }}>
                        <Tooltip key={"View"} title={"View"} className="cursor-pointer">
                            <EyeIcon style={{ height: 20, color: "#1976d2" }} onClick={() => { navigate(`/contact-us/${row?.id}`) }} />
                        </Tooltip>
                        <Tooltip key={"Edit"} title={"Reply"} className="cursor-pointer">
                            <a href={`mailto:${row?.email}`} style={{ textDecoration: "none" }}>
                                <ArrowUturnLeftIcon style={{ height: 20, color: "#1976d2" }} />
                            </a>
                        </Tooltip>
                        <Tooltip key={"Delete"} title={"Delete"} className="cursor-pointer">
                            <TrashIcon style={{ height: 20, color: "#1976d2" }} onClick={() => { handleDeleteContactUs(row?.id) }} />
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    const filteredRows = rows?.filter((row) => {
        const searchText = "";
        const search = searchText?.toLowerCase();
        return (
            row?.name?.toLowerCase()?.includes(search) ||
            row?.email?.toLowerCase()?.includes(search) ||
            row?.phone?.includes(search) ||
            row?.gender?.toLowerCase()?.includes(search)
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
    )
}

export default ListContactUs
