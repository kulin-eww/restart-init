import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ContactUsHeader from "./ContactUsHeader";
import ListContactUs from "./ListContactUs";
import DeleteContactUs from "./DeleteContactUs";
import ContactUsReply from "./ContactUsReply";
import { listContactUsAPI } from "../../api/contact-us";
import useDebounce from "../../hooks/useDebounce";

const ContactUs = () => {
  const [search, setSearch] = useState<string>("");
  const [contactUsData, setContactUsData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [deleteContact, setDeleteContact] = useState("");
  const [replyId, setReplyId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 400);

  const { data, isSuccess, error, isError, isFetching } = useQuery({
    queryKey: ["listContactUs", { pageNumber, pageSize, search: debouncedSearch }],
    queryFn: () => listContactUsAPI({ pageNumber, pageSize, search: debouncedSearch }),
  });

  useEffect(() => {
    if (isSuccess) {
      setContactUsData(data?.data);
      setIsLoading(false);
    }
  }, [isSuccess, data]);

  const handleDeleteFAQ = (id: string) => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteContact(id);
  };

  const handleReplyModal = (id: string) => {
    setShowReplyModal(!showReplyModal);
    setReplyId(id);
  };

  return (
    <>
      <div className="bg-layout-bg p-2 rounded-lg shadow-md">
        <ContactUsHeader search={search} setSearch={setSearch} />
        <ListContactUs
          data={contactUsData}
          search={search}
          totalCount={totalCount}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handleDeleteContactUs={handleDeleteFAQ}
          handleReplyModal={handleReplyModal}
          isSuccess={isSuccess}
          isError={isError}
          isLoading={isLoading}
        />
        <DeleteContactUs
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          deleteUserId={deleteContact}
        />
        <ContactUsReply
          open={showReplyModal}
          onClose={() => setShowReplyModal(false)}
          replyId={replyId}
          setShowReplyModal={setShowReplyModal}
        />
      </div>
    </>
  );
};

export default ContactUs;
