import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPromoCodeDetailsAPI } from "../../api/promoCode";
import PromoCodeForm from "./PromoCodeForm";

const ViewPromoCode = () => {
  const [initialValues, setInitialValues] = useState({ id: "", code: "", discount: "", validity: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["getPromoCodeDetails", id],
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

  return (
    <>
      <PromoCodeForm
        action="view"
        initialValues={initialValues}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
      />
    </>
  );
};

export default ViewPromoCode;
