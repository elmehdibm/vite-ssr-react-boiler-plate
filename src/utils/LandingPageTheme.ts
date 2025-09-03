import { createTheme } from "@mui/material";

export const landingPageTheme = createTheme({
  palette: {
    primary: {
      main: "#1a5da6",
      light: "rgba(74, 144, 226, 0.1)",
      dark: "#3A72B4",
    },
    secondary: { main: "#1a5da6" },
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
        containedPrimary: {
          backgroundColor: "#1a5da6",
          "&:hover": {
            backgroundColor: "#6b5dd3", // ← bluish-violet
          },
        },
        outlinedPrimary: {
          borderColor: "#1a5da6",
          color: "#1a5da6",
          "&:hover": {
            backgroundColor: "rgba(107, 93, 211, 0.1)", // soft violet hover
            borderColor: "#6b5dd3",
            color: "#6b5dd3",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: "none",
          fontWeight: 600,
          padding: "12px 28px",
          "&:hover": {
            backgroundColor: "#6b5dd3", // ← bluish-violet
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(107, 93, 211, 0.1)",
          boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 24px rgba(107, 93, 211, 0.2)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(107, 93, 211, 0.08)",
          boxShadow: "none",
          backgroundColor: "#fff",
        },
      },
    },
    MuiContainer: {
      styleOverrides: { root: { paddingTop: "2rem", paddingBottom: "2rem" } },
    },
  },
});
