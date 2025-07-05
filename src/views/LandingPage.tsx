import { ThemeProvider, Box, Button } from "@mui/material";
import { landingPageTheme } from "../utils/LandingPageTheme";
import Hero from "../contents/Hero";
import Logo from "../assets/logo.png";
import FeaturedPage from "./FeaturedPage";
import TipsPage from "./TipsPage";

export default function LandingPage() {
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
        <Hero />
        <Button href="/onboarding" variant="contained">
          Start your Piano Journey
        </Button>
        <FeaturedPage />
        <TipsPage />
      </Box>
    </ThemeProvider>
  );
}
