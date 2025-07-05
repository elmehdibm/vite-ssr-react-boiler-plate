import { createTheme } from "@mui/material";

export const landingPageTheme = createTheme({
  palette: {
    primary: {
      main: "#1a5da6",
      light: "rgba(74, 144, 226, 0.1)",
      dark: "#3A72B4",
    },
    secondary: { main: "#1a5da6" },
    accent: { main: "#FF6B6B" },
    background: { default: "#f5f7fa", paper: "#ffffff" },
    text: { primary: "#1a5da6" },
  },
  shape: { borderRadius: 12 },
  spacing: 8,
  typography: {
    fontFamily: "'Poppins','Roboto','Arial',sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (max-width:600px)": { fontSize: "2rem" },
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
      "@media (max-width:600px)": { fontSize: "1.8rem" },
    },
    // ... other variants
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: "none",
          fontWeight: 600,
          padding: "12px 28px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: { root: { paddingTop: "2rem", paddingBottom: "2rem" } },
    },
  },
});
