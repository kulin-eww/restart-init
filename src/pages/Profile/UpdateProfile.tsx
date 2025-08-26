import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import type { RootState } from "../../redux/store";
import { updateAdminDetailsAPI } from "../../api/admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";

const UpdateProfile = () => {
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateAdminDetailsAPI,
    onSuccess: (res) => {
      useToast(res.message);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userDetails.name,
      email: userDetails.email,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <div className="bg-layout-bg shadow-md rounded-xl px-6 py-4">
        <div className="text-xl font-semibold mb-2">Profile</div>
        <hr />
        <div className="mt-4">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
              <TextField
                fullWidth
                label="Name"
                name="name"
                type="text"
                placeholder="Enter name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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

export default UpdateProfile;
