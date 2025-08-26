import { ListItemIcon, Menu, MenuItem, Avatar, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAnchorElId } from "../../redux/slices/uiSlice";
import useAppSelector from "../../hooks/useAppSelector";
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
              filter: "drop-shadow(0px 8px 32px rgba(0,0,0,0.12))",
              mt: 2,
              minWidth: 220,
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              "& .MuiMenuItem-root": {
                borderRadius: "12px",
                margin: "4px 8px",
                padding: "12px 16px",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(39, 120, 105, 0.08)",
                  transform: "translateX(4px)",
                },
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: -8,
                right: 20,
                width: 16,
                height: 16,
                bgcolor: "rgba(255, 255, 255, 0.95)",
                transform: "rotate(45deg)",
                zIndex: 0,
                borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* Profile Header */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg, #277869 0%, #20c997 100%)",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              U
            </Avatar>
            <div>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#2f2b3de6" }}>
                User Account
              </Typography>
              <Typography variant="caption" sx={{ color: "#2f2b3d8c" }}>
                Manage your profile
              </Typography>
            </div>
          </div>
        </div>

        <MenuItem
          onClick={() => {
            navigate("/profile");
          }}
          sx={{
            "& .MuiListItemIcon-root": {
              minWidth: 40,
              color: "#277869",
            },
          }}
        >
          <ListItemIcon>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </ListItemIcon>
          <Typography sx={{ fontWeight: 500, color: "#2f2b3de6" }}>Profile</Typography>
        </MenuItem>

        <Divider sx={{ my: 1, mx: 2 }} />

        <MenuItem
          onClick={() => {
            mutate();
          }}
          sx={{
            "& .MuiListItemIcon-root": {
              minWidth: 40,
              color: "#ea5455",
            },
            "&:hover": {
              backgroundColor: "rgba(234, 84, 85, 0.08)",
            },
          }}
        >
          <ListItemIcon>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </ListItemIcon>
          <Typography sx={{ fontWeight: 500, color: "#2f2b3de6" }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
