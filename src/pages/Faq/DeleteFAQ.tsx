import { useState } from "react";
import DeleteDialog from "../../components/common/DeleteDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserAPI } from "../../api/user";
import useToast from "../../hooks/useToast";
import { deleteFAQAPI } from "../../api/faq";

const DeleteFAQ: React.FC<{
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteFaqId: string;
  refetchData: ()=>void;
}> = ({ showDeleteModal, setShowDeleteModal, deleteFaqId, refetchData }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteFAQAPI,
    onSuccess: (res) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["listFAQ"] });
      setShowDeleteModal(false);
      refetchData()
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
          deleteMutation.mutate(deleteFaqId);
        }}
        title="Delete FAQ"
        message="Are you sure you want to delete this FAQ?"
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteMutation?.isPending}
      />
    </>
  );
};

export default DeleteFAQ;
