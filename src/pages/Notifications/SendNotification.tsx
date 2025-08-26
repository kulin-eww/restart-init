import React from 'react'
import NotificationForm from './NotificationForm'

const SendNotification = () => {
    const initialValues = {
        title: "",
        description: "",
        sendTo: "",
        specificUsers: ""
    }
  return (
    <>
      <NotificationForm initialValues={initialValues}  />
    </>
  )
}

export default SendNotification
