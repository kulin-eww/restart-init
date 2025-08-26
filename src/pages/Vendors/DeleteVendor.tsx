import DeleteDialog from "../../components/common/DeleteDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { deleteVendorAPI } from "../../api/vendor";

const DeleteVendor: React.FC<{
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteVendorId: string;
}> = ({ showDeleteModal, setShowDeleteModal, deleteVendorId }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteVendorAPI,
    onSuccess: (res) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["listVendors"] });
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
          deleteMutation.mutate(deleteVendorId);
        }}
        title="Delete Vendor"
        message="Are you sure you want to delete this vendor?"
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};

export default DeleteVendor;
