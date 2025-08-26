import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import VendorKYCHeader from "./VendorKYCHeader";
import ListVendorKYC from "./ListVendorKYC";
import { listVendorKYCAPI } from "../../api/vendorKYC";
import useDebounce from "../../hooks/useDebounce";

const VendorKYC = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [vendorKYCData, setVendorKYCData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 400);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listVendorKYC", { pageSize, pageNumber, search: debouncedSearch, sortConfig }],
    queryFn: () => listVendorKYCAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig }),
  });

  useEffect(() => {
    if (isSuccess) {
      setVendorKYCData(data.data.users);
      setTotalCount(data.data.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  return (
    <div className="bg-layout-bg p-2 rounded-lg shadow-md">
      <VendorKYCHeader search={search} setSearch={setSearch} />
      <ListVendorKYC
        data={vendorKYCData}
        search={search}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
      />
    </div>
  );
};

export default VendorKYC;
