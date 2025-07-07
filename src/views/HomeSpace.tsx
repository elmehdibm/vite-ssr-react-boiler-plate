import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Container,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Timeline as TimelineIcon,
  Explore as ExploreIcon,
} from "@mui/icons-material";
import Logo from "../assets/logo.png";
import { useUser } from "../utils/UserProvider";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1a5da6",
      light: "rgba(26, 93, 166, 0.1)",
      dark: "#164c87",
    },
    secondary: {
      main: "#2196F3",
    },
    background: {
      default: "linear-gradient(45deg, #c9d6ff, #e2e2e2)",
      paper: "#ffffff",
    },
    text: {
      primary: "#333333",
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 4,
});

// Filter out isMobile from being passed to DOM by using shouldForwardProp.
const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile",
})(({ isMobile }: { isMobile: boolean }) => ({
  flexGrow: 1,
  overflowY: "auto",
  overflowX: "hidden",
  paddingBottom: isMobile ? theme.spacing(16) : theme.spacing(5),
  paddingTop: theme.spacing(5),
  height: isMobile ? "calc(100vh - 160px)" : "calc(100vh - 320px)",
  WebkitOverflowScrolling: "touch",
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
  zIndex: 1100,
  [theme.breakpoints.up("md")]: {
    position: "static",
    boxShadow: "none",
    margin: "12px 12px",
    backgroundColor: "transparent",
  },
}));

const StyledBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme }) => ({
    padding: "10px 0",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      padding: "10px 20px",
      fontSize: "1rem",
      backgroundColor: theme.palette.background.paper,
      borderRadius: 20,
      "& .MuiBottomNavigationAction-label": {
        transition: "none",
        fontSize: "1rem",
        marginLeft: theme.spacing(2),
      },
      "& .MuiSvgIcon-root": {
        marginBottom: 0,
      },
    },
  })
);

const HomeSpace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => setDrawerOpen(open);

  // For avatar, show first two letters of user's name.
  const avatarText =
    user.name && user.name.length >= 2
      ? `${user.name.charAt(0).toUpperCase()}${user.name
          .charAt(1)
          .toLowerCase()}`
      : "GU";

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.default",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={1}
          sx={{ zIndex: 1200 }}
        >
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexGrow: 1,
              }}
            >
              <Box
                component="img"
                src={Logo}
                alt="OnaiPiano Logo"
                sx={{
                  mt: 1,
                  width: { xs: "120px", sm: "160px", md: "220px" },
                  mb: 2,
                }}
              />
            </Box>
            <IconButton onClick={() => toggleDrawer(true)}>
              <Avatar
                sx={{
                  bgcolor: "#1a5da6",
                  width: 40,
                  height: 40,
                  color: "white",
                }}
              >
                {avatarText}
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => toggleDrawer(false)}
        >
          <Box sx={{ width: isMobile ? 250 : 300, p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h6">{user.name}</Typography>
              </Box>
              <IconButton onClick={() => toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItemButton
                onClick={() => {
                  toggleDrawer(false);
                  navigate("/edit-profile");
                }}
              >
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  toggleDrawer(false);
                  navigate("/contact");
                }}
              >
                <ListItemText primary="Contact" />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  toggleDrawer(false);
                  navigate("/blog");
                }}
              >
                <ListItemText primary="Blog" />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>

        <MainContent isMobile={isMobile}>
          <Container>
            <Outlet />
          </Container>
        </MainContent>

        <StyledBottomNavigation
          showLabels
          sx={{
            gap: isMobile ? 0 : 12,
            "& .Mui-selected": {
              color: "#1a5da6",
            },
          }}
        >
          <StyledBottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            sx={{
              backgroundColor:
                location.pathname === "/home"
                  ? theme.palette.primary.light
                  : "transparent",
            }}
            onClick={() => navigate("/home")}
          />
          <StyledBottomNavigationAction
            label="Community"
            icon={<PeopleIcon />}
            sx={{
              backgroundColor:
                location.pathname === "/home/community"
                  ? theme.palette.primary.light
                  : "transparent",
            }}
            onClick={() => navigate("/home/community")}
          />
          <StyledBottomNavigationAction
            label="Timeline"
            icon={<TimelineIcon />}
            sx={{
              backgroundColor:
                location.pathname === "/home/timeline"
                  ? theme.palette.primary.light
                  : "transparent",
            }}
            onClick={() => navigate("/home/timeline")}
          />
          <StyledBottomNavigationAction
            label="Explore"
            icon={<ExploreIcon />}
            sx={{
              backgroundColor:
                location.pathname === "/home/explore"
                  ? theme.palette.primary.light
                  : "transparent",
            }}
            onClick={() => navigate("/home/explore")}
          />
        </StyledBottomNavigation>
      </Box>
    </ThemeProvider>
  );
};

export default HomeSpace;
