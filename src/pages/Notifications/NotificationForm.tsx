import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const NotificationForm: React.FC<{ initialValues: any }> = ({ initialValues }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      sendTo: Yup.string().required("User's type is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      //   onSave({ ...values, device_type: "web", device_token: "abc" });
    },
  });

  return (
    <>
      <div className="bg-layout-bg rounded-lg shadow-md px-6 py-4">
        <div className="flex justify-start items-center mb-2 gap-2">
          <div
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeftIcon className="h-5 cursor-pointer" />
          </div>
          <div className="text-xl font-semibold">Send Broadcast Notification</div>
        </div>
        <hr />
        <div className="w-full mt-4 bg-bg-secondary p-4 rounded-xl">
          <form onSubmit={formik.handleSubmit} className="w-full bg-bg-secondary p-4 rounded-xl">
            {/* <div className={`grid grid-cols-1 lg:${formik.values?.sendTo === "specificUsers" ? "grid-cols-3" : "grid-cols-2"} md:grid-cols-2 gap-4`}> */}

            <div
              className={`border border-gray-300 rounded-[5px] mt-4 grid px-2 pt-2 mb-4 ${formik?.values?.sendTo === "specificUsers" ? "grid-cols-2" : "grid-cols-1"}`}
            >
              <FormControl>
                <FormLabel sx={{ fontSize: "small" }}>Select User Type</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-form-control-label-placement"
                  name="sendTo"
                  // value={values.sendTo}
                  onChange={(e) => {
                    formik.setFieldValue("sendTo", e.target.value);
                  }}
                >
                  <FormControlLabel
                    value={"all"}
                    onChange={(e: any) => {
                      console.log("Line 114", e.target.value);
                      formik.setFieldValue("specificUser", "");
                    }}
                    control={<Radio />}
                    label="All"
                    checked={formik?.values.sendTo === "all" ? true : false}
                  />
                  <FormControlLabel
                    value={"specificUsers"}
                    onChange={(e: any) => {
                      console.log("Line 129", e.target.value);
                    }}
                    control={<Radio />}
                    label="Specific Users"
                    checked={formik?.values.sendTo === "specificUsers" ? true : false}
                  />
                </RadioGroup>
              </FormControl>
              {formik?.values?.sendTo === "specificUsers" && (
                <>
                  <FormControl>
                    <FormLabel sx={{ fontSize: "small" }}>Select User Type</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-form-control-label-placement"
                      name="specificUser"
                      value={formik?.values.sendTo}
                      onChange={(e) => {
                        formik.setFieldValue("specificUser", e.target.value);
                      }}
                      sx={{
                        fontSize: "small",
                      }}
                    >
                      <FormControlLabel
                        value={"customer"}
                        onChange={(e: any) => {
                          console.log("Line 114", e.target.value);
                          formik.setFieldValue("specificUser", e.target.value);
                        }}
                        control={<Radio />}
                        label="Customers"
                        checked={formik?.values.specificUser === "customer" ? true : false}
                      />
                      <FormControlLabel
                        value={"vendor"}
                        onChange={(e: any) => {
                          console.log("Line 129", e.target.value);
                          formik.setFieldValue("specificUser", e.target.value);
                        }}
                        control={<Radio />}
                        label="Vendors"
                        checked={formik?.values.specificUser === "vendor" ? true : false}
                      />
                      <FormControlLabel
                        value={"driver"}
                        onChange={(e: any) => {
                          console.log("Line 129", e.target.value);
                          formik.setFieldValue("specificUser", e.target.value);
                        }}
                        control={<Radio />}
                        label="Drivers"
                        checked={formik?.values.specificUser === "driver" ? true : false}
                      />
                    </RadioGroup>
                  </FormControl>
                </>
              )}
            </div>
            <div className="mb-4">
              <TextField
                name="title"
                label="Title"
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && (formik.errors.title as string)}
              />
            </div>
            <div className="mb-4">
              <TextField
                name="description"
                label="Description"
                fullWidth
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && (formik.errors.description as string)}
                multiline
                rows={4}
              />
            </div>
            {/* </div> */}
            <div className="flex justify-end gap-2">
              <Button onClick={() => formik.resetForm()}>Cancel</Button>
              <Button>Send</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NotificationForm;
