import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../assets/img/nav_logo.png";
import GridViewIcon from "@mui/icons-material/GridView";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import HomeIcon from "@mui/icons-material/Home";
import ProductsIcon from "@mui/icons-material/ShoppingCart";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const drawerWidth = 240;

const Dashboard = ({ children }) => {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const navLink = [
    {
      title: "Home",
      link: "/",
      icon: <HomeIcon />,
    },
    {
      title: "Category",
      link: "/category",
      icon: <GridViewIcon />,
    },
    {
      title: "Products",
      link: "/products",
      icon: <ProductsIcon />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <img
              src={logo}
              alt={"logo"}
              style={{ objectFit: "contain", height: "50px", width: "150px" }}
            />
          </Box>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <AccountCircleOutlinedIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {navLink.map((item, index) => (
              <ListItem
                secondaryAction={<PlayArrowIcon sx={{ color: "gray" }} />}
                key={index}
                disablePadding
              >
                <ListItemButton onClick={() => navigate(item.link)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
      <LogoutConfirmationDialog
        open={logoutDialogOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </Box>
  );
};

const LogoutConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Box
          sx={{
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <WarningOutlinedIcon color="error" /> Log Out
        </Box>
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to log out?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          sx={{ borderRadius: "50px" }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ borderRadius: "50px" }}
          onClick={onConfirm}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Dashboard;
