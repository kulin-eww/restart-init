import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'
import { data, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import FAQForm from './FAQForm';
import { useQuery } from '@tanstack/react-query';
import { faqDetailAPI } from '../../api/faq';

const FAQDetails = () => {
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
  return (
    <>
            <FAQForm initialValues={initialValues} isEdit={"view"} />
    </>
  )
}

export default FAQDetails
