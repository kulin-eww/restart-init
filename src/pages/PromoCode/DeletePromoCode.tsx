import DeleteDialog from "../../components/common/DeleteDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { deletePromoCodeAPI } from "../../api/promoCode";

const DeletePromoCode: React.FC<{
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deletePromoCodeId: string;
}> = ({ showDeleteModal, setShowDeleteModal, deletePromoCodeId }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deletePromoCodeAPI,
    onSuccess: (res) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["listPromoCode"] });
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
          deleteMutation.mutate(deletePromoCodeId);
        }}
        title="Delete Promo Code"
        message="Are you sure you want to delete this Promo Code?"
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};

export default DeletePromoCode;
