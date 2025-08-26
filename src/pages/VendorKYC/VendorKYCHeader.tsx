import React from "react";
import { Button, MenuItem, TextField } from "@mui/material";

const VendorKYCHeader: React.FC<{
  search: string;
  setSearch: (value: string) => void;
}> = ({ search, setSearch }) => {
  return (
    <>
      <div className="flex justify-between items-center px-2 mb-2">
        <div className="text-xl font-semibold mb-2">Vendors KYC</div>
        <div className="flex gap-2">
          <TextField placeholder="Search" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <hr className="my-2 text-secondary" />
      <div className="flex gap-2 justify-between">
        <div className="w-64">
          <TextField
            size="small"
            name="status"
            label="Status"
            select
            fullWidth
            defaultValue={"all"}
            // value={formik.values.gender ?? ""}
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // error={formik.touched.gender && Boolean(formik.errors.gender)}
            // helperText={formik.touched.gender && (formik.errors.gender as string)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
          </TextField>
        </div>
      </div>
      <hr className="my-2 text-secondary" />
    </>
  );
};

export default VendorKYCHeader;
