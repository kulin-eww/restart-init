import { Tooltip } from '@mui/material';
import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom';
import { BasicTable } from '../../components/Table/BasicTable';

const ListEarningHistory: React.FC<{
    data: any[],
    search: string,
    totalCount: number,
    pageNumber: number,
    setPageNumber: Dispatch<SetStateAction<number>>,
    pageSize: number,
    setPageSize: Dispatch<SetStateAction<number>>,
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean
}> = ({
    data,
    search,
    totalCount,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    isSuccess,
    isError,
    isLoading
}) => {
        const navigate = useNavigate();
        const [rows, setRows] = useState(data);
        const [page, setPage] = useState(0);
        const [rowsPerPage, setRowsPerPage] = useState(10);
        const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

        useEffect(() => {
            setRows(data || []);
        }, [data]);

        //  useEffect(() => {
        //     setRows([{
        //         id: 1,
        //         title: "Test Notification",
        //         description: "This is a test message",
        //         sendTo: "Vendor",
        //         sent: "19/08/2025"
        //     }]);
        // }, []);

        const getColumns = () => [
            { key: "id", label: "No.", sortable: true },
            { key: "title", label: "Title", sortable: true },
            { key: "description", label: "Description", sortable: true },
            { key: "sendTo", label: "Send To", sortable: true },
            { key: "sent", label: "Sent on", sortable: true },
            // {
            // key: "actions",
            // label: "Actions",
            // sortable: false,
            // sx: { position: "sticky", zIndex: 2, right: 0 },
            // render: (row: any) => {
            //     return (
            //     <div style={{ display: "flex", gap: 8 }}>
            //         <Tooltip key={"View"} title={"View"} className="cursor-pointer">
            //         <EyeIcon
            //             style={{ height: 20, color: "#1976d2" }}
            //             onClick={() => {
            //             navigate(`/users/view?id=${row.id}`);
            //             }}
            //         />
            //         </Tooltip>
            //     </div>
            //     );
            // },
            // },
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
                    isSuccess={isSuccess}
                    isError={isError}
                    isLoading={isLoading}
                />
            </>
        )
    }

export default ListEarningHistory
