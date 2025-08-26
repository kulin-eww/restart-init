import React from "react";
import { TextField } from "@mui/material";

const ReviewRatingHeader: React.FC<{
  search: string;
  setSearch: (value: string) => void;
}> = ({ search, setSearch }) => {
  return (
    <>
      <div className="flex justify-between items-center px-2 mb-2">
        <div className="text-xl font-semibold mb-2">Review & Rating</div>
        <div className="flex gap-2">
          <TextField label="Search" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      {/* <hr className="my-2 text-secondary" />
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <TextField
            size="small"
            name="vendor"
            label="Vendor"
            type="text"
            fullWidth
            // value={formik.values.dob ? new Date(formik.values.dob).toISOString().split("T")[0] : ""}
            // onChange={formik.handleChange}
            // error={formik.touched.dob && Boolean(formik.errors.dob)}
            // helperText={formik.touched.dob && (formik.errors.dob as string)}
          />
          <TextField
            size="small"
            name="customer"
            label="Customer"
            type="text"
            fullWidth
            // value={formik.values.dob ? new Date(formik.values.dob).toISOString().split("T")[0] : ""}
            // onChange={formik.handleChange}
            // error={formik.touched.dob && Boolean(formik.errors.dob)}
            // helperText={formik.touched.dob && (formik.errors.dob as string)}
          />
        </div>
        <Button variant="outlined">Search</Button>
      </div> */}
      <hr className="my-2 text-secondary" />
    </>
  );
};

export default ReviewRatingHeader;
