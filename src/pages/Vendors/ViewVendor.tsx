import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VendorForm from "./VendorForm";
import { getVendorDetailsAPI } from "../../api/vendor";

const ViewVendor = () => {
  const [initialValues, setInitialValues] = useState({
    company_name: "",
    email: "",
    tax_number: "",
    commercial_register_number: "",
    license_number: "",
    status: true,
    kyc_status: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["getVendorDetails", id],
    queryFn: () => getVendorDetailsAPI(id),
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
      <VendorForm initialValues={initialValues} isSuccess={isSuccess} isError={isError} isLoading={isLoading} />
    </>
  );
};

export default ViewVendor;
