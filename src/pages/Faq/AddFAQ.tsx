import React from 'react'
import { useNavigate } from 'react-router-dom';
import FAQForm from './FAQForm';
import { useMutation } from '@tanstack/react-query';
import useToast from '../../hooks/useToast';
import { addFAQAPI } from '../../api/faq';

const AddFAQ = () => {
    const navigate = useNavigate();

  const initialValues = {
    "question-en": "",
    "answer-en": "",
    "question-ar": "",
    "answer-ar": "",
    "type": ""
  };

  const handleAddFAQ = useMutation({
    mutationFn: addFAQAPI,
    onSuccess: (res) => {
      useToast(res.message);
      navigate("/faq");
    },
    onError: (error) => {
      console.log("Line 26", error)
      useToast(error.message, "error");
    },
  });

  return (
    <>
      <FAQForm isEdit={false} initialValues={initialValues} onSave={handleAddFAQ} isPending={handleAddFAQ?.isPending} />
    </>
  )
}

export default AddFAQ
