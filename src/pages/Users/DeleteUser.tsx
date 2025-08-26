import { useState } from "react";
import DeleteDialog from "../../components/common/DeleteDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserAPI } from "../../api/user";
import useToast from "../../hooks/useToast";

const DeleteUser: React.FC<{
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUserId: string;
}> = ({ showDeleteModal, setShowDeleteModal, deleteUserId }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteUserAPI,
    onSuccess: (res) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["listUsers"] });
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
          deleteMutation.mutate(deleteUserId);
        }}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};

export default DeleteUser;
