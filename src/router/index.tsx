import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PianoNotesChallenge from "../views/PianoNotesChallenge";
import { createTheme, ThemeProvider } from "@mui/material";
import HomeSpace from "../views/HomeSpace";
import { UserProvider } from "../utils/UserProvider";
import InformationPage from "../contents/InformationPage";
import LearnSongPage from "../views/SongLearningPage";
import SongLearningPage from "../views/SongLearningPage";

const Home = lazy(() => import("../views/Home"));
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
  if (isMobile) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ThemeProvider theme={theme}>
          <UserProvider>
            <Routes>
              {/* <Route path="/" element={<Home />} />
          <Route
            path="/trainpiano"
            element={
              <div>Not Supported Now - Please check the app in Desktop</div>
            }
          />
          <Route path="/dailychallenge" element={<PianoNotesChallenge />} /> */}
              <Route path="/" element={<OnboardingPage />} />
              <Route path="/home" element={<HomeSpace />} />
              <Route path="/advice" element={<AdvicePage isMobile />} />
              <Route path="/tutorial" element={<TutorialPage isMobile />} />
              <Route path="/contact" element={<InformationPage />} />
              <Route path="/dailychallenge" element={<PianoNotesChallenge />} />
              <Route path="/learnsong" element={<SongLearningPage />} />
            </Routes>
          </UserProvider>
        </ThemeProvider>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Routes>
            {/* <Route path="/" element={<Home />} />
        <Route path="/trainpiano" element={<TrainPiano />} />
        <Route path="/dailychallenge" element={<PianoNotesChallenge />} /> */}
            <Route path="/" element={<OnboardingPage />} />
            <Route path="/home" element={<HomeSpace />} />
            <Route path="/advice" element={<AdvicePage isMobile={false} />} />
            <Route
              path="/tutorial"
              element={<TutorialPage isMobile={false} />}
            />
            <Route path="/trainpiano" element={<TrainPiano />} />
            <Route path="/contact" element={<InformationPage />} />
            <Route path="/dailychallenge" element={<PianoNotesChallenge />} />
            <Route path="/learnsong" element={<SongLearningPage />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </Suspense>
  );
};
