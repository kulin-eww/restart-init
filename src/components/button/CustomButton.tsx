import React from "react";
import { useNavigate } from "react-router-dom";

const CustomButton = ({ customClasses, label, path }: { customClasses?: string; label: string; path?: string }) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className={`border px-2 py-1 rounded-md cursor-pointer ${customClasses?.length > 0 ? customClasses : ""}`}
        onClick={() => {
          navigate(path);
        }}
      >
        {label}
      </button>
    </>
  );
};

export default CustomButton;
