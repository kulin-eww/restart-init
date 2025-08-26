import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import DeleteVendor from "./DeleteVendor";
import ListVendor from "./ListVendor";
import VendorHeader from "./VendorHeader";
import { listVendorAPI } from "../../api/vendor";
import useDebounce from "../../hooks/useDebounce";

const Vendors = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [vendorData, setVendorData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteVendorId, setDeleteVendorId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 400);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listVendors", { pageSize, pageNumber, search: debouncedSearch, sortConfig }],
    queryFn: () => {
      setIsLoading(true);
      return listVendorAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setVendorData(data.data.vendors);
      setTotalCount(data.data.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleDeleteVendor = (id: string) => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteVendorId(id);
  };

  return (
    <div className="bg-layout-bg p-2 rounded-lg shadow-md">
      <VendorHeader search={search} setSearch={setSearch} />
      <ListVendor
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={vendorData}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        setPageSize={setPageSize}
        handleDeleteVendor={handleDeleteVendor}
      />
      <DeleteVendor
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteVendorId={deleteVendorId}
      />
    </div>
  );
};

export default Vendors;
