import React from "react";
import { Button, TextField } from "@mui/material";

const VendorHeader: React.FC<{
  search: string;
  setSearch: (value: string) => void;
}> = ({ search, setSearch }) => {
  return (
    <>
      <div className="flex justify-between items-center px-2 mb-2">
        <div className="text-xl font-semibold mb-2">Vendors</div>
        <div className="flex gap-2">
          <TextField placeholder="Search" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <hr className="my-2 text-secondary" />
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <TextField
            size="small"
            name="from_date"
            label="From Date"
            type="date"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
            // value={formik.values.dob ? new Date(formik.values.dob).toISOString().split("T")[0] : ""}
            // onChange={formik.handleChange}
            // error={formik.touched.dob && Boolean(formik.errors.dob)}
            // helperText={formik.touched.dob && (formik.errors.dob as string)}
          />
          <TextField
            size="small"
            name="to_date"
            label="To Date"
            type="date"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            fullWidth
            // value={formik.values.dob ? new Date(formik.values.dob).toISOString().split("T")[0] : ""}
            // onChange={formik.handleChange}
            // error={formik.touched.dob && Boolean(formik.errors.dob)}
            // helperText={formik.touched.dob && (formik.errors.dob as string)}
          />
        </div>
      </div>
      <hr className="my-2 text-secondary" />
    </>
  );
};

export default VendorHeader;
