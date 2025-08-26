import { Button, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotificationHeader: React.FC<{
  search: string;
  setSearch: (value: string) => void;
}> = ({ search, setSearch }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center px-2 mb-2">
        <div className="text-xl font-semibold mb-2">Notifications</div>
        <div className="flex gap-2">
          <TextField label="Search" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button variant="outlined" onClick={() => navigate("/notifications/send-notification")}>
            Send Notification
          </Button>
        </div>
      </div>
      <hr className="my-2 text-secondary" />
      {/* <div className="flex gap-2 justify-between">
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
        <Button variant="outlined">Search</Button>
      </div>
      <hr className="my-2 text-secondary" /> */}
    </>
  );
};

export default NotificationHeader;
