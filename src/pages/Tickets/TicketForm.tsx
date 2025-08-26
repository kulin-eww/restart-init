import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  MenuItem,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Switch,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Loader from "../../components/Loader/Loader";
import ErrorLottie from "../../components/lottie/ErrorLottie";

const TicketForm: React.FC<{
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
        <div className="text-xl font-semibold">View User</div>
      </div>
      <hr />
      <div className="w-full mt-4 bg-bg-secondary p-8 rounded-xl">
        {isLoading && <Loader />}
        {isSuccess && !isLoading && (
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                variant="filled"
                name="user_id"
                label="User ID"
                fullWidth
                value={formik.values.user_id}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />

              <TextField
                variant="filled"
                name="user_type"
                label="User Type"
                fullWidth
                value={formik.values.user_type}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />

              <TextField
                variant="filled"
                name="ticket_number"
                label="Ticket Number"
                fullWidth
                value={formik.values.ticket_number}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />

              <TextField
                variant="filled"
                name="ticket_status"
                label="Ticket Status"
                fullWidth
                value={formik.values.ticket_status}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />

              <div className="md:col-span-2 lg:col-span-2">
                <TextField
                  variant="filled"
                  name="ticket_subject"
                  label="Ticket Subject"
                  fullWidth
                  value={formik.values.ticket_subject}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <TextField
                  variant="filled"
                  name="ticket_message"
                  label="Ticket Message"
                  fullWidth
                  value={formik.values.ticket_message}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  multiline
                  rows={3}
                />
              </div>
            </div>
          </form>
        )}
        {isError && <ErrorLottie />}
      </div>
    </div>
  );
};

export default TicketForm;
