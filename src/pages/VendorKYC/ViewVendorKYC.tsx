import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VendorKYCManager from "./VendorKYCManager";
import { getVendorKYCDetailsAPI } from "../../api/vendorKYC";

const ViewVendorKYC = () => {
  const [initialValues, setInitialValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["getVendorKYCDetails", id],
    queryFn: () => getVendorKYCDetailsAPI(id),
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
      <VendorKYCManager initialValues={initialValues} isSuccess={isSuccess} isError={isError} isLoading={isLoading} />
    </>
  );
};

export default ViewVendorKYC;
