import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, styled, TextField, Button } from "@mui/material";
import { u as useUser, L as Logo } from "./index-NIjWtxuI.js";
import "vexflow";
import "react-piano";
import "@mui/icons-material/History";
import "@mui/icons-material/Close";
import "@mui/material/styles/index.js";
import "@mui/icons-material";
import "@mui/system";
import "react-chartjs-2";
import "@mui/icons-material/LibraryBooks";
import "@mui/icons-material/Psychology";
import "@mui/icons-material/Whatshot";
import "@mui/icons-material/MusicNote";
import "@mui/icons-material/Instagram";
import "@mui/icons-material/Facebook";
import "chart.js";
import "react-calendly";
const OnboardingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  maxWidth: "800px",
  margin: "0 auto",
  textAlign: "center",
  height: "90vh",
  overflowY: "auto"
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#1a5da6",
      borderWidth: "2px",
      transition: "all 0.3s ease"
    },
    "&:hover fieldset": {
      borderColor: "#1a5da6"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1a5da6"
    }
  },
  "& .MuiInputLabel-root": {
    color: "#1a5da6"
  }
}));
const JourneyButton = styled(Button)(({ theme, selected }) => ({
  width: "240px",
  minHeight: "100px",
  padding: theme.spacing(1.5),
  margin: theme.spacing(1),
  borderRadius: "8px",
  backgroundColor: selected ? "#1a5da6" : "#ffffff",
  color: selected ? "#ffffff" : "#1a5da6",
  border: "2px solid #1a5da6",
  boxShadow: selected ? "0 4px 8px rgba(26, 93, 166, 0.2)" : "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  "&:hover": {
    backgroundColor: selected ? "#1a5da6" : "rgba(26, 93, 166, 0.1)",
    transform: "translateY(-2px)"
  },
  "&:disabled": {
    opacity: 0.5,
    backgroundColor: "#f5f5f5",
    transform: "none"
  }
}));
const journeyLevels = [
  {
    level: "New to piano",
    description: "Starting your musical journey or dreaming of playing your first melody",
    musicTheory: false
    // No prior musical theory knowledge
  },
  {
    level: "Growing artist with theory",
    description: "Comfortable with basics, ready to explore more complex pieces, and has some musical theory knowledge",
    musicTheory: true
    // Has some musical theory knowledge
  },
  {
    level: "Growing artist without theory",
    description: "Comfortable with basics and ready to explore more complex pieces, but no musical theory knowledge",
    musicTheory: false
    // No prior musical theory knowledge
  },
  {
    level: "Experienced player",
    description: "Mastered fundamentals and eager to tackle advanced compositions",
    musicTheory: true
    // Has some musical theory knowledge
  }
];
function OnboardingPage() {
  const { updateProfileName } = useUser();
  const [name, setName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) setName(savedName);
  }, []);
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    updateProfileName(name);
    navigate(level === "New to piano" ? "/advice" : "/tutorial");
  };
  return /* @__PURE__ */ jsxs(OnboardingContainer, { children: [
    /* @__PURE__ */ jsx(
      Box,
      {
        component: "img",
        src: Logo,
        alt: "OnaiPiano Logo",
        sx: {
          width: { xs: "150px", sm: "200px", md: "250px" },
          marginBottom: 4
        }
      }
    ),
    /* @__PURE__ */ jsx(
      StyledTextField,
      {
        label: "What should we call you?",
        variant: "outlined",
        value: name,
        onChange: (e) => setName(e.target.value),
        sx: {
          width: { xs: "90%", sm: "80%" },
          mb: 4
        },
        inputProps: { "aria-label": "Enter your name" }
      }
    ),
    /* @__PURE__ */ jsx(
      Typography,
      {
        variant: "h5",
        sx: {
          mb: 3,
          color: "#1a5da6",
          fontFamily: "Monoton, cursive",
          fontWeight: 500,
          fontSize: { xs: "1.2rem", sm: "2rem" }
        },
        children: "Tell us about your piano journey"
      }
    ),
    /* @__PURE__ */ jsx(
      Stack,
      {
        direction: { xs: "column", md: "row" },
        spacing: 2,
        sx: {
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          mb: 2
        },
        children: journeyLevels.map((journey) => /* @__PURE__ */ jsxs(
          JourneyButton,
          {
            variant: "contained",
            selected: selectedLevel === journey.level,
            onClick: () => handleLevelSelect(journey.level),
            disabled: name.length < 3,
            "aria-label": `Select ${journey.level} level`,
            children: [
              /* @__PURE__ */ jsx(
                Typography,
                {
                  variant: "subtitle1",
                  sx: {
                    fontWeight: 600,
                    textTransform: "none",
                    mb: 1,
                    fontSize: { xs: "1.2rem", sm: "1.4rem" }
                  },
                  children: journey.level
                }
              ),
              /* @__PURE__ */ jsx(
                Typography,
                {
                  variant: "caption",
                  sx: {
                    opacity: 0.9,
                    lineHeight: 1.3,
                    px: 1,
                    textTransform: "none",
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    fontStyle: "italic"
                  },
                  children: journey.description
                }
              )
            ]
          },
          journey.level
        ))
      }
    ),
    name.length < 3 && /* @__PURE__ */ jsx(
      Typography,
      {
        variant: "body2",
        sx: {
          mt: 2,
          color: "#1a5da6",
          opacity: 0.8,
          fontStyle: "italic"
        },
        children: "Share your name to begin your musical journey"
      }
    )
  ] });
}
export {
  OnboardingPage as default
};
