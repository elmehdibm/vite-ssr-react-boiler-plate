import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PianoNotesChallenge from "../views/PianoNotesChallenge";
import { createTheme, ThemeProvider } from "@mui/material";
import HomeSpace from "../views/HomeSpace";
import { UserProvider } from "../utils/UserProvider";
import InformationPage from "../contents/InformationPage";
import SongLearningPage from "../views/SongLearningPage";
import LandingPage from "../views/LandingPage";
import FeaturedPage from "../contents/FeaturedContent";
import TipsPage from "../contents/TipsContent";
import MainViewSpace from "../contents/MainViewSpace";
import DiscoverChallenges from "../views/DiscoverChallenges";
import CommunityPage from "../views/CommunityPage";

const Home = lazy(() => import("../views/archive/Home"));
const TrainPiano = lazy(() => import("../views/TrainPiano"));
const OnboardingPage = lazy(() => import("../views/OnBoarding"));
const AdvicePage = lazy(() => import("../views/AdvicePage"));
const TutorialPage = lazy(() => import("../views/TutorialPage"));

// **★ Material UI Theme Customization**
const theme = createTheme({
  palette: {
    primary: { main: "#1a5da6" },
    secondary: { main: "#FF4081" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h1: { fontWeight: 700 },
  },
});

export const Router = ({ isMobile }: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/home" element={<HomeSpace />}>
              <Route path="" element={<MainViewSpace />} />
              <Route
                path="community"
                element={
                  <CommunityPage />
                }
              />
              <Route
                path="timeline"
                element={
                  <InformationPage content="Through analyzing your style and goals, we create a personalized timeline that evolves with you." />
                }
              />
              <Route path="explore" element={<DiscoverChallenges />} />
            </Route>
            <Route
              path="/advice"
              element={<AdvicePage isMobile={isMobile} />}
            />
            <Route
              path="/tutorial"
              element={<TutorialPage isMobile={isMobile} />}
            />
            <Route path="/trainpiano" element={<TrainPiano />} />
            <Route path="/contact" element={<InformationPage />} />
            <Route path="/dailychallenge" element={<PianoNotesChallenge />} />
            <Route path="/learnsong" element={<SongLearningPage />} />
            <Route path="/featured" element={<FeaturedPage />} />
            <Route path="/tips" element={<TipsPage />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </Suspense>
  );
};
