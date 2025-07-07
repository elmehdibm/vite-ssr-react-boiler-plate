import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme, Box, IconButton, Typography, Button, Grid } from "@mui/material";
import { ChevronLeft, ChevronRight, MusicNote, PlayArrow, Favorite, Timeline, CalendarToday, Psychology, Group } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const TUTORIAL_CONTENT = {
  welcome: {
    title: "Welcome to Your Piano Journey",
    subtitle: "Where passion meets personalized learning",
    description: "Begin your unique musical adventure with a learning experience that adapts to you. Whether you're starting fresh or enhancing your skills, we'll help you play the music that moves you.",
    buttonText: "Start Your Journey"
  },
  philosophy: {
    list: [
      {
        title: "Daily Micro-Progress",
        description: "Small, consistent steps lead to remarkable progress. Our daily challenges adapt to your schedule and learning style.",
        points: [
          "Personalized practice schedule",
          "Progress at your own pace",
          "Adaptive challenges",
          "Achievement tracking"
        ]
      },
      {
        title: "Learn Through Play",
        description: "Transform piano learning into your personal journey of discovery with interactive challenges and rewards.",
        points: [
          "Custom learning path",
          "Skill-based challenges",
          "Personal achievement system",
          "Progress visualization"
        ]
      },
      {
        title: "Community & Sharing",
        description: "Connect with fellow piano enthusiasts who share your musical interests and goals.",
        points: [
          "Find like-minded learners",
          "Share your progress",
          "Get personalized feedback",
          "Join style-specific groups"
        ]
      },
      {
        title: "Your Musical Journey",
        description: "Music is more than just notes - it's about expressing yourself and connecting with the pieces you love.",
        points: [
          "Choose your favorite genres",
          "Learn songs you love",
          "Develop your style",
          "Express your creativity"
        ]
      }
    ],
    buttonReadMore: "Read More",
    buttonText: "Begin your first challenge"
  },
  passion: {
    title: "Connect With Your Music",
    description: "Music is about emotion - we help you connect with every piece you play. Your first complete piece is a milestone in your journey, and we'll help you reach it.",
    sections: {
      beginners: {
        title: "For Beginners",
        description: "Start with a piece you love, simplified to match your level. We'll break it down into achievable steps while maintaining its emotional core."
      },
      intermediates: {
        title: "For Intermediates",
        description: "Enhance your current skills with new techniques and expression. Take your favorite pieces to the next level with advanced interpretation methods."
      }
    },
    buttonText: "Start Your Musical Journey"
  },
  learningPaths: {
    title: "Your Learning Path",
    description: "Every journey is unique. Through analyzing your style and goals, we create a personalized timeline that evolves with you. Here are some example paths:",
    paths: {
      casual: {
        title: "Relaxed Learner",
        description: "Perfect for busy schedules, focusing on steady, gradual progress",
        pace: "15-20 minutes daily",
        milestones: ["Basic patterns", "Simple melodies", "Easy popular songs"]
      },
      dedicated: {
        title: "Dedicated Enthusiast",
        description: "For those who want to progress quickly and dive deeper",
        pace: "45-60 minutes daily",
        milestones: ["Advanced techniques", "Complex pieces", "Music theory"]
      },
      creative: {
        title: "Creative Explorer",
        description: "Focus on improvisation and creating your own music",
        pace: "30-45 minutes daily",
        milestones: [
          "Improvisation basics",
          "Composition skills",
          "Style development"
        ]
      }
    },
    footer: {
      note: "This is just an example - your actual path will be customized based on your needs.",
      buttonText: "Discover Your Path"
    }
  },
  finalSteps: {
    title: "Your Personalized Timeline",
    description: "While everyone's path is different, here's an example of how we'll create your journey custom for you:",
    steps: [
      {
        title: "Week 1: Your Foundation",
        objectives: [
          "Discover your musical interests",
          "Set your learning pace",
          "Start with basics that matter to you"
        ],
        duration: "Personalized duration based on your schedule"
      },
      {
        title: "Week 2: Building Your Skills",
        objectives: [
          "Practice techniques relevant to your chosen style",
          "Learn patterns from songs you love",
          "Develop your musical intuition"
        ],
        duration: "Adapted to your progress"
      },
      {
        title: "Week 3: Your Musical Expression",
        objectives: [
          "Play your first chosen piece",
          "Develop your unique style",
          "Connect emotionally with the music"
        ],
        duration: "Flexible based on your goals"
      }
    ],
    buttonText: "Start with Daily Challenges"
  }
};
function TutorialPage({ isMobile }) {
  const theme = useTheme();
  const maxSteps = 8;
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const typographyStyles = {
    welcome: {
      title: {
        fontSize: isMobile ? "1.8rem" : "2.5rem",
        fontWeight: 600,
        fontFamily: "Monoton, cursive"
      },
      subtitle: {
        fontSize: isMobile ? "1rem" : "1.2rem",
        fontFamily: "Monoton, cursive"
      },
      description: { fontSize: isMobile ? "0.9rem" : "1.1rem", mb: 8 }
    },
    philosophy: {
      title: {
        fontSize: isMobile ? "1.8rem" : "2.5rem",
        fontWeight: 600,
        fontFamily: "Monoton, cursive"
      },
      description: {
        fontSize: isMobile ? "0.9rem" : "1.2rem",
        fontStyle: "italic",
        mt: 2
      },
      point: { mt: isMobile ? 4 : 6, fontSize: isMobile ? "1rem" : "1.4rem" }
    },
    passion: {
      title: {
        fontSize: isMobile ? "1.8rem" : "2.5rem",
        fontWeight: 600,
        fontFamily: "Monoton, cursive"
      },
      description: {
        fontSize: isMobile ? "0.9rem" : "1.2rem",
        fontStyle: "italic",
        mt: 2
      },
      sectionTitle: {
        fontSize: isMobile ? "1.4rem" : "1.8rem",
        fontFamily: "Monoton, cursive",
        fontWeight: 500
      },
      sectionDescription: {
        fontSize: isMobile ? "0.9rem" : "1.2rem",
        fontStyle: "italic",
        mt: 2
      }
    },
    learningPaths: {
      title: {
        fontSize: isMobile ? "1.8rem" : "2.5rem",
        fontWeight: 600,
        fontFamily: "Monoton, cursive"
      },
      description: {
        fontSize: isMobile ? "0.9rem" : "1.2rem",
        fontStyle: "italic",
        mt: 2
      },
      pathTitle: {
        fontSize: isMobile ? "1.4rem" : "1.8rem",
        fontFamily: "Monoton, cursive",
        fontWeight: 500
      },
      pathDescription: {
        fontSize: isMobile ? "0.9rem" : "1.2rem",
        fontStyle: "italic",
        mt: 2
      },
      pace: { fontSize: isMobile ? "0.8rem" : "1rem" },
      milestone: { fontSize: isMobile ? "0.8rem" : "1rem" },
      footerNote: { fontSize: isMobile ? "0.9rem" : "1rem" }
    },
    finalSteps: {
      title: {
        fontSize: isMobile ? "1.8rem" : "2.5rem",
        fontWeight: 600,
        fontFamily: "Monoton, cursive"
      },
      description: {
        fontSize: isMobile ? "0.9rem" : "1.2rem",
        fontStyle: "italic",
        mt: 2
      },
      stepTitle: { fontSize: isMobile ? "1.2rem" : "2rem", fontWeight: 600 },
      objective: { fontSize: isMobile ? "0.8rem" : "1.1rem" },
      duration: { fontSize: isMobile ? "0.8rem" : "1rem" }
    },
    nav: {
      counter: { fontSize: isMobile ? "0.9rem" : "1rem" }
    }
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
  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const SlideWrapper = ({ children }) => /* @__PURE__ */ jsx(
    Box,
    {
      sx: {
        height: "100%",
        minHeight: { xs: "85vh", sm: "70vh" },
        width: "100%",
        overflowY: "auto",
        boxSizing: "border-box",
        p: 2,
        textAlign: "center"
      },
      children
    }
  );
  const renderWelcomeSlide = () => /* @__PURE__ */ jsx(SlideWrapper, { children: /* @__PURE__ */ jsxs(Box, { children: [
    /* @__PURE__ */ jsx(
      MusicNote,
      {
        sx: {
          fontSize: isMobile ? 60 : 80,
          color: theme.palette.primary.main
        }
      }
    ),
    /* @__PURE__ */ jsx(Typography, { sx: typographyStyles.welcome.title, children: TUTORIAL_CONTENT.welcome.title }),
    /* @__PURE__ */ jsx(Typography, { sx: typographyStyles.welcome.subtitle, children: TUTORIAL_CONTENT.welcome.subtitle }),
    /* @__PURE__ */ jsx(
      Typography,
      {
        sx: {
          ...typographyStyles.welcome.description,
          mx: "auto",
          maxWidth: "600px",
          mt: 2
        },
        children: TUTORIAL_CONTENT.welcome.description
      }
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "contained",
        onClick: handleNext,
        sx: { mt: 2 },
        endIcon: /* @__PURE__ */ jsx(PlayArrow, {}),
        children: TUTORIAL_CONTENT.welcome.buttonText
      }
    )
  ] }) });
  const renderPhilosophySlide = (content, index) => {
    const icons = [CalendarToday, Psychology, Group, MusicNote];
    const IconComponent = icons[index] || MusicNote;
    return /* @__PURE__ */ jsxs(SlideWrapper, { children: [
      /* @__PURE__ */ jsxs(Box, { children: [
        /* @__PURE__ */ jsx(
          IconComponent,
          {
            sx: {
              fontSize: isMobile ? 40 : 50,
              color: theme.palette.primary.main
            }
          }
        ),
        /* @__PURE__ */ jsx(Typography, { sx: typographyStyles.philosophy.title, children: content.title }),
        /* @__PURE__ */ jsx(
          Typography,
          {
            sx: {
              ...typographyStyles.philosophy.description,
              mx: "auto",
              maxWidth: "800px",
              mt: 1
            },
            children: content.description
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Grid, { container: true, spacing: 1, sx: { mt: 2 }, children: content.points.map((point, idx) => /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sm: 6, children: /* @__PURE__ */ jsx(
        Box,
        {
          sx: {
            p: 1,
            bgcolor: theme.palette.grey[100],
            textAlign: "center"
          },
          children: /* @__PURE__ */ jsx(Typography, { sx: typographyStyles.philosophy.point, children: point })
        }
      ) }, idx)) })
    ] });
  };
  const renderPassionSlide = () => /* @__PURE__ */ jsxs(SlideWrapper, { children: [
    /* @__PURE__ */ jsxs(Box, { sx: { mb: 2 }, children: [
      /* @__PURE__ */ jsx(
        Favorite,
        {
          sx: {
            fontSize: isMobile ? 60 : 80,
            color: theme.palette.primary.main
          }
        }
      ),
      /* @__PURE__ */ jsx(Typography, { sx: typographyStyles.passion.title, children: TUTORIAL_CONTENT.passion.title }),
      /* @__PURE__ */ jsx(Typography, { sx: { ...typographyStyles.passion.description, mt: 1 }, children: TUTORIAL_CONTENT.passion.description })
    ] }),
    /* @__PURE__ */ jsx(Grid, { container: true, spacing: 1, children: Object.keys(TUTORIAL_CONTENT.passion.sections).map(
      (key, index) => /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sm: 6, children: /* @__PURE__ */ jsxs(
        Box,
        {
          sx: {
            p: 1,
            bgcolor: theme.palette.grey[100],
            textAlign: "center"
          },
          children: [
            /* @__PURE__ */ jsx(Typography, { sx: typographyStyles.passion.sectionTitle, children: TUTORIAL_CONTENT.passion.sections[key].title }),
            /* @__PURE__ */ jsx(
              Typography,
              {
                sx: { ...typographyStyles.passion.sectionDescription, mt: 1 },
                children: TUTORIAL_CONTENT.passion.sections[key].description
              }
            )
          ]
        }
      ) }, index)
    ) })
  ] });
  const renderPersonalizedPathSlide = () => /* @__PURE__ */ jsxs(SlideWrapper, { children: [
    /* @__PURE__ */ jsxs(Box, { sx: { mb: 2 }, children: [
      /* @__PURE__ */ jsx(Typography, { sx: typographyStyles.learningPaths.title, children: TUTORIAL_CONTENT.learningPaths.title }),
      /* @__PURE__ */ jsx(
        Typography,
        {
          sx: { ...typographyStyles.learningPaths.description, mt: 1 },
          children: TUTORIAL_CONTENT.learningPaths.description
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Grid, { container: true, spacing: 1, children: Object.keys(TUTORIAL_CONTENT.learningPaths.paths).map((key, index) => {
      const path = TUTORIAL_CONTENT.learningPaths.paths[key];
      return /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sm: 4, children: /* @__PURE__ */ jsxs(
        Box,
        {
          sx: {
            p: 1,
            bgcolor: theme.palette.grey[100],
            textAlign: "center"
          },
          children: [
            /* @__PURE__ */ jsx(Typography, { sx: typographyStyles.learningPaths.pathTitle, children: path.title }),
            /* @__PURE__ */ jsx(
              Typography,
              {
                sx: {
                  ...typographyStyles.learningPaths.pathDescription,
                  mt: 1
                },
                children: path.description
              }
            ),
            /* @__PURE__ */ jsx(
              Typography,
              {
                sx: {
                  ...typographyStyles.learningPaths.pace,
                  mt: 1,
                  display: "block"
                },
                children: path.pace
              }
            ),
            /* @__PURE__ */ jsx(Box, { sx: { mt: 1 }, children: path.milestones.map((milestone, idx) => /* @__PURE__ */ jsxs(
              Typography,
              {
                sx: typographyStyles.learningPaths.milestone,
                children: [
                  "- ",
                  milestone
                ]
              },
              idx
            )) })
          ]
        }
      ) }, index);
    }) })
  ] });
  const renderFinalStepsSlide = () => /* @__PURE__ */ jsxs(SlideWrapper, { children: [
    /* @__PURE__ */ jsxs(Box, { sx: { mb: 2 }, children: [
      /* @__PURE__ */ jsx(Typography, { sx: typographyStyles.finalSteps.title, children: TUTORIAL_CONTENT.finalSteps.title }),
      /* @__PURE__ */ jsx(Typography, { sx: { ...typographyStyles.finalSteps.description, mt: 1 }, children: TUTORIAL_CONTENT.finalSteps.description })
    ] }),
    TUTORIAL_CONTENT.finalSteps.steps.map((step, index) => /* @__PURE__ */ jsxs(Box, { sx: { mb: 2, textAlign: "center" }, children: [
      /* @__PURE__ */ jsx(Typography, { sx: typographyStyles.finalSteps.stepTitle, children: step.title }),
      step.objectives.map((objective, idx) => /* @__PURE__ */ jsxs(
        Box,
        {
          sx: { display: "flex", justifyContent: "center", mt: 0.5 },
          children: [
            /* @__PURE__ */ jsx(Timeline, { sx: { fontSize: 16, mr: 0.5 } }),
            /* @__PURE__ */ jsx(Typography, { sx: typographyStyles.finalSteps.objective, children: objective })
          ]
        },
        idx
      )),
      /* @__PURE__ */ jsx(
        Typography,
        {
          sx: {
            ...typographyStyles.finalSteps.duration,
            mt: 1,
            display: "block"
          },
          children: step.duration
        }
      )
    ] }, index)),
    /* @__PURE__ */ jsx(Button, { variant: "contained", onClick: handleNext, sx: { mt: 2 }, children: TUTORIAL_CONTENT.finalSteps.buttonText }),
    /* @__PURE__ */ jsx(Typography, { sx: { ...typographyStyles.learningPaths.footerNote, mt: 2 }, children: TUTORIAL_CONTENT.learningPaths.footer.note })
  ] });
  return /* @__PURE__ */ jsxs(
    Box,
    {
      sx: {
        width: isMobile ? "100%" : "800px",
        maxWidth: "800px",
        mx: "auto",
        minHeight: { xs: "85vh", sm: "70vh" },
        bgcolor: isMobile ? "transparent" : "#f5f5f5",
        p: 0,
        display: "flex",
        flexDirection: "column"
      },
      children: [
        /* @__PURE__ */ jsxs(
          SwipeableViews,
          {
            index: activeStep,
            onChangeIndex: handleStepChange,
            style: { flex: 1 },
            children: [
              renderWelcomeSlide(),
              TUTORIAL_CONTENT.philosophy.list.map((content, index) => /* @__PURE__ */ jsx("div", { children: renderPhilosophySlide(content, index) }, index)),
              renderPassionSlide(),
              renderPersonalizedPathSlide(),
              renderFinalStepsSlide()
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Box,
          {
            sx: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2
            },
            children: [
              /* @__PURE__ */ jsx(IconButton, { onClick: handleBack, disabled: activeStep === 0, children: /* @__PURE__ */ jsx(ChevronLeft, {}) }),
              /* @__PURE__ */ jsxs(Typography, { sx: typographyStyles.nav.counter, children: [
                activeStep + 1,
                "/",
                maxSteps
              ] }),
              /* @__PURE__ */ jsx(IconButton, { onClick: handleNext, disabled: activeStep === maxSteps - 1, children: /* @__PURE__ */ jsx(ChevronRight, {}) })
            ]
          }
        )
      ]
    }
  );
}
export {
  TutorialPage as default
};
