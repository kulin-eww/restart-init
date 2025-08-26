import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ContactMessageDetails = () => {
  const navigate = useNavigate()
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
          <div className="text-xl font-bold">View Contact Details</div>
        </div>
        <hr />
        <div className="w-full mt-4 bg-bg-secondary p-4 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  // value={formik.values.name}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // error={formik.touched.name && Boolean(formik.errors.name)}
                  // helperText={formik.touched.name && (formik.errors.name as string)}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />

                <TextField
                  name="email"
                  label="Email"
                  fullWidth
                  // value={formik.values.email}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // error={formik.touched.email && Boolean(formik.errors.email)}
                  // helperText={formik.touched.email && (formik.errors.email as string)}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
                
              </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <TextField
                  name="name"
                  label="Created at"
                  fullWidth
                  // value={formik.values.name}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // error={formik.touched.name && Boolean(formik.errors.name)}
                  // helperText={formik.touched.name && (formik.errors.name as string)}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />

                <TextField
                  name="email"
                  label="Role"
                  fullWidth
                  // value={formik.values.email}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // error={formik.touched.email && Boolean(formik.errors.email)}
                  // helperText={formik.touched.email && (formik.errors.email as string)}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
                
              </div>
              <div className="grid grid-cols-1">
                <TextField
                  name="name"
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  // value={formik.values.name}
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // error={formik.touched.name && Boolean(formik.errors.name)}
                  // helperText={formik.touched.name && (formik.errors.name as string)}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />

                    
              </div>
            </div>

        </div>
        
    </>
  )
}

export default ContactMessageDetails
