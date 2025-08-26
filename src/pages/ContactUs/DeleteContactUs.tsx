import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import DeleteDialog from '../../components/common/DeleteDialog';

const DeleteContactUs = ({
  showDeleteModal, setShowDeleteModal, deleteUserId,
}: {
    showDeleteModal: boolean,
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUserId: string
}) => {
  const queryClient = useQueryClient();
//   const deleteMutation = useMutation({
//     mutationFn: deleteUserAPI,
//     onSuccess: (res) => {
//       useToast(res.message);
//       queryClient.invalidateQueries({ queryKey: ["listUsers"] });
//       setShowDeleteModal(false);
//     },
//     onError: (error) => {
//       useToast(error.message, "error");
//     },
//   });

  return (
    <>
      <DeleteDialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
        //   deleteMutation.mutate(deleteUserId);
        }}
        title="Delete User"
        message="Are you sure you want to delete this from contact us list?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}

export default DeleteContactUs
