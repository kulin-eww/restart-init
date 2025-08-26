import { TextField, FormControlLabel, Rating, Switch } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";

const VendorForm: React.FC<{
  initialValues: any;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}> = ({ initialValues, isSuccess, isError, isLoading }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async (values) => {
      console.log(values);
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
        <div className="text-xl font-bold">View Vendor</div>
      </div>
      <hr />
      <div className="w-full mt-4 bg-bg-secondary p-6 rounded-xl">
        {isLoading && <Loader />}
        {isSuccess && !isLoading && (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
              <TextField
                name="company_name"
                label="Company Name"
                fullWidth
                value={formik.values.company_name}
                slotProps={{
                  input: { readOnly: true },
                }}
                variant="filled"
              />
              <TextField
                name="email"
                label="Email"
                fullWidth
                value={formik.values.email}
                slotProps={{
                  input: { readOnly: true },
                }}
                variant="filled"
              />
              <TextField
                name="tax_number"
                label="Tax Number"
                fullWidth
                value={formik.values.tax_number}
                slotProps={{
                  input: { readOnly: true },
                }}
                variant="filled"
              />
              <TextField
                name="commercial_register_number"
                label="Commercial Register Number"
                fullWidth
                value={formik.values.commercial_register_number}
                slotProps={{
                  input: { readOnly: true },
                }}
                variant="filled"
              />
              <TextField
                name="license_number"
                label="License Number"
                fullWidth
                value={formik.values.license_number}
                slotProps={{
                  input: { readOnly: true },
                }}
                variant="filled"
              />
              <TextField
                name="kyc_status"
                label="Kyc Status"
                fullWidth
                value={formik.values.kyc_status}
                slotProps={{
                  input: { readOnly: true },
                }}
                variant="filled"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.status}
                    name="status"
                    slotProps={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                }
                label="Status"
              />
            </div>
          </form>
        )}
        {isError && <ErrorLottie />}
      </div>
    </div>
  );
};

export default VendorForm;
