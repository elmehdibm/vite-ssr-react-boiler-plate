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
import MainViewSpace from "../contents/MainViewSpace";
import { useUser } from "../utils/UserProvider";
import CloseIcon from "@mui/icons-material/Close";
import InformationPage from "../contents/InformationPage";
import { useNavigate } from "react-router-dom";

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
})(({ theme, isMobile }: { theme: any; isMobile: boolean }) => ({
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
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
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
                  // Navigate to Edit Profile page
                  toggleDrawer(false);
                  navigate("/contact");
                }}
              >
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  // Navigate to Contact page
                  toggleDrawer(false);
                  navigate("/contact");
                }}
              >
                <ListItemText primary="Contact" />
              </ListItemButton>
              <ListItemButton
                onClick={() => {
                  // Navigate to Blog page
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
            {value === 0 && <MainViewSpace setValuePage={setValue} />}
            {value === 1 && (
              <InformationPage content="Connect with fellow piano enthusiasts who share your musical interests and goals." />
            )}
            {value === 2 && (
              <InformationPage content="Through analyzing your style and goals, we create a personalized timeline that evolves with you." />
            )}
            {value === 3 && (
              <InformationPage content="Music is about emotion - we help you connect with every piece you play." />
            )}
          </Container>
        </MainContent>

        <StyledBottomNavigation
          value={value}
          onChange={(_, newValue) => {
            console.log(newValue);
            setValue(newValue);
          }}
          showLabels
          sx={{
            gap: isMobile ? 0 : 12,
            "& .Mui-selected": {
              color: "#1a5da6",
            },
          }}
        >
          <StyledBottomNavigationAction label="Home" icon={<HomeIcon />} />
          <StyledBottomNavigationAction
            label="Community"
            icon={<PeopleIcon />}
          />
          <StyledBottomNavigationAction
            label="Timeline"
            icon={<TimelineIcon />}
          />
          <StyledBottomNavigationAction
            label="Explore"
            icon={<ExploreIcon />}
          />
        </StyledBottomNavigation>
      </Box>
    </ThemeProvider>
  );
};

export default HomeSpace;
