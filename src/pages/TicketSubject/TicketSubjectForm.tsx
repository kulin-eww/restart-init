import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";

const TicketSubjectForm: React.FC<{
  action: "add" | "edit" | "view";
  onSave?: any;
  initialValues: any;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}> = ({ action, onSave, initialValues, isSuccess, isError, isLoading }) => {
  const navigate = useNavigate();

  let title = "";
  if (action === "edit") {
    title = "Edit";
  } else if (action === "view") {
    title = "View";
  } else {
    title = "Add";
  }

  const formik = useFormik<{
    subject: {
      en: string;
      ar: string;
    };
  }>({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      subject: Yup.object({
        en: Yup.string()
          .required("English subject is required")
          .max(150, "English subject must be at most 150 characters"),
        ar: Yup.string()
          .required("Arabic subject is required")
          .max(150, "Arabic subject must be at most 150 characters"),
      }),
    }),
    onSubmit: async (values) => {
      onSave.mutate(values);
    },
  });

  return (
    <div className="bg-layout-bg rounded-lg shadow-md px-6 py-4">
      <div className="flex justify-start items-center mb-2 gap-3">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="cursor-pointer"
        >
          <ArrowLeftIcon className="h-5 text-xl mt-0.5" />
        </div>
        <div className="text-xl font-semibold">{title} Ticket Subject</div>
      </div>
      <hr />
      <div className="w-full mt-4 bg-bg-secondary p-4 rounded-xl">
        {isLoading && <Loader />}
        {isSuccess && !isLoading && (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4">
              <TextField
                name="subject.en"
                label="English Subject"
                fullWidth
                value={formik.values.subject.en ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subject?.en && Boolean(formik.errors.subject?.en)}
                helperText={formik.touched.subject?.en && (formik.errors.subject?.en as string)}
                multiline
                rows={4}
                slotProps={{
                  input: {
                    readOnly: action === "view",
                  },
                }}
                variant={action === "view" ? "filled" : "outlined"}
              />

              <TextField
                name="subject.ar"
                label="Arabic Subject"
                fullWidth
                value={formik.values.subject.ar ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subject?.ar && Boolean(formik.errors.subject?.ar)}
                helperText={formik.touched.subject?.ar && (formik.errors.subject?.ar as string)}
                multiline
                rows={4}
                lang="ar"
                dir="rtl"
                slotProps={{
                  input: {
                    readOnly: action === "view",
                  },
                }}
                variant={action === "view" ? "filled" : "outlined"}
              />
            </div>
            {(action === "add" || action === "edit") && (
              <div className="flex justify-end gap-4 mt-6">
                <Button variant="cancel" onClick={() => formik.resetForm()}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" loading={onSave.isPending}>
                  {action === "add" ? "Add" : "Update"}
                </Button>
              </div>
            )}
          </form>
        )}
        {isError && <ErrorLottie />}
      </div>
    </div>
  );
};

export default TicketSubjectForm;
