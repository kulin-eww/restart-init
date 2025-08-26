import { useCallback, useEffect, useState } from "react";
import Editor from "../../components/CMS/Editor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCMSAPI } from "../../api/cms";
import { Button, debounce, Switch, TextField, Tooltip } from "@mui/material";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { BasicTable } from "../../components/Table/BasicTable";

export const stripHtml = (html: string = "") => html.replace(/<[^>]+>/g, "");

const Terms = () => {
  const [cmsContent, setCmsContent] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isSuccess, error, isError, refetch } = useQuery({
    queryKey: ["getCMS"],
    queryFn: () => getCMSAPI(),
    enabled: true,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("Line 30", data);
      const cmsData = Array.isArray(data?.data) ? data.data : data?.data ? [data.data] : [];
      const tAndCData = cmsData?.filter((item: any) => {
        return item?.name === "terms_and_conditions";
      });
      console.log(tAndCData);
      setCmsContent(tAndCData);
      setTotalCount(tAndCData?.length);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  // const toggleMutation = useMutation({
  //   mutationFn: toggleUserStatusAPI,
  //   onError: (error) => {
  //     useToast(error.message, "error");
  //   },
  // });

  const refetchData = useCallback(
    debounce(() => {
      refetch();
    }, 300),
    []
  );

  useEffect(() => {
    refetchData();
  }, [search]);

  const getColumns = () => [
    { key: "id", label: "ID", sortable: false },
    { key: "title", label: "Title", sortable: true, accessor: (row: any) => stripHtml(row?.show_name?.en) },
    { key: "description", label: "Description", sortable: true, accessor: (row: any) => stripHtml(row?.value?.en) },
    {
      key: "role",
      label: "Role",
      sortable: true,
      accessor: (row: any) =>
        row?.for === "web"
          ? "Web"
          : row?.for === "driver"
            ? "Driver"
            : row?.for === "vendor"
              ? "Vendor"
              : row?.for === "user"
                ? "User"
                : "",
    },
    // { key: "createdAt", label: "Created At", sortable: true, accessor: (row: any) => row?.created_at?.split("T")?.[0]},
    // {
    //   key: "status",
    //   label: "Status",
    //   sortable: true,
    //   render: (row: any) => (
    //     <Switch
    //       defaultChecked={row?.status}
    //       onChange={() => {
    //         // toggleMutation.mutate(row.id);
    //       }}
    //       slotProps={{
    //         input: { "aria-label": "Activate/Deactivate" },
    //       }}
    //     />
    //   ),
    // },
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
                  navigate(`/terms/view?id=${row.id}`, { state: row });
                }}
              />
            </Tooltip>
            <Tooltip key={"edit"} title={"Edit"} className="cursor-pointer">
              <PencilIcon
                style={{ height: 20, color: "#1976d2" }}
                onClick={() => {
                  navigate(`/terms/edit?id=${row.id}`, { state: row });
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const filteredRows = cmsContent?.filter((row) => {
    const searchText = "";
    const search = searchText?.toLowerCase();
    return row?.show_name?.en?.toLowerCase().includes(search) || row?.value?.en?.toLowerCase().includes(search);
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

  console.log(cmsContent, filteredRows, paginatedRows);

  return (
    <div className="bg-layout-bg p-2 rounded-lg shadow-md">
      {/* <Editor title={"Terms & Conditions"} cmsContent={cmsContent} setCmsContent={setCmsContent} /> */}
      <div className="flex justify-between items-center px-2 mb-2">
        <div className="text-xl font-semibold mb-2">Terms & Conditions</div>
        <div className="flex gap-2">
          <TextField label="Search" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <hr />
      <BasicTable
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={paginatedRows}
        columns={getColumns()}
        totalCount={totalCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default Terms;
