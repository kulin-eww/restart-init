import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TicketSubjectHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between items-center px-2 mb-2">
        <div className="text-xl font-semibold mb-2">Ticket Subject</div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              navigate("/ticket-subject/add");
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

export default TicketSubjectHeader;
