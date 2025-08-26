import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changeAdminPasswordAPI } from "../../api/admin";
import useToast from "../../hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const UpdatePassword = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: changeAdminPasswordAPI,
    onSuccess: (res) => {
      useToast(res.message);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm } = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
      newPassword: Yup.string()
        .min(8, "Confirm Password must be at least 8 characters")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <div className="bg-layout-bg shadow-md rounded-xl px-6 py-4">
        <div className="text-xl font-semibold mb-2">Change Password</div>
        <hr />
        <div className="mt-4">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Old Password"
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={values.oldPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.oldPassword && Boolean(errors.oldPassword)}
                helperText={touched.oldPassword && errors.oldPassword}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showOldPassword ? "hide the password" : "display the password"}
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          edge="end"
                        >
                          {showOldPassword ? <EyeSlashIcon className="h-5" /> : <EyeIcon className="h-5" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showNewPassword ? "hide the password" : "display the password"}
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="end"
                        >
                          {showNewPassword ? <EyeSlashIcon className="h-5" /> : <EyeIcon className="h-5" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button type="submit" variant="contained" loading={isPending}>
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
