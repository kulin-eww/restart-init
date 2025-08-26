import DeleteDialog from "../../components/common/DeleteDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { deleteReviewRatingAPI } from "../../api/reviewRating";

const DeleteReviewRating: React.FC<{
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUserId: string;
}> = ({ showDeleteModal, setShowDeleteModal, deleteUserId }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteReviewRatingAPI,
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
        title="Delete Review"
        message="Are you sure you want to delete this review?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default DeleteReviewRating;
