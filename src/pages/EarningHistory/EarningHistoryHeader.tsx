import { Autocomplete, Button, Menu, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EarningHistoryHeader: React.FC<{
  search: string;
  setSearch: (value: string) => void;
}> = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="flex justify-between items-center px-2 mb-2">
        <div className="text-xl font-semibold mb-2">Earning History</div>
        <div className="flex gap-2">
          <TextField label="Search" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button variant="outlined" onClick={() => {}}>
            Export
          </Button>
        </div>
      </div>
      <hr className="my-2 text-secondary" />

      <div className="flex gap-2">
        <div className="flex-1">
          <TextField size="small" name="filterBy" label="Filter By" select fullWidth>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </TextField>
        </div>
        <div className="flex-1">
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
        </div>
        <div className="flex-1">
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
    </>
  );
};

export default EarningHistoryHeader;
