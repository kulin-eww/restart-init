import React from "react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";

const CancellationChargesForm: React.FC<{
  initialValues: any;
  onSave: any;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}> = ({ initialValues, onSave, isSuccess, isError, isLoading }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      customer_amount: Yup.string().required("Customer amount is required"),
      vendor_amount: Yup.string().required("Vendor amount is required"),
    }),
    onSubmit: async (values) => {
      onSave.mutate(values);
    },
  });

  return (
    <div className="p-4">
      <div className="w-full bg-bg-secondary p-4 rounded-xl">
        {isLoading && <Loader />}
        {isSuccess && !isLoading && (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
              <TextField
                type="number"
                variant="filled"
                name="customer_amount"
                label="Customer Amount"
                fullWidth
                value={formik.values.customer_amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.customer_amount && Boolean(formik.errors.customer_amount)}
                helperText={formik.touched.customer_amount && (formik.errors.customer_amount as string)}
              />

              <TextField
                type="number"
                variant="filled"
                name="vendor_amount"
                label="Vendor Amount"
                fullWidth
                value={formik.values.vendor_amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.vendor_amount && Boolean(formik.errors.vendor_amount)}
                helperText={formik.touched.vendor_amount && (formik.errors.vendor_amount as string)}
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="cancel" onClick={() => formik.resetForm()}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" loading={onSave.isPending}>
                Update
              </Button>
            </div>
          </form>
        )}
        {isError && <ErrorLottie />}
      </div>
    </div>
  );
};

export default CancellationChargesForm;
