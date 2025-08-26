import bgImage from "../../assets/images/auth/auth-layout-bg.png";
import { Outlet, useNavigate } from "react-router-dom";
import RestartLogo from "../../assets/icons/common/restart-logo.svg";
import { useEffect } from "react";

const AuthLayout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token && token !== undefined && token !== null && token !== "undefined" && token !== "null") {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex">
      <div
        className="hidden w-[60%] lg:w-[65%] md:flex h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="flex flex-col w-full md:w-[40%] lg:w-[35%] h-screen px-20 md:p-14 justify-center">
        <div className="flex justify-start mb-6">
          <img src={RestartLogo} style={{ height: 80, marginBottom: 11 }} />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
