import React, { useState } from "react";
import {
  Button,
  Card,
  Typography,
  Box,
  Stack,
  MobileStepper,
} from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface SlideContent {
  title: string;
  why: string;
  how: string;
  image: string;
  quickTip: string;
}

const SLIDE_CONTENT: SlideContent[] = [ 
  {
    title: "Finding Your Perfect Sitting Position",
    why: "Good posture prevents fatigue and injury, helping you play longer and better.",
    how: "Sit at the middle of the piano, forearms parallel to the floor. Your elbows should be level with the white keys, and you should be able to move your arms freely.",
    image: "🪑",
    quickTip:
      "Try this: If you can draw a straight line from your ear to your shoulder to your hip, you've got it right!",
  },
  {
    title: "The Natural Hand Shape",
    why: "Proper hand position gives you better control and helps prevent strain.",
    how: "Imagine holding a small orange - that's your natural hand shape! Keep your fingers gently curved, wrists level, and thumbs pointing toward the keys.",
    image: "✋",
    quickTip:
      "Rest your hands on your knees - that natural curve is exactly what you want on the keys.",
  },
  {
    title: "Making Friends with Middle C",
    why: "Middle C is your anchor point on the piano - it helps you find all other notes.",
    how: "Find the group of two black keys in the center. Middle C is the white key just to the left. Place your right thumb there to start.",
    image: "🎹",
    quickTip:
      "Mark middle C with a small sticker until you can find it naturally.",
  },
  {
    title: "The Five-Finger Position",
    why: "This position is the foundation for playing your first melodies.",
    how: "Starting with your thumb on C, place each finger on consecutive white keys (C-D-E-F-G). Keep fingers curved and relaxed.",
    image: "🖐️",
    quickTip:
      "Practice tapping each finger while keeping the others gently touching the keys.",
  },
  {
    title: "Your First Practice Routine",
    why: "Consistent practice, even if brief, leads to faster progress than long, irregular sessions.",
    how: "Start with 15-20 minutes daily. Spend 5 minutes on posture and hand position, 10 minutes practicing notes, and 5 minutes just exploring the keyboard.",
    image: "⏰",
    quickTip:
      "Set a daily reminder - same time, same place builds a strong habit.",
  },
  {
    title: "Listening to Your Playing",
    why: "Developing your ear helps you catch mistakes and play more musically.",
    how: "Press each key slowly and listen to its sound. Try to make all notes equally loud, then experiment with playing softer and louder.",
    image: "👂",
    quickTip:
      "Record yourself playing - you'll hear things you didn't notice while playing.",
  },
];

function AdvicePage({ isMobile }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const maxSteps = SLIDE_CONTENT.length;

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSteps);
  };

  const handleBack = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSteps) % maxSteps);
  };

  const handleStepChange = (step: number) => {
    setCurrentSlide(step);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          minHeight: { xs: "85vh", sm: "70vh" },
          display: "flex",
          flexDirection: "column",
          p: { xs: "5%", sm: "4%", md: "3%" },
          boxShadow: isMobile ? "none" : "0px 4px 8px rgba(0, 0, 0, 0.1)",
          bgcolor: isMobile ? "transparent" : "white",
          borderRadius: "16px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <AutoPlaySwipeableViews
          axis="x"
          index={currentSlide}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval={6000}
          style={{ flex: 1 }}
        >
          {SLIDE_CONTENT.map((slide, index) => (
            <Box key={index} sx={{ height: "100%", overflowY: "hidden" }}>
              <Box
                sx={{
                  fontSize: { xs: 40, sm: 48 },
                  mb: { xs: 2, sm: 3 },
                  textAlign: "center",
                }}
              >
                {slide.image}
              </Box>

              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  color: "#1a5da6",
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: "1.4rem", sm: "1.6rem" },
                }}
              >
                {slide.title}
              </Typography>

              <Stack spacing={2} sx={{ mb: 3 }}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#1a5da6",
                      fontWeight: 500,
                      mb: 0.5,
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    }}
                  >
                    Why it matters
                  </Typography>
                  <Typography variant="body2">{slide.why}</Typography>
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#1a5da6",
                      fontWeight: 500,
                      mb: 0.5,
                      fontSize: { xs: "1.2rem", sm: "1.5rem" },
                    }}
                  >
                    How to do it
                  </Typography>
                  <Typography variant="body2">{slide.how}</Typography>
                </Box>

                <Box
                  sx={{
                    bgcolor: "rgba(26, 93, 166, 0.1)",
                    p: 2,
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: "italic",
                      color: "#1a5da6",
                      fontSize: { xs: "1rem", sm: "1.2rem" },
                    }}
                  >
                    Quick Tip: {slide.quickTip}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </AutoPlaySwipeableViews>

        <Box sx={{ width: "100%", mb: 2 }}>
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={currentSlide}
            sx={{
              maxWidth: "100%",
              flexGrow: 1,
              bgcolor: "transparent",
              "& .MuiMobileStepper-dot": {
                bgcolor: "rgba(26, 93, 166, 0.3)",
              },
              "& .MuiMobileStepper-dotActive": {
                bgcolor: "#1a5da6",
              },
            }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                sx={{ color: "#1a5da6" }}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                sx={{ color: "#1a5da6" }}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Typography variant="body2" sx={{ color: "#666" }}>
            {currentSlide + 1}/{maxSteps}
          </Typography>
        </Box>

        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate("/tutorial")}
          sx={{
            mt: 2,
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          Let's get started
        </Button>
      </Box>
    </Box>
  );
}

export default AdvicePage;
