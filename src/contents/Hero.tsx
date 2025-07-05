import { useEffect, useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import OnaiMascot from "../assets/onai_mascot.png";
import { TEXT_CONTENT_LANDING_PAGE } from "../data/landingPageConstants";

export default function Hero() {
  const { welcomePhrases } = TEXT_CONTENT_LANDING_PAGE.hero;
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Cycle messages every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % welcomePhrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [welcomePhrases.length]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        mx: "2.5rem",
        animation: "slideIn 0.5s ease-out",
        justifyContent: "center",
        flexWrap: isMobile ? "wrap" : "nowrap",
      }}
    >
      <Box
        component="img"
        src={OnaiMascot}
        alt="Onai Mascot"
        sx={{ height: "140px", position: "relative" }}
      />
      <Box
        sx={{
          background: "#fff",
          color: theme.palette.text.primary,
          p: "1.5rem",
          borderRadius: "20px",
          position: "relative",
          maxWidth: "350px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          "&::before": {
            content: "''",
            position: "absolute",
            left: "-12px",
            top: "50%",
            transform: "translateY(-50%)",
            borderTop: "12px solid transparent",
            borderBottom: "12px solid transparent",
            borderRight: "12px solid #fff",
          },
        }}
      >
        <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
          {welcomePhrases[index]}
        </Typography>
      </Box>
    </Box>
  );
}
