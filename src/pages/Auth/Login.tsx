import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "../../api/auth";
import useToast from "../../hooks/useToast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (res) => {
      if (values.rememberMe) {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }
      useToast(res.message);
      resetForm();
      navigate("/dashboard");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors, resetForm } = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
      rememberMe: Yup.boolean(),
    }),
    onSubmit: ({ rememberMe, ...rest }) => {
      mutate(rest);
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-3xl font-bold mb-6">Login</h2>

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

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "hide the password" : "display the password"}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    edge="end"
                  >
                    {showPassword ? <EyeSlashIcon className="h-5" /> : <EyeIcon className="h-5" />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <div className="flex justify-between mt-4">
          <FormControlLabel
            control={
              <Checkbox name="rememberMe" value={values.rememberMe} onChange={handleChange} onBlur={handleBlur} />
            }
            label="Remember me"
            sx={{ "& .MuiFormControlLabel-label": { fontSize: "14px" } }}
          />
          <NavLink
            to="/forgot-password"
            className="text-[var(--color-primary-500)] mt-3 hover:underline cursor-pointer text-sm"
          >
            Forgot Password?
          </NavLink>
        </div>

        <Button type="submit" fullWidth variant="contained" color="primary" loading={isPending}>
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
