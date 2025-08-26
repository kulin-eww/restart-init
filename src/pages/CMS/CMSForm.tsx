import React from "react";
import Editor from "../../components/CMS/Editor";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button, TextField } from "@mui/material";
import RichTextEditor from "../../components/CMS/RichTextEditor";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { updateCMSDetailAPI } from "../../api/cms";
import useToast from "../../hooks/useToast";

const CMSForm = ({
  action,
  cmsContent,
  title,
  role,
}: {
  action: "view" | "edit";
  cmsContent: any;
  title: string;
  role: string;
}) => {
  console.log("Line 11", cmsContent, title);
  const [searchParams] = useSearchParams();
  const cmsId = searchParams.get("id");
  const navigate = useNavigate();
  const { values, errors, handleChange, handleBlur, touched, handleSubmit, resetForm, setFieldValue } = useFormik({
    initialValues: cmsContent,
    enableReinitialize: true,
    validationSchema: Yup.object({
      "title-en": Yup.string().required("Title EN is required"),
      "title-ar": Yup.string().required("Title AR is required"),
      "value-en": Yup.string().required("Description EN is required"),
      "value-ar": Yup.string().required("Description AR is required"),
    }),
    onSubmit: (values) => {
      const payload = {
        id: cmsId,
        show_name: {
          en: values?.["title-en"],
          ar: values?.["title-ar"],
        },
        value: {
          en: values?.["value-en"],
          ar: values?.["value-ar"],
        },
      };
      console.log("Line 39", payload);
      mutate(payload);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateCMSDetailAPI,
    onSuccess: (res) => {
      useToast(res.message);
      navigate(-1);
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  console.log("Line 55", values);

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
          <div className="text-xl font-semibold mb-2">{`${action === "view" ? "View" : "Edit"} ${role === "vendor" ? "Vendor" : role === "driver" ? "Driver" : role === "user" ? "Customer" : "Web"}'s ${title === "privacy_policy" ? "Privacy Policy" : title === "about_us" ? "About Us" : title === "terms_and_conditions" ? "Terms and Conditions" : ""}`}</div>
        </div>
        <hr />
        <div className="w-full mt-4 bg-bg-secondary p-4 rounded-xl">
          <form onSubmit={handleSubmit} className="w-full bg-bg-secondary p-4 rounded-xl">
            <div className="grid grid-cols-2 gap-4">
              <TextField
                name="title-en"
                label="Title EN"
                fullWidth
                value={values?.["title-en"] ?? ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.["title-en"] && Boolean(errors?.["title-en"])}
                helperText={touched?.["title-en"] && (errors?.["title-en"] as string)}
                slotProps={{
                  input: {
                    readOnly: action === "view" ? true : false,
                  },
                }}
                variant={action === "view" ? "filled" : "outlined"}
                multiline
                rows={2}
                sx={{
                  "& textarea": {
                    overflowY: "auto", // scrolling works
                    scrollbarWidth: "none", // Firefox
                    "&::-webkit-scrollbar": {
                      display: "none", // Chrome, Safari
                    },
                  },
                }}
              />
              <TextField
                name="title-ar"
                label="Title AR"
                fullWidth
                value={values?.["title-ar"] ?? ""}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.["title-ar"] && Boolean(errors?.["title-ar"])}
                helperText={touched?.["title-ar"] && (errors?.["title-ar"] as string)}
                slotProps={{
                  input: {
                    readOnly: action === "view" ? true : false,
                  },
                }}
                variant={action === "view" ? "filled" : "outlined"}
                multiline
                rows={2}
                sx={{
                  "& textarea": {
                    overflowY: "auto", // scrolling works
                    scrollbarWidth: "none", // Firefox
                    "&::-webkit-scrollbar": {
                      display: "none", // Chrome, Safari
                    },
                  },
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <RichTextEditor
                onChange={(content) => setFieldValue("value-en", content)}
                value={values?.["value-en"]}
                isRTL={false}
                readOnly={action === "view"}
              />
              <RichTextEditor
                onChange={(content) => setFieldValue("value-ar", content)}
                value={values?.["value-ar"]}
                isRTL={false}
                readOnly={action === "view"}
              />
            </div>
            {action !== "view" && (
              <div className="flex justify-end gap-4 mt-6">
                <Button variant="cancel" onClick={() => resetForm()}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" disabled={isPending}>
                  {"Update"}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CMSForm;
