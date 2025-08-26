import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAPI } from "../../api/auth";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPasswordAPI,
    onSuccess: (res) => {
      resetForm();
      useToast(res.message);
      navigate("/login");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-[var(--color-primary-500)] text-3xl font-extrabold mb-6">Forgot Password</h2>

      <div className="!space-y-4">
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />

        <Button type="submit" fullWidth variant="contained" color="primary" loading={isPending}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ForgotPassword;
