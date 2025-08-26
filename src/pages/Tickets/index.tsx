import { useQuery } from "@tanstack/react-query";
import { listUsersAPI } from "../../api/user";
import { useEffect, useState } from "react";
import TicketHeader from "./TicketHeader";
import ListTicket from "./ListTicket";
import { listTicketAPI } from "../../api/ticket";
import useDebounce from "../../hooks/useDebounce";

const Tickets = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [ticketData, setTicketData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const debouncedSearch = useDebounce(search, 400);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listTickets", { pageSize, pageNumber, search: debouncedSearch, sortConfig }],
    queryFn: () => listTicketAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig }),
  });

  useEffect(() => {
    if (isSuccess) {
      setTicketData(data.data.tickets);
      setTotalCount(data.data.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  return (
    <div className="bg-layout-bg p-2 rounded-lg shadow-md">
      <TicketHeader search={search} setSearch={setSearch} />
      <ListTicket
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={ticketData}
        search={search}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />
    </div>
  );
};

export default Tickets;
