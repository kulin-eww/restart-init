import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import TicketSubjectHeader from "./TicketSubjectHeader";
import ListTicketSubject from "./ListTicketSubject";
import { listTicketSubjectAPI } from "../../api/ticketSubject";
import DeleteTicketSubject from "./DeleteTicketSubject";

const TicketSubject = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [ticketSubjectData, setTicketSubjectData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTicketSubjectId, setDeleteTicketSubjectId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listTicketSubject", { pageSize, pageNumber, sortConfig }],
    queryFn: () => listTicketSubjectAPI({ pageSize, pageNumber, sortConfig }),
  });

  useEffect(() => {
    if (isSuccess) {
      setTicketSubjectData(data.data.subjects);
      setTotalCount(data.data.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleDeleteTicketSubject = (id: string) => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteTicketSubjectId(id);
  };

  return (
    <div className="bg-layout-bg p-2 rounded-lg shadow-md">
      <TicketSubjectHeader />
      <ListTicketSubject
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={ticketSubjectData}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        handleDeleteTicketSubject={handleDeleteTicketSubject}
      />
      <DeleteTicketSubject
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteTicketSubjectId={deleteTicketSubjectId}
      />
    </div>
  );
};

export default TicketSubject;
