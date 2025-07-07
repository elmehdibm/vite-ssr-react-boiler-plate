import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  MusicNote,
  CalendarToday,
  Group,
  Psychology,
  ChevronLeft,
  ChevronRight,
  PlayArrow,
  Timeline,
  Favorite,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { TUTORIAL_CONTENT } from "../data/tutorialConstantsPiano";

function TutorialPage({ isMobile }: { isMobile: boolean }) {
  const theme = useTheme();
  const maxSteps = 8;
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  // Responsive typography styles organized in one constant.
  const typographyStyles = {
    welcome: {
      title: {
        fontSize: isMobile ? "1.8rem" : "2.5rem",
        fontWeight: 600,
        fontFamily: "Monoton, cursive",
      },
      subtitle: {
        fontSize: isMobile ? "1rem" : "1.2rem",
        fontFamily: "Monoton, cursive",
      },
      description: { fontSize: isMobile ? "0.9rem" : "1.1rem", mb: 8 },
    },
    philosophy: {
      title: {
        fontSize: isMobile ? "1.8rem" : "2.5rem",
        fontWeight: 600,
        fontFamily: "Monoton, cursive",
      },
      description: {
        fontSize: isMobile ? "0.9rem" : "1.2rem",
        fontStyle: "italic",
        mt: 2,
      },
      point: { mt: isMobile ? 4 : 6, fontSize: isMobile ? "1rem" : "1.4rem" },
    },
    passion: {
      title: {
        fontSize: isMobile ? "1.8rem" : "2.5rem",
        fontWeight: 600,
        fontFamily: "Monoton, cursive",
      },
      description: {
        fontSize: isMobile ? "0.9rem" : "1.2rem",
        fontStyle: "italic",
        mt: 2,
      },
      sectionTitle: {
        fontSize: isMobile ? "1.4rem" : "1.8rem",
        fontFamily: "Monoton, cursive",
        fontWeight: 500,
      },
      sectionDescription: {
        fontSize: isMobile ? "0.9rem" : "1.2rem",
        fontStyle: "italic",
        mt: 2,
      },
    },
    learningPaths: {
      title: {
        fontSize: isMobile ? "1.8rem" : "2.5rem",
        fontWeight: 600,
        fontFamily: "Monoton, cursive",
      },
      description: {
        fontSize: isMobile ? "0.9rem" : "1.2rem",
        fontStyle: "italic",
        mt: 2,
      },
      pathTitle: {
        fontSize: isMobile ? "1.4rem" : "1.8rem",
        fontFamily: "Monoton, cursive",
        fontWeight: 500,
      },
      pathDescription: {
        fontSize: isMobile ? "0.9rem" : "1.2rem",
        fontStyle: "italic",
        mt: 2,
      },
      pace: { fontSize: isMobile ? "0.8rem" : "1rem" },
      milestone: { fontSize: isMobile ? "0.8rem" : "1rem" },
      footerNote: { fontSize: isMobile ? "0.9rem" : "1rem" },
    },
    finalSteps: {
      title: {
        fontSize: isMobile ? "1.8rem" : "2.5rem",
        fontWeight: 600,
        fontFamily: "Monoton, cursive",
      },
      description: {
        fontSize: isMobile ? "0.9rem" : "1.2rem",
        fontStyle: "italic",
        mt: 2,
      },
      stepTitle: { fontSize: isMobile ? "1.2rem" : "2rem", fontWeight: 600 },
      objective: { fontSize: isMobile ? "0.8rem" : "1.1rem" },
      duration: { fontSize: isMobile ? "0.8rem" : "1rem" },
    },
    nav: {
      counter: { fontSize: isMobile ? "0.9rem" : "1rem" },
    },
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, maxSteps - 1));
    if (activeStep === maxSteps - 1) {
      navigate("/home");
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  // A simple slide wrapper
  const SlideWrapper = ({ children }: { children: React.ReactNode }) => (
    <Box
      sx={{
        height: "100%",
        minHeight: { xs: "85vh", sm: "70vh" },
        width: "100%",
        overflowY: "auto",
        boxSizing: "border-box",
        p: 2,
        textAlign: "center",
      }}
    >
      {children}
    </Box>
  );

  // Welcome slide
  const renderWelcomeSlide = () => (
    <SlideWrapper>
      <Box>
        <MusicNote
          sx={{
            fontSize: isMobile ? 60 : 80,
            color: theme.palette.primary.main,
          }}
        />
        <Typography sx={typographyStyles.welcome.title}>
          {TUTORIAL_CONTENT.welcome.title}
        </Typography>
        <Typography sx={typographyStyles.welcome.subtitle}>
          {TUTORIAL_CONTENT.welcome.subtitle}
        </Typography>
        <Typography
          sx={{
            ...typographyStyles.welcome.description,
            mx: "auto",
            maxWidth: "600px",
            mt: 2,
          }}
        >
          {TUTORIAL_CONTENT.welcome.description}
        </Typography>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ mt: 2 }}
          endIcon={<PlayArrow />}
        >
          {TUTORIAL_CONTENT.welcome.buttonText}
        </Button>
      </Box>
    </SlideWrapper>
  );

  // Philosophy slide
  const renderPhilosophySlide = (content: any, index: number) => {
    const icons = [CalendarToday, Psychology, Group, MusicNote];
    const IconComponent = icons[index] || MusicNote;
    return (
      <SlideWrapper>
        <Box>
          <IconComponent
            sx={{
              fontSize: isMobile ? 40 : 50,
              color: theme.palette.primary.main,
            }}
          />
          <Typography sx={typographyStyles.philosophy.title}>
            {content.title}
          </Typography>
          <Typography
            sx={{
              ...typographyStyles.philosophy.description,
              mx: "auto",
              maxWidth: "800px",
              mt: 1,
            }}
          >
            {content.description}
          </Typography>
        </Box>
        <Grid container spacing={1} sx={{ mt: 2 }}>
          {content.points.map((point: string, idx: number) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Box
                sx={{
                  p: 1,
                  bgcolor: theme.palette.grey[100],
                  textAlign: "center",
                }}
              >
                <Typography sx={typographyStyles.philosophy.point}>
                  {point}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        {/* <Button
          variant="contained"
          onClick={handleNext}
          sx={{ mt: 2 }}
          endIcon={<PlayArrow />}
        >
          {TUTORIAL_CONTENT.philosophy.buttonText}
        </Button> */}
      </SlideWrapper>
    );
  };

  // Passion slide
  const renderPassionSlide = () => (
    <SlideWrapper>
      <Box sx={{ mb: 2 }}>
        <Favorite
          sx={{
            fontSize: isMobile ? 60 : 80,
            color: theme.palette.primary.main,
          }}
        />
        <Typography sx={typographyStyles.passion.title}>
          {TUTORIAL_CONTENT.passion.title}
        </Typography>
        <Typography sx={{ ...typographyStyles.passion.description, mt: 1 }}>
          {TUTORIAL_CONTENT.passion.description}
        </Typography>
      </Box>
      <Grid container spacing={1}>
        {Object.keys(TUTORIAL_CONTENT.passion.sections).map(
          (key: string, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  p: 1,
                  bgcolor: theme.palette.grey[100],
                  textAlign: "center",
                }}
              >
                <Typography sx={typographyStyles.passion.sectionTitle}>
                  {TUTORIAL_CONTENT.passion.sections[key].title}
                </Typography>
                <Typography
                  sx={{ ...typographyStyles.passion.sectionDescription, mt: 1 }}
                >
                  {TUTORIAL_CONTENT.passion.sections[key].description}
                </Typography>
              </Box>
            </Grid>
          )
        )}
      </Grid>
      {/* <Button
        variant="contained"
        onClick={handleNext}
        sx={{ mt: 2, alignSelf: "center" }}
        endIcon={<PlayArrow />}
      >
        {TUTORIAL_CONTENT.passion.buttonText}
      </Button> */}
    </SlideWrapper>
  );

  // Personalized Path slide
  const renderPersonalizedPathSlide = () => (
    <SlideWrapper>
      <Box sx={{ mb: 2 }}>
        <Typography sx={typographyStyles.learningPaths.title}>
          {TUTORIAL_CONTENT.learningPaths.title}
        </Typography>
        <Typography
          sx={{ ...typographyStyles.learningPaths.description, mt: 1 }}
        >
          {TUTORIAL_CONTENT.learningPaths.description}
        </Typography>
      </Box>
      <Grid container spacing={1}>
        {Object.keys(TUTORIAL_CONTENT.learningPaths.paths).map((key, index) => {
          const path = TUTORIAL_CONTENT.learningPaths.paths[key];
          return (
            <Grid item xs={12} sm={4} key={index}>
              <Box
                sx={{
                  p: 1,
                  bgcolor: theme.palette.grey[100],
                  textAlign: "center",
                }}
              >
                <Typography sx={typographyStyles.learningPaths.pathTitle}>
                  {path.title}
                </Typography>
                <Typography
                  sx={{
                    ...typographyStyles.learningPaths.pathDescription,
                    mt: 1,
                  }}
                >
                  {path.description}
                </Typography>
                <Typography
                  sx={{
                    ...typographyStyles.learningPaths.pace,
                    mt: 1,
                    display: "block",
                  }}
                >
                  {path.pace}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {path.milestones.map((milestone: string, idx: number) => (
                    <Typography
                      key={idx}
                      sx={typographyStyles.learningPaths.milestone}
                    >
                      - {milestone}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      {/* <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
        {TUTORIAL_CONTENT.learningPaths.footer.buttonText}
      </Button> */}
    </SlideWrapper>
  );

  // Final Steps slide
  const renderFinalStepsSlide = () => (
    <SlideWrapper>
      <Box sx={{ mb: 2 }}>
        <Typography sx={typographyStyles.finalSteps.title}>
          {TUTORIAL_CONTENT.finalSteps.title}
        </Typography>
        <Typography sx={{ ...typographyStyles.finalSteps.description, mt: 1 }}>
          {TUTORIAL_CONTENT.finalSteps.description}
        </Typography>
      </Box>
      {TUTORIAL_CONTENT.finalSteps.steps.map((step, index) => (
        <Box key={index} sx={{ mb: 2, textAlign: "center" }}>
          <Typography sx={typographyStyles.finalSteps.stepTitle}>
            {step.title}
          </Typography>
          {step.objectives.map((objective, idx) => (
            <Box
              key={idx}
              sx={{ display: "flex", justifyContent: "center", mt: 0.5 }}
            >
              <Timeline sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography sx={typographyStyles.finalSteps.objective}>
                {objective}
              </Typography>
            </Box>
          ))}
          <Typography
            sx={{
              ...typographyStyles.finalSteps.duration,
              mt: 1,
              display: "block",
            }}
          >
            {step.duration}
          </Typography>
        </Box>
      ))}
      <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
        {TUTORIAL_CONTENT.finalSteps.buttonText}
      </Button>
      <Typography sx={{ ...typographyStyles.learningPaths.footerNote, mt: 2 }}>
        {TUTORIAL_CONTENT.learningPaths.footer.note}
      </Typography>
    </SlideWrapper>
  );

  return (
    <Box
      sx={{
        width: isMobile ? "100%" : "800px",
        maxWidth: "800px",
        mx: "auto",
        minHeight: { xs: "85vh", sm: "70vh" },
        bgcolor: isMobile ? "transparent" : "#f5f5f5",
        p: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        style={{ flex: 1 }}
      >
        {renderWelcomeSlide()}
        {TUTORIAL_CONTENT.philosophy.list.map((content, index) => (
          <div key={index}>{renderPhilosophySlide(content, index)}</div>
        ))}
        {renderPassionSlide()}
        {renderPersonalizedPathSlide()}
        {renderFinalStepsSlide()}
      </SwipeableViews>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <IconButton onClick={handleBack} disabled={activeStep === 0}>
          <ChevronLeft />
        </IconButton>
        <Typography sx={typographyStyles.nav.counter}>
          {activeStep + 1}/{maxSteps}
        </Typography>
        <IconButton onClick={handleNext} disabled={activeStep === maxSteps - 1}>
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
}

export default TutorialPage;
