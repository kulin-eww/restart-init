import RestartLogo from "../../assets/icons/common/restart-logo.svg?react";
import ProfileMenu from "./ProfileMenu";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { setAnchorElId } from "../../redux/slices/uiSlice";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import {} from "../../components/common/Switch";
import { useNavigate } from "react-router-dom";

export const HEADER_HEIGHT = 18;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { anchorElId } = useAppSelector((state) => state.ui);

  // Set anchor id in Redux only
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorElId) {
      dispatch(setAnchorElId(null));
      return;
    }
    if (event.currentTarget.id) {
      dispatch(setAnchorElId(event.currentTarget.id));
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between  bg-layout-bg items-center h-${HEADER_HEIGHT}`}
    >
      <div className="flex justify-between items-center p-5 gap-2">
        <div className="block md:hidden z-51" onClick={handleClick} id="mobile-sidebar">
          <Bars3Icon className="h-6 cursor-pointer" />
        </div>
        <div>
          <RestartLogo
            className="h-8 cursor-pointer w-24"
            onClick={() => {
              navigate("/dashboard");
            }}
          />
        </div>
      </div>
      <div className="flex gap-4 justify-between items-center p-5">
        <div id="account-menu" onClick={handleClick}>
          <UserCircleIcon className="h-[24px] cursor-pointer text-text-primary" />
        </div>
      </div>
      <ProfileMenu />
    </div>
  );
};

export default Header;
