import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { resetPasswordAPI } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import useToast from "../../hooks/useToast";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log("token", token);

  const { mutate } = useMutation({
    mutationFn: resetPasswordAPI,
    onSuccess: (res) => {
      useToast(res.message);
      navigate("/login");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      mutate({ password: values.password, token });
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-3xl font-bold mb-6">Reset Password</h2>

      <div className="!space-y-4">
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Enter your password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          helperText={touched.confirmPassword && errors.confirmPassword}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ResetPassword;
