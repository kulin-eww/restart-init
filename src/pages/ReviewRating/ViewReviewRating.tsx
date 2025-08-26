import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewRatingForm from "./ReviewRatingForm";
import { getReviewRatingDetailsAPI } from "../../api/reviewRating";

const ViewReviewRating = () => {
  const [initialValues, setInitialValues] = useState<any>({});
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const { data, isSuccess } = useQuery({
    queryKey: ["getReviewRatingDetails", userId],
    queryFn: () => getReviewRatingDetailsAPI(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setInitialValues(data.data);
    }
  }, [isSuccess, data]);

  return <>{isSuccess && initialValues.id && <ReviewRatingForm initialValues={initialValues} />}</>;
};

export default ViewReviewRating;
