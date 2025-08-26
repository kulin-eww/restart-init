import { useQuery } from "@tanstack/react-query";
import UserForm from "./UserForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserDetailsAPI } from "../../api/user";
import { useEffect, useState } from "react";

const ViewUser = () => {
  const [initialValues, setInitialValues] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["getUserDetails", id],
    queryFn: () => getUserDetailsAPI(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setInitialValues(data.data);
      setIsLoading(false);
    }
    else if(isError){
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  return <><UserForm initialValues={initialValues} isSuccess={isSuccess} isError={isError} isLoading={isLoading} /></>;
};

export default ViewUser;
