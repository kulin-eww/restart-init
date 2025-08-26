import { useCallback, useEffect, useState } from "react";
import DeleteUser from "../Users/DeleteUser";
import ListUser from "../Users/ListUser";
import UserHeader from "../Users/UserHeader";
import ListFAQ from "./ListFAQ";
import FAQHeader from "./FAQHeader";
import { useQuery } from "@tanstack/react-query";
import { listFAQAPI } from "../../api/faq";
import { debounce } from "@mui/material";
import DeleteFAQ from "./DeleteFAQ";

const Faq = () => {

  const [search, setSearch] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFaqId, setDeleteFaqId] = useState("");
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true);

   const { data, isSuccess, error, isError, isFetching, refetch } = useQuery({
    queryKey: ["listFAQ"],
    queryFn: ()=> listFAQAPI({search, pageNumber, pageSize}),
    enabled: true
  });

  const refetchData = useCallback(
    debounce(() => {
      refetch();
    }, 300),
    []
  );

  useEffect(() => {
    refetchData();
  }, [search]);

  useEffect(() => {
    if (isSuccess) {
      setFaqs(data?.data?.faqList);
      setTotalCount(data?.data?.total_count)
      setPageNumber(data?.data?.current_page)
      setPageSize(data?.data?.per_page)
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleDeleteFAQ = (id: string) => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteFaqId(id);
  };
  
  return (
    <>
      <div className="bg-layout-bg p-2 rounded-lg shadow-md">
        <FAQHeader selectedUser={selectedUser} setSelectedUser={setSelectedUser} search={search} setSearch={setSearch} />
        <ListFAQ 
          data={faqs}
          search={search}
          totalCount={totalCount}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handleDeleteFAQ={handleDeleteFAQ}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
        />
        <DeleteFAQ showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} deleteFaqId={deleteFaqId} refetchData={refetchData} />
      </div>
    </>
  );
};

export default Faq;
