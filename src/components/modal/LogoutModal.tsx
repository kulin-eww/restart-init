import { Dialog } from '@mui/material'
import React from 'react'

interface modalProps {
    open: boolean,
    setOpen: (open: boolean) => void
}

const LogoutModal:React.FC<modalProps> = ({open, setOpen}) => {
  return (
    <>
      <Dialog open={open}>
        <div className='p-4 w-full'>
            <h1 className='text-2xl font-bold my-2'>Logout</h1>
            <hr/>
            <div className='my-4'>
                <h3 className='font-semibold'>Are you sure you want to logout?</h3>
            </div>
            <div className='flex justify-between items-center mt-2'>
                <button className='bg-black text-white border rounded-md p-2 cursor-pointer' onClick={()=>{setOpen(false)}}>Cancel</button>
                <button className='border rounded-md p-2 cursor-pointer' onClick={()=>{setOpen(false)}}>Logout</button>
            </div>
        </div>
      </Dialog>
    </>
  )
}

export default LogoutModal
