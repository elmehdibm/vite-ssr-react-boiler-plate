import { ThemeProvider, Box, Button, Typography } from "@mui/material";
import { landingPageTheme } from "../utils/LandingPageTheme";
import HeroContent from "../contents/HeroContent";
import Logo from "../assets/logo.png";
import FeaturedPage from "../contents/FeaturedContent";
import TipsPage from "../contents/TipsContent";
import { useEffect, useState } from "react";
import { TEXT_CONTENT_LANDING_PAGE } from "../data/landingPageConstants";

export default function LandingPage() {
  const { welcomePhrases } = TEXT_CONTENT_LANDING_PAGE.hero;
  const [index, setIndex] = useState(0);

  // Cycle messages every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % welcomePhrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [welcomePhrases.length]);

  return (
    <ThemeProvider theme={landingPageTheme}>
      <Box
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="OnaiPiano Logo"
          sx={{
            width: { xs: "120px", sm: "160px", md: "220px" },
          }}
        />
        <HeroContent>
          <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
            {welcomePhrases[index]}
          </Typography>
        </HeroContent>
        <Button href="/onboarding" variant="contained">
          Start your Piano Journey
        </Button>
        <FeaturedPage />
        <TipsPage />
      </Box>
    </ThemeProvider>
  );
}
