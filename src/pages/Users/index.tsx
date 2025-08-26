import UserHeader from "./UserHeader";
import ListUser from "./ListUser";
import DeleteUser from "./DeleteUser";
import { useQuery } from "@tanstack/react-query";
import { listUsersAPI } from "../../api/user";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const Users = () => {
  const [search, setSearch] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [userData, setUserData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "", sortOrder: "asc" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearch = useDebounce(search, 400);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["listUsers", { pageSize, pageNumber, search: debouncedSearch, sortConfig }],
    queryFn: () => {
      setIsLoading(true);
      return listUsersAPI({ pageSize, pageNumber, search: debouncedSearch, sortConfig });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setUserData(data.data.users);
      setTotalCount(data.data.total_count);
      setIsLoading(false);
    } else if (isError) {
      setIsLoading(false);
    }
  }, [isSuccess, data, isError]);

  const handleDeleteUser = (id: string) => {
    setShowDeleteModal(!showDeleteModal);
    setDeleteUserId(id);
  };

  return (
    <div className="bg-layout-bg p-2 rounded-lg shadow-md">
      <UserHeader search={search} setSearch={setSearch} />
      <ListUser
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={userData}
        totalCount={totalCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        handleDeleteUser={handleDeleteUser}
      />
      <DeleteUser
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteUserId={deleteUserId}
      />
    </div>
  );
};

export default Users;
