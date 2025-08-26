import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import BreadcrumbsNav from "../../components/navigation/BreadcrumbsNav";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setIsUserDetailsFetched, setUserDetails } from "../../redux/slices/userSlice";
import { getAdminDetailsAPI } from "../../api/admin";
import useAppSelector from "../../hooks/useAppSelector";

const Main = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUserDetailsFetched = useAppSelector((state) => state.user.isUserDetailsFetched);

  const { data, isSuccess, isError, isFetched, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAdminDetailsAPI,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserDetails(data?.data));
      dispatch(setIsUserDetailsFetched(isFetched));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (!token || token === undefined || token === null || token === "undefined" || token === "null") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <main>
        <Header />
        <section className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className={`sidebar-scroll mt-18 bg-layout-bg w-full text-text-primary overflow-auto`}>
            <div className="bg-bg-secondary w-full h-full sidebar-scroll md:rounded-t-xl overflow-auto">
              {/* {isLoading && <Loader />} */}
              {/* {isUserDetailsFetched && ( */}
              <div className="w-full p-6  rounded-2xl">
                {/* <BreadcrumbsNav /> */}
                <Outlet />
              </div>
              {/* )} */}
              {/* {isError && <ErrorFallback />} */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Main;
