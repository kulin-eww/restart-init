import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useToast from "../../hooks/useToast";
import PromoCodeForm from "./PromoCodeForm";
import { editPromoCodeAPI, getPromoCodeDetailsAPI } from "../../api/promoCode";

const EditPromoCode = () => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({ id: "", code: "", discount: "", validity: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["getPromoCodeDetailsAPI", id],
    queryFn: () => getPromoCodeDetailsAPI(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setInitialValues(data.data);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleEditPromoCode = useMutation({
    mutationFn: editPromoCodeAPI,
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
      {isSuccess && initialValues.id && (
        <PromoCodeForm
          action="edit"
          onSave={handleEditPromoCode}
          initialValues={initialValues}
          isSuccess={isSuccess}
          isError={isError}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default EditPromoCode;
