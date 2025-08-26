import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ListPromoCode from "./ListPromoCode";
import PromoCodeHeader from "./PromoCodeHeader";
import DeletePromoCode from "./DeletePromoCode";
import { listPromoCodeAPI } from "../../api/promoCode";

const PromoCode = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [promoCodeData, setPromoCodeData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePromoCodeId, setDeletePromoCodeId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listPromoCode", { pageSize, pageNumber }],
    queryFn: () => listPromoCodeAPI({ pageSize, pageNumber }),
  });

  useEffect(() => {
    if (isSuccess) {
      setPromoCodeData(data.data);
      setTotalCount(data.data.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data]);

  const handleDeletePromoCode = (id: string) => {
    setShowDeleteModal(!showDeleteModal);
    setDeletePromoCodeId(id);
  };

  return (
    <div className="bg-layout-bg p-2 rounded-lg shadow-md">
      <PromoCodeHeader />
      <ListPromoCode
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={promoCodeData}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        handleDeletePromoCode={handleDeletePromoCode}
      />
      <DeletePromoCode
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deletePromoCodeId={deletePromoCodeId}
      />
    </div>
  );
};

export default PromoCode;
