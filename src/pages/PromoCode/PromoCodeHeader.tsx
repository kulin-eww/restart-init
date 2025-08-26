import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PromoCodeHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center px-2 mb-2">
        <div className="text-xl font-semibold mb-2">Promo Code</div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              navigate("/promo-code/add");
            }}
          >
            Add
          </Button>
        </div>
      </div>
      <hr className="my-2 text-secondary" />
    </>
  );
};

export default PromoCodeHeader;
