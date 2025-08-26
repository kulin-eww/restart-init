import React, { useEffect, useState } from 'react'
import Editor from '../../components/CMS/Editor'
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCMSDetailAPI } from '../../api/cms';
import CMSForm from './CMSForm';

const ViewContent = () => {
    const navigate = useNavigate()
    const location = useLocation();
    console.log("Line 10", location)
     const [searchParams] = useSearchParams();
      const cmsId = searchParams.get("id");
    const [cmsContent, setCmsContent] = useState<any>({})
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { data, isSuccess, error, isError, refetch } = useQuery({
        queryKey: ["getCMS"],
        queryFn: () => getCMSDetailAPI(cmsId),
    });
    useEffect(() => {
        if (isSuccess) {
            console.log("Line 23", data?.data)
            const updatedData = {
              "title-en": data?.data?.show_name?.en,
              "title-ar": data?.data?.show_name?.ar,
              "value-en": data?.data?.value?.en,
              "value-ar": data?.data?.value?.ar
            }
          setCmsContent(updatedData)
        } else if (isError) {
          setIsLoading(false);
        }
      }, [isSuccess, data, isError]);
  return (
    <>
      <div className="w-full mt-4 bg-bg-secondary p-4 rounded-xl">
          <CMSForm action="view" cmsContent={cmsContent} title={data?.data?.name} role={data?.data?.for} />
      </div>
    </>
  )
}

export default ViewContent
