import React, { useState } from 'react'
import EarningHistoryHeader from './EarningHistoryHeader'
import ListEarningHistory from './ListEarningHistory'
import { useQuery } from '@tanstack/react-query';
import { listFAQAPI } from '../../api/faq';

const EarningHistory = () => {
    const [search, setSearch] = useState<string>("");
      const [pageNumber, setPageNumber] = useState(1);
      const [pageSize, setPageSize] = useState(10);
      const [totalCount, setTotalCount] = useState(0);
      const [earningData, setEarningData] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
    
      const { data, isSuccess, error, isError, isFetching, refetch } = useQuery({
        queryKey: ["listFAQ", search, pageNumber, pageSize],
        queryFn: ()=> listFAQAPI({search, pageNumber, pageSize}),
        enabled: true
      });
        
    //   useEffect(() => {
    //     if (isSuccess) {
    //       setUserData(data.data.users);
    //       setTotalCount(data.data.total_count); setIsLoading(false);
    // } else if (isError) {
    //   setIsLoading(false);
    // }
    //   }, [isSuccess, data, isError]);
    
  return (
    <>
        <div className="bg-layout-bg p-2 rounded-lg shadow-md">
            <EarningHistoryHeader search={search} setSearch={setSearch} />
            <ListEarningHistory
                data={earningData}
                search={search}
                totalCount={totalCount}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                pageSize={pageSize}
                setPageSize={setPageSize}
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
            />
        </div>
    </>
  )
}

export default EarningHistory
