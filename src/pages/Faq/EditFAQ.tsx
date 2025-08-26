import React, { useState } from 'react'
import FAQForm from './FAQForm'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { faqDetailAPI, updateFaqDetailAPI } from '../../api/faq';
import useToast from '../../hooks/useToast';

const EditFAQ = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
    const [initialValues, setInitialValues] = useState<any>()
  const faqId = searchParams.get("id");
     const { isFetching, data } = useQuery({
    queryKey: ["faqDetails", faqId],
    queryFn: async () => {
      if (faqId) {
        const response = await faqDetailAPI(faqId);
        if (response.status) {
          console.log(response.data, "faq details");
            setInitialValues({
                "question-en": response?.data?.question?.en,
                "answer-en": response?.data?.answer?.en,
                "question-ar": response?.data?.question?.ar,
                "answer-ar": response?.data?.answer?.ar,
                "type": response?.data?.type
            })
        }
      }
    },
    refetchOnWindowFocus: false,
  });

  const handleEditFAQ = useMutation({
    mutationFn: updateFaqDetailAPI,
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
      <FAQForm initialValues={initialValues} isEdit={true} onSave={handleEditFAQ} id={faqId} />
    </>
  )
}

export default EditFAQ
