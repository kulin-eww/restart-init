import DeleteDialog from "../../components/common/DeleteDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { deleteTicketSubjectAPI } from "../../api/ticketSubject";

const DeleteTicketSubject: React.FC<{
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTicketSubjectId: string;
}> = ({ showDeleteModal, setShowDeleteModal, deleteTicketSubjectId }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteTicketSubjectAPI,
    onSuccess: (res) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["listTicketSubject"] });
      setShowDeleteModal(false);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      <DeleteDialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          deleteMutation.mutate(deleteTicketSubjectId);
        }}
        title="Delete Ticket Subject"
        message="Are you sure you want to delete this Ticket subject?"
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};

export default DeleteTicketSubject;
