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
import { SLIDE_CONTENT_ADVICES } from "../data/adviceConstantsPiano";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function AdvicePage({ isMobile }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const maxSteps = SLIDE_CONTENT_ADVICES.length;

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
          {SLIDE_CONTENT_ADVICES.map((slide, index) => (
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
          onClick={() => navigate("/home")}
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
