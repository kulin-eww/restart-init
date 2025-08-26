import { useMutation, useQuery } from "@tanstack/react-query";
import { listUsersAPI } from "../../api/user";
import { useEffect, useState } from "react";
import { listTicketAPI } from "../../api/ticket";
import CancellationChargesHeader from "./CancellationChargesHeader";
import CancellationChargesForm from "./CancellationChargesForm";
import { editCancellationChargesAPI, getCancellationChargesDetailsAPI } from "../../api/cancellationCharges";
import useToast from "../../hooks/useToast";

const CancellationCharges = () => {
  const [initialValues, setInitialValues] = useState<any>({ customer_amount: "", vendor_amount: "" });
  const [isLoading, setIsLoading] = useState(true);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["getCancellationChargesDetails"],
    queryFn: () => getCancellationChargesDetailsAPI(),
  });

  useEffect(() => {
    if (isSuccess && data) {
      setInitialValues(data.data[0]);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleEditTicketSubject = useMutation({
    mutationFn: editCancellationChargesAPI,
    onSuccess: (res) => {
      useToast(res.message);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <div className="bg-layout-bg p-2 rounded-lg shadow-md">
      <CancellationChargesHeader />
      <CancellationChargesForm
        initialValues={initialValues}
        onSave={handleEditTicketSubject}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CancellationCharges;
