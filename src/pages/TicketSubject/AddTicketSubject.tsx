import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createTicketSubjectAPI } from "../../api/ticketSubject";
import useToast from "../../hooks/useToast";
import TicketSubjectForm from "./TicketSubjectForm";

const AddTicketSubject = () => {
  const navigate = useNavigate();

  const initialValues = {
    subject: {
      en: "",
      ar: "",
    },
  };

  const handleAddTicketSubject = useMutation({
    mutationFn: createTicketSubjectAPI,
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
      <TicketSubjectForm
        action="add"
        onSave={handleAddTicketSubject}
        initialValues={initialValues}
        isSuccess={true}
        isError={false}
        isLoading={false}
      />
    </>
  );
};

export default AddTicketSubject;
