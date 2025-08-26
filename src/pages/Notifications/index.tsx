import React, { useCallback, useEffect, useState } from 'react'
import NotificationHeader from './NotificationHeader'
import ListNotifications from './ListNotifications'
import { useQuery } from '@tanstack/react-query';
import { listFAQAPI } from '../../api/faq';
import { debounce } from '@mui/material';
import { notificationListAPI } from '../../api/notifications';
import ViewNotification from './ViewNotification';

const Notifications = () => {
  const [search, setSearch] = useState<string>("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [notificationData, setNotificationData] = useState([]);
    const [viewNotificationModal, setViewNotificationModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
     const { data, isSuccess, error, isError, isFetching, refetch } = useQuery({
      queryKey: ["listNotification"],
      queryFn: ()=> notificationListAPI({search, pageNumber, pageSize}),
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
        setNotificationData(data?.data?.notificationList);
        setTotalCount(data?.data?.total_count)
        setPageNumber(data?.data?.current_page)
        setPageSize(data?.data?.per_page)
        setIsLoading(false);
      } else if (isError) {
        setIsLoading(false);
      }
    }, [isSuccess, data, isError]);
  
    // const viewNotification = (id: string) => {
    //   setShowDeleteModal(!showDeleteModal);
    //   setDeleteFaqId(id);
    // };

  return (
    <>
      <div className="bg-layout-bg p-2 rounded-lg shadow-md">
        <NotificationHeader search={search} setSearch={setSearch} />
        <ListNotifications
          data={notificationData}
          search={search}
          totalCount={totalCount}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
          isSuccess={isSuccess}
          isError={isError}
          isLoading={isLoading}
        />
        {/* <ViewNotification /> */}
      </div>
    </>
  )
}

export default Notifications
