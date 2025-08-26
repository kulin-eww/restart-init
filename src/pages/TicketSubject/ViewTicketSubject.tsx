import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TicketSubjectForm from "./TicketSubjectForm";
import { getTicketSubjectDetailsAPI } from "../../api/ticketSubject";

const ViewTicketSubject = () => {
  const [initialValues, setInitialValues] = useState({ id: "", subject: { en: "", ar: "" } });
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["getTicketSubjectDetails", id],
    queryFn: () => getTicketSubjectDetailsAPI(id),
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
      <TicketSubjectForm
        action="view"
        initialValues={initialValues}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
      />
    </>
  );
};

export default ViewTicketSubject;
