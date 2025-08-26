import { Button, MenuItem, TextField } from "@mui/material";
import type { Dispatch } from "@reduxjs/toolkit";
import React, { type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

const FAQHeader = ({
  selectedUser,
  setSelectedUser,
  search,
  setSearch,
}: {
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center px-2 mb-2">
        <div className="text-xl font-semibold mb-2">FAQs</div>
        <div className="flex gap-2">
          <TextField label="Search" size="small" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Button variant="outlined" onClick={() => navigate("/faq/add")}>
            Add FAQ
          </Button>
        </div>
      </div>
      <hr />
      <div className="flex gap-2 mt-4 w-1/4">
        <div className="flex-1 ">
          <TextField size="small" name="filterBy" label="Filter By" select fullWidth>
            <MenuItem
              value="vendor"
              onChange={(e: any) => {
                setSelectedUser(e.target.value);
              }}
            >
              Vendor
            </MenuItem>
            <MenuItem
              value="user_app"
              onChange={(e: any) => {
                setSelectedUser(e.target.value);
              }}
            >
              Customer
            </MenuItem>
            <MenuItem
              value="driver_app"
              onChange={(e: any) => {
                setSelectedUser(e.target.value);
              }}
            >
              Driver
            </MenuItem>
          </TextField>
        </div>
      </div>
    </>
  );
};

export default FAQHeader;
