import React, { useState, useRef } from "react";
import {
  TextField,
  FormControlLabel,
  Rating,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const ReviewRatingForm: React.FC<{
  initialValues: any;
}> = ({ initialValues }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      user: Yup.string().required("User is required"),
      vendor: Yup.string().required("Vendor is required"),
      rating: Yup.number().required("Rating is required"),
      review: Yup.string().required("Review is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      // onSave({ ...values, device_type: "web", device_token: "abc" });
    },
  });

  return (
    <div className="bg-layout-bg rounded-lg shadow-md px-6 py-4">
      <div className="flex justify-start items-center mb-2 gap-2">
        <div
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowLeftIcon className="h-5 cursor-pointer" />
        </div>
        <div className="text-xl font-bold">View Reviews & Ratings</div>
      </div>
      <hr />
      <form onSubmit={formik.handleSubmit} className="w-full mt-4 bg-bg-secondary p-4 rounded-xl">
        <div className="grid gap-4">
          {/* Row 1: From + To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              name="user"
              label="User"
              fullWidth
              value={formik.values.user}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.user && Boolean(formik.errors.user)}
              helperText={formik.touched.user && (formik.errors.user as string)}
              slotProps={{
                input: { readOnly: true },
              }}
            />

            <TextField
              name="vendor"
              label="Vendor"
              type="text"
              fullWidth
              value={formik.values.vendor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.vendor && Boolean(formik.errors.vendor)}
              helperText={formik.touched.vendor && (formik.errors.vendor as string)}
              slotProps={{
                input: { readOnly: true },
              }}
            />
          </div>

          {/* Row 2: Reviews */}
          <TextField
            name="reviews"
            label="Reviews"
            fullWidth
            value={formik.values.review}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.review && Boolean(formik.errors.review)}
            helperText={formik.touched.review && (formik.errors.review as string)}
            slotProps={{
              input: { readOnly: true },
            }}
            multiline
            rows={4}
          />

          {/* Row 3: Rating */}
          <FormControlLabel
            label="Rating"
            control={<Rating name="rating" value={formik.values.rating} defaultValue={2.5} precision={0.5} readOnly />}
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewRatingForm;
