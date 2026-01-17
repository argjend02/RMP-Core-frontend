import { useState, useEffect } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
  Link,
  Button,
} from "@mui/material";
import account from "../../../_mock/account";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Profile",
    icon: "eva:person-fill",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleGo = () => {
    window.location.href = "http://localhost:3000/dashboard/adminProfile";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "http://localhost:3000/home";
  };

  const [userFullName, setUserFullName] = useState("");
  const email = localStorage.getItem("userId");
  const API_BASE_URL = "http://localhost:44364/api";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/GetUserById/${email}`);
        if (response.ok) {
          const userData = await response.json();
          const fullName = `${userData.name} ${userData.surname}`;
          setUserFullName(fullName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [email]);

  const [userProfilePhoto, setUserProfilePhoto] = useState("");

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/GetUserById/${email}`);
        if (response.ok) {
          const userData = await response.json();
          const profilePhoto = `${userData.profilePhotoPath}`;
          setUserProfilePhoto(profilePhoto);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchProfilePhoto();
  }, [email]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={`http://localhost:44364/${userProfilePhoto}`} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userFullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        {/* <Stack sx={{ p: 1 }}>
            <MenuItem onClick={handleGo}>
              Profile
            </MenuItem>

        </Stack> */}

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
