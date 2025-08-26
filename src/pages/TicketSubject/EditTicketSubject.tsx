import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import TicketSubjectForm from "./TicketSubjectForm";
import { editTicketSubjectAPI, getTicketSubjectDetailsAPI } from "../../api/ticketSubject";
import useToast from "../../hooks/useToast";

const EditTicketSubject = () => {
  const navigate = useNavigate();
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

  const handleEditTicketSubject = useMutation({
    mutationFn: editTicketSubjectAPI,
    onSuccess: (res) => {
      useToast(res.message);
      navigate("/ticket-subject");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      {isSuccess && initialValues.id && (
        <TicketSubjectForm
          action="edit"
          onSave={handleEditTicketSubject}
          initialValues={initialValues}
          isSuccess={isSuccess}
          isError={isError}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default EditTicketSubject;
