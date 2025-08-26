import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listReviewRatingAPI } from "../../api/reviewRating";
import ListReviewRating from "./ListReviewRating";
import DeleteReviewRating from "./DeleteReviewRating";
import ReviewRatingHeader from "./ReviewRatingHeader";

const ReviewRating = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [reviewData,setReviewData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState("");

  const { data, isSuccess,isError } = useQuery({
    queryKey: ["listUsers", { pageSize, pageNumber,search }],
    queryFn: () => listReviewRatingAPI({ pageSize, pageNumber,search }),
  });

  useEffect(() => {
    if (isSuccess) {
      setReviewData(data.data.reviewRatingList);
      setTotalCount(data.data.total_count);
      setIsLoading(false);
    }
    else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data]);

  const handleDeleteUser = (id: string) => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteReviewId(id);
  };

  return (
    <>
      <div className="bg-layout-bg p-2 rounded-lg shadow-md">
        <ReviewRatingHeader search={search} setSearch={setSearch} />
        <ListReviewRating
          data={reviewData}
          search={search}
          totalCount={totalCount}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handleDeleteUser={handleDeleteUser}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
        />
        <DeleteReviewRating
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          deleteUserId={deleteReviewId}
        />
      </div>
    </>
  );
};

export default ReviewRating;
