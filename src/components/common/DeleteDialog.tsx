import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Stack, useTheme } from "@mui/material";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?:boolean
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: "80%",
              sm: "70%",
              md: "40%",
            },
            maxWidth: "90vw",
            borderRadius: 3,
            boxShadow: theme.shadows[24],
            p: 2,
            // background: `linear-gradient(135deg, ${theme.palette.background.paper} 80%, ${theme.palette.error.light}10%)`,
          },
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, mt: 1, ml: 2 }}>
        <ExclamationTriangleIcon style={{ color: theme.palette.warning.main, width: 32, height: 32 }} />
        <DialogTitle sx={{ flex: 1, p: 0, fontWeight: 700, color: theme.palette.error.main, fontSize: 22 }}>
          {title}
        </DialogTitle>
      </Stack>
      <DialogContent sx={{ background: "transparent" }}>
        <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontSize: 16 }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={onClose} variant="cancel" color="inherit" sx={{ borderRadius: 2, fontWeight: 500 }}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{ borderRadius: 2, fontWeight: 600, boxShadow: 2 }}
          loading={isLoading}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
