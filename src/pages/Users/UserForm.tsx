import React, { useState, useRef } from "react";
import { TextField, MenuItem, FormControlLabel, Switch } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";

const UserForm: React.FC<{
  initialValues: any;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}> = ({ initialValues, isSuccess, isError, isLoading }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<any>(initialValues?.profile_image || null);
  const fileInputRef: any = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      formik.setFieldValue("profile_image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    formik.setFieldValue("profile_image", "");
  };
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
        <div className="text-xl font-bold">View User</div>
      </div>
      <hr />
      <div className="w-full mt-4 bg-bg-secondary p-4 rounded-xl">
        {isLoading && <Loader />}
        {isSuccess && !isLoading && (
          <form onSubmit={formik.handleSubmit}>
            <div className="flex mb-4">
              <div className="flex items-center gap-2 mb-2">
                {/* Circular Image Preview */}
                <div className="w-20 h-20 rounded-full bg-[#07CFCC]/10 flex items-center justify-center">
                  {preview ? (
                    <img src={preview} alt="profile-image" className="rounded-full object-cover w-20 h-20" />
                  ) : (
                    <img src="/icons/auth/gallery.svg" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    name="profilePicture"
                  />
                  {!preview ? (
                    <div className="cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      Upload Profile Picture
                    </div>
                  ) : (
                    <div className="cursor-pointer" onClick={handleRemoveImage}>
                      Remove Profile Picture
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
              <TextField
                name="name"
                label="Name"
                fullWidth
                value={formik.values.name}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="filled"
              />

              <TextField
                name="email"
                label="Email"
                fullWidth
                value={formik.values.email}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="filled"
              />

              <TextField
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                value={formik.values.phone}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="filled"
              />

              <TextField
                name="dob"
                label="Date of Birth"
                type="date"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  input: {
                    readOnly: true,
                  },
                }}
                fullWidth
                value={formik.values.dob ? new Date(formik.values.dob).toISOString().split("T")[0] : ""}
                variant="filled"
              />

              <TextField
                name="gender"
                label="Gender"
                select
                fullWidth
                value={formik.values.gender ?? ""}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                variant="filled"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>

              <FormControlLabel
                control={
                  <Switch
                    // onChange={formik.handleChange}
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

export default UserForm;
