import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, FormControlLabel, MenuItem, Switch, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import RichTextEditor from "../../components/CMS/RichTextEditor";

interface Props {
  isEdit: true | false | "view";
  onSave?: any;
  initialValues: any;
  id?: string;
  isPending?: boolean;
}

const FAQForm: React.FC<Props> = ({ isEdit, onSave, initialValues, id, isPending }) => {
  console.log("Line 15", initialValues);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      "question-en": Yup.string().required("Question EN is required"),
      "answer-en": Yup.string().required("Answer EN is required"),
      "question-ar": Yup.string().required("Question AR is required"),
      "answer-ar": Yup.string().required("Answer AR is required"),
      type: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values) => {
      const payload = {
        type: values?.type,
        question: {
          en: values?.["question-en"],
          ar: values?.["question-ar"],
        },
        answer: {
          en: values?.["answer-en"],
          ar: values?.["answer-ar"],
        },
      };
      if (isEdit) {
        onSave.mutate({ ...payload, id: id });
      } else {
        onSave.mutate(payload);
      }
    },
  });

  console.log("Line 42", formik?.values, initialValues);

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
        <div className="text-xl font-semibold mb-2">
          {isEdit === true ? "Edit FAQ" : isEdit === false ? "Add FAQ" : "View FAQ"}
        </div>
      </div>
      <hr />
      <div className="w-full mt-4 bg-bg-secondary p-4 rounded-xl">
        <form onSubmit={formik.handleSubmit} className="w-full mt-4 bg-bg-secondary p-4 rounded-xl">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              name="question-en"
              label="Question EN"
              fullWidth
              value={formik.values?.["question-en"] ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched?.["question-en"] && Boolean(formik.errors?.["question-en"])}
              helperText={formik.touched?.["question-en"] && (formik.errors?.["question-en"] as string)}
              slotProps={{
                input: {
                  readOnly: isEdit === "view" ? true : false,
                },
              }}
              variant={isEdit === "view" ? "filled" : "outlined"}
            />

            <TextField
              name="question-ar"
              label="Question AR"
              fullWidth
              value={formik.values?.["question-ar"] ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched?.["question-ar"] && Boolean(formik.errors?.["question-ar"])}
              helperText={formik.touched?.["question-ar"] && (formik.errors?.["question-ar"] as string)}
              slotProps={{
                input: {
                  readOnly: isEdit === "view" ? true : false,
                },
              }}
              variant={isEdit === "view" ? "filled" : "outlined"}
            />

            <TextField
              name="answer-en"
              label="Answer EN"
              fullWidth
              value={formik.values?.["answer-en"] ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched?.["answer-en"] && Boolean(formik.errors?.["answer-en"])}
              helperText={formik.touched?.["answer-en"] && (formik.errors?.["answer-en"] as string)}
              multiline
              rows={4}
              slotProps={{
                input: {
                  readOnly: isEdit === "view" ? true : false,
                },
              }}
              variant={isEdit === "view" ? "filled" : "outlined"}
            />

            <TextField
              name="answer-ar"
              label="Answer AR"
              fullWidth
              value={formik.values?.["answer-ar"] ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched?.["answer-ar"] && Boolean(formik.errors?.["answer-ar"])}
              helperText={formik.touched?.["answer-ar"] && (formik.errors?.["answer-ar"] as string)}
              multiline
              rows={4}
              slotProps={{
                input: {
                  readOnly: isEdit === "view" ? true : false,
                },
              }}
              variant={isEdit === "view" ? "filled" : "outlined"}
            />

            {/* <RichTextEditor
                onChange={(content) => formik?.setFieldValue("answer-ar", content)} 
                value={formik?.values?.["value-en"]}
                isRTL={false}
                readOnly={isEdit === "view"}
            />
            <RichTextEditor
                onChange={(content) =>formik?.setFieldValue("value-ar", content)} 
                value={formik?.values?.["value-ar"]}
                isRTL={false}
                readOnly={isEdit === "view"}
            /> */}
          </div>

          <div className="w-1/2 mt-4">
            <div className="flex justify-center items-center">
              <TextField
                name="type"
                label="Select Role"
                select
                fullWidth
                value={formik?.values?.type ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik?.touched?.type && Boolean(formik?.errors?.type)}
                helperText={formik?.touched?.type && (formik?.errors?.type as string)}
                slotProps={{
                  input: {
                    readOnly: isEdit === "view" ? true : false,
                  },
                }}
                variant={isEdit === "view" ? "filled" : "outlined"}
              >
                <MenuItem value="user_app">Customer</MenuItem>
                <MenuItem value="vendor">Vendor</MenuItem>
                <MenuItem value="driver_app">Driver</MenuItem>
              </TextField>
            </div>
          </div>

          {isEdit !== "view" && (
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="cancel" onClick={() => formik.resetForm()}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={onSave?.isPending}>
                {isEdit ? "Update" : "Add"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FAQForm;
