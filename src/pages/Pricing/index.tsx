import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PricingHeader from "./PricingHeader";
import ListPricing from "./ListPricing";
import { listPricingAPI } from "../../api/pricing";

const Pricing = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [pricingData, setPricingData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [isLoading, setIsLoading] = useState(true);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listPricing", { pageSize, pageNumber, sortConfig }],
    queryFn: () => listPricingAPI({ pageSize, pageNumber, sortConfig }),
  });

  useEffect(() => {
    if (isSuccess) {
      setPricingData(data.data.priceList);
      setTotalCount(data.data.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  return (
    <div className="bg-layout-bg p-2 rounded-lg shadow-md">
      <PricingHeader />
      <ListPricing
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={pricingData}
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

export default Pricing;
