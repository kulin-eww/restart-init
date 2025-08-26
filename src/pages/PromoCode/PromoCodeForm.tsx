import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";

const PromoCodeForm: React.FC<{
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
    code: string;
    discount: string;
    validity: string;
  }>({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: Yup.object({
      code: Yup.string()
        .required("Code is required")
        .max(50, "Code must be at most 20 characters"),
      discount: Yup.string()
        .required("Discount is required")
        .max(50, "Discount must be at most 10 characters"),
      validity: Yup.string()
        .required("Validity is required")
        .max(50, "Validity must be at most 10 characters"),
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
        <div className="text-xl font-bold">{title} Promo Code</div>
      </div>
      <hr />
      <div className="w-full mt-4 bg-bg-secondary p-4 rounded-xl">
        {isLoading && <Loader />}
        {isSuccess && !isLoading && (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-4">
              <TextField
                name="code"
                label="Code"
                fullWidth
                value={formik.values.code ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && (formik.errors.code as string)}
                multiline
                rows={1}
                slotProps={{
                  input: {
                    readOnly: action === "view",
                  },
                }}
                variant={action === "view" ? "filled" : "outlined"}
              />

              <TextField
                name="discount"
                label="Discount"
                fullWidth
                value={formik.values.discount ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.discount && Boolean(formik.errors.discount)}
                helperText={formik.touched.discount && (formik.errors.discount as string)}
                multiline
                rows={1}
                slotProps={{
                  input: {
                    readOnly: action === "view",
                  },
                }}
                variant={action === "view" ? "filled" : "outlined"}
              />

              <TextField
                name="validity"
                label="Validity"
                fullWidth
                value={formik.values.validity ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.validity && Boolean(formik.errors.validity)}
                helperText={formik.touched.validity && (formik.errors.validity as string)}
                multiline
                rows={1}
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

export default PromoCodeForm;
