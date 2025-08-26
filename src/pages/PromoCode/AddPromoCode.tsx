import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { createPromoCodeAPI } from "../../api/promoCode";
import PromoCodeForm from "./PromoCodeForm";

const AddPromoCode = () => {
  const navigate = useNavigate();

  const initialValues = {
    code: "",
    discount: "",
    validity: "",
  };

  const handleAddPromoCode = useMutation({
    mutationFn: createPromoCodeAPI,
    onSuccess: (res) => {
      useToast(res.message);
      navigate("/promo-code");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      <PromoCodeForm
        action="add"
        onSave={handleAddPromoCode}
        initialValues={initialValues}
        isSuccess={true}
        isError={false}
        isLoading={false}
      />
    </>
  );
};

export default AddPromoCode;
