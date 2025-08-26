import { useEffect, useState } from "react";
import { BasicTable } from "../../components/Table/BasicTable";
import { IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { toggleUserStatusAPI } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { CheckIcon } from "@heroicons/react/24/outline";

const ListPricing: React.FC<{
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
}) => {
  const [rows, setRows] = useState(data);

  useEffect(() => {
    setRows(data || []);
  }, [data]);

  const getColumns = () => [
    { key: "id", label: "No.", sortable: false },
    { key: "wasteType", label: "Waste Type", sortable: false },
    { key: "binSize", label: "Bin Size", sortable: false },
    { key: "loadingMethod", label: "Loading Method", sortable: false },
    {
      key: "basePrice",
      label: "Base Rate/Day (SAR)",
      sortable: false,
      render: (row: any) => {
        return (
          <TextField
            size="small"
            name="basePrice"
            fullWidth
            type="number"
            defaultValue={row.basePrice}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        console.log("ROW");
                      }}
                      edge="end"
                    >
                      <Tooltip title={"Click to Save"} className="cursor-pointer">
                        <CheckIcon className="w-5 text-primary" />
                      </Tooltip>
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        );
      },
    },
    {
      key: "deliveryFee",
      label: "Delivery Fee (SAR)",
      sortable: false,
      render: (row: any) => {
        return (
          <TextField
            size="small"
            name="deliveryFee"
            fullWidth
            type="number"
            defaultValue={row.deliveryFee}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        console.log("ROW");
                      }}
                      edge="end"
                    >
                      <Tooltip title={"Click to Save"} className="cursor-pointer">
                        <CheckIcon className="w-5 text-primary" />
                      </Tooltip>
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        );
      },
    },
    {
      key: "pickupFee",
      label: "Pickup Fee (SAR)",
      sortable: true,
      render: (row: any) => {
        return (
          <TextField
            size="small"
            name="pickupFee"
            fullWidth
            type="number"
            defaultValue={row.pickupFee}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => {}} edge="end">
                      <Tooltip title={"Click to Save"} className="cursor-pointer">
                        <CheckIcon className="w-5 text-primary" />
                      </Tooltip>
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
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

export default ListPricing;
