import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTicketDetailsAPI } from "../../api/ticket";
import TicketForm from "./TicketForm";

const ViewTicket = () => {
  const [initialValues, setInitialValues] = useState({
    user_id: "",
    user_type: "",
    ticket_number: "",
    ticket_status: "",
    ticket_subject: "",
    ticket_message: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["getTicketDetails", id],
    queryFn: () => getTicketDetailsAPI(id),
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
      <TicketForm initialValues={initialValues} isSuccess={isSuccess} isError={isError} isLoading={isLoading} />
    </>
  );
};

export default ViewTicket;
