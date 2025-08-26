import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAnchorElId } from "../../redux/slices/uiSlice";
import useAppSelector from "../../hooks/useAppSelector";
import { ArrowLeftStartOnRectangleIcon, UserIcon } from "@heroicons/react/24/solid";
import useToast from "../../hooks/useToast";
import { logoutAPI } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { anchorElId } = useAppSelector((state) => state.ui);

  const handleClose = () => {
    dispatch(setAnchorElId(null));
  };

  const { mutate } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: (res) => {
      useToast(res.message);
      navigate("/login");
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  return (
    <>
      <Menu
        anchorEl={document.getElementById("account-menu")}
        id="account-menu"
        open={anchorElId == "account-menu"}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
          }}
        >
          <ListItemIcon>
            <UserIcon className="h-6 cursor-pointer" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            mutate();
          }}
        >
          <ListItemIcon>
            <ArrowLeftStartOnRectangleIcon className="h-6 cursor-pointer" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
