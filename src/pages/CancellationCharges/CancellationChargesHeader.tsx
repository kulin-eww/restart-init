import React from "react";
import { TextField } from "@mui/material";

const CancellationChargesHeader: React.FC = () => {
  return (
    <>
      <div className="flex justify-between items-center px-2 mb-2">
        <div className="text-xl font-semibold mt-1">Cancellation Charges</div>
      </div>
      <hr className="my-2 text-secondary" />
    </>
  );
};

export default CancellationChargesHeader;
