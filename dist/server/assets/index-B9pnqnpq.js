import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { createContext, useState, useEffect, useContext, useRef, lazy, Suspense } from "react";
import { useNavigate, useLocation, Outlet, Routes, Route } from "react-router-dom";
import { Vex, Stave, StaveNote, Accidental } from "vexflow";
import { Piano, MidiNumbers } from "react-piano";
import { useTheme, useMediaQuery, Box, Typography, Switch, IconButton, Button, Drawer, Divider, List, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, BottomNavigation, BottomNavigationAction, AppBar, Toolbar, Avatar, Container, Link, FormControlLabel, TextField, Card, CardContent, LinearProgress, Grid, Checkbox, createTheme as createTheme$1, ThemeProvider as ThemeProvider$1, FormControl, InputLabel, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails, CardHeader, Stack, Chip } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles/index.js";
import { Home, People, Timeline, Explore } from "@mui/icons-material";
import { InlineWidget } from "react-calendly";
import { styled as styled$1 } from "@mui/system";
import { Doughnut } from "react-chartjs-2";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PsychologyIcon from "@mui/icons-material/Psychology";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Chart, ArcElement, Tooltip } from "chart.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import FeedbackIcon from "@mui/icons-material/Feedback";
import DiscoverIcon from "@mui/icons-material/Explore";
const getTodayDate = () => (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
const getYesterdayDate = () => {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};
const defaultUser = {
  name: "Guest",
  challenges: [],
  streak: 0,
  lastChallengeDate: null,
  challengeHistory: [],
  timeSpent: 0,
  currentLevel: 1,
  notation: "anglo",
  exerciseHistory: [],
  // Initialize with an example current song (e.g., Solas of Jamie Duffy)
  currentSong: {
    title: "Solas of Jamie Duffy",
    description: "Practice and master the technique of Solas as described by Jamie Duffy.",
    timeSpent: 0,
    totalTime: 3,
    // Default total song duration is 3 minutes
    trainingSessions: 0
  }
};
const defaultChallengeLevels = [
  {
    level: 1,
    title: "Treble Clef Revision",
    description: "Revise the notes in the treble clef.",
    progress: 0,
    enabled: true
  },
  {
    level: 2,
    title: "Bass Clef Revision",
    description: "Revise the notes in the bass clef.",
    progress: 0,
    enabled: true
  },
  {
    level: 3,
    title: "Coming Soon",
    description: "Stay tuned for future challenges!",
    progress: 0,
    enabled: false
  }
];
const UserContext = createContext(void 0);
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user-onaipiano");
    return saved ? JSON.parse(saved) : defaultUser;
  });
  const [challengeLevels, setChallengeLevels] = useState(
    defaultChallengeLevels
  );
  useEffect(() => {
    localStorage.setItem("user-onaipiano", JSON.stringify(user));
  }, [user]);
  const updateProfileName = (newName) => {
    setUser((prev) => ({ ...prev, name: newName }));
  };
  const addChallenge = (challenge) => {
    const today = getTodayDate();
    setUser((prev) => {
      const alreadyDone = (prev.challengeHistory || []).includes(today);
      let newStreak = prev.streak;
      let newHistory = [...prev.challengeHistory];
      if (!alreadyDone) {
        newStreak = prev.lastChallengeDate === getYesterdayDate() ? prev.streak + 1 : 1;
        newHistory.push(today);
      }
      return {
        ...prev,
        challenges: [...prev.challenges, { ...challenge, date: today }],
        streak: newStreak,
        lastChallengeDate: today,
        challengeHistory: newHistory
      };
    });
  };
  const updateTimeSpent = (minutes) => {
    const today = getTodayDate();
    setUser((prev) => {
      if (prev.lastChallengeDate !== today) {
        return { ...prev, timeSpent: minutes, lastChallengeDate: today };
      } else {
        return { ...prev, timeSpent: prev.timeSpent + minutes };
      }
    });
  };
  const updateCurrentLevel = (level) => {
    setUser((prev) => ({ ...prev, currentLevel: level }));
  };
  const toggleNotation = () => {
    setUser((prev) => ({
      ...prev,
      notation: prev.notation === "anglo" ? "solfege" : "anglo"
    }));
  };
  const recordExerciseSession = (score, rounds) => {
    const newSession = {
      date: getTodayDate(),
      score,
      level: user.currentLevel,
      rounds
    };
    setUser((prev) => ({
      ...prev,
      exerciseHistory: [...prev.exerciseHistory, newSession]
    }));
  };
  const updateSongTraining = (minutes, newSession = false) => {
    setUser((prev) => ({
      ...prev,
      currentSong: prev.currentSong ? {
        ...prev.currentSong,
        timeSpent: prev.currentSong.timeSpent + minutes,
        trainingSessions: newSession ? prev.currentSong.trainingSessions + 1 : prev.currentSong.trainingSessions
      } : prev.currentSong
    }));
  };
  const dailyGoal = 30;
  const dailyProgress = Math.min(user.timeSpent / dailyGoal * 100, 100);
  const chartData = {
    datasets: [
      {
        data: [dailyProgress, 100 - dailyProgress],
        backgroundColor: ["#1a5da6", "#f0f0f0"],
        borderWidth: 0
      }
    ]
  };
  const chartOptions = {
    cutout: "80%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };
  return /* @__PURE__ */ jsx(
    UserContext.Provider,
    {
      value: {
        user,
        updateProfileName,
        addChallenge,
        updateTimeSpent,
        updateCurrentLevel,
        toggleNotation,
        recordExerciseSession,
        updateSongTraining,
        dailyProgress,
        chartData,
        chartOptions,
        challengeLevels,
        updateChallengeProgress: (level, progress) => setChallengeLevels(
          (prev) => prev.map((l) => l.level === level ? { ...l, progress } : l)
        )
      },
      children
    }
  );
};
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
const getNoteLabel = (note, notation) => {
  if (notation === "anglo") return note.toUpperCase();
  const mapping = {
    c: "Do",
    d: "Re",
    e: "Mi",
    f: "Fa",
    g: "Sol",
    a: "La",
    b: "Ti"
  };
  return mapping[note] || note;
};
const PianoMasteryChallenge = () => {
  var _a, _b;
  const {
    user,
    updateCurrentLevel,
    toggleNotation,
    recordExerciseSession,
    challengeLevels
  } = useUser();
  const [currentSequence, setCurrentSequence] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roundCount, setRoundCount] = useState(0);
  const [sessionScore, setSessionScore] = useState(0);
  const [exerciseStarted, setExerciseStarted] = useState(false);
  const [congratsOpen, setCongratsOpen] = useState(false);
  const [clef, setClef] = useState("treble");
  useEffect(() => {
    if (user.currentLevel === 1) {
      setClef("treble");
    } else if (user.currentLevel === 2) {
      setClef("bass");
    }
  }, [user.currentLevel]);
  const staffRef = useRef(null);
  const rendererRef = useRef(null);
  useEffect(() => {
    if (staffRef.current && !rendererRef.current) {
      const { Renderer } = Vex.Flow;
      rendererRef.current = new Renderer(
        staffRef.current,
        Renderer.Backends.SVG
      );
      rendererRef.current.resize(600, 150);
    }
    redrawStaff(currentSequence);
  }, [currentSequence, clef]);
  const redrawStaff = (sequence) => {
    if (!rendererRef.current) return;
    const context = rendererRef.current.getContext();
    context.clear();
    const stave = new Stave(10, 30, 550);
    stave.addClef(clef).setContext(context).draw();
    if (sequence.length) {
      const notes = sequence.map((note) => {
        const octave = clef === "treble" ? 4 : 2;
        const staveNote = new StaveNote({
          keys: [`${note}/${octave}`],
          duration: "q",
          clef
        });
        if (note.includes("#")) {
          staveNote.addModifier(new Accidental("#"));
        }
        return staveNote;
      });
      try {
        Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
      } catch (error) {
        console.error("VexFlow error:", error);
      }
    }
  };
  const generateSequence = () => {
    const available = ["c", "d", "e", "f", "g", "a", "b"];
    const seq = [available[Math.floor(Math.random() * available.length)]];
    setCurrentSequence(seq);
    setCurrentIndex(0);
  };
  const handleKeyPress = (midiNumber) => {
    if (!exerciseStarted) return;
    const attributes = MidiNumbers.getAttributes(midiNumber);
    const pressed = attributes.note.replace(/[0-9]/g, "").toLowerCase();
    const target = currentSequence[currentIndex];
    if (pressed === target) {
      setSessionScore((prev) => prev + 10);
      setRoundCount((prev) => prev + 1);
      if (roundCount + 1 >= 20) {
        recordExerciseSession(sessionScore + 10, 20);
        setCongratsOpen(true);
        setExerciseStarted(false);
      } else {
        setTimeout(() => generateSequence(), 1e3);
      }
    } else {
      setSessionScore((prev) => Math.max(0, prev - 2));
    }
  };
  const startExercise = () => {
    setExerciseStarted(true);
    setSessionScore(0);
    setRoundCount(0);
    generateSequence();
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => setDrawerOpen(open);
  const handleLevelSelect = (level) => {
    updateCurrentLevel(level);
    toggleDrawer(false);
    if (exerciseStarted) generateSequence();
  };
  const renderNoteLabel = ({ midiNumber }) => {
    const attributes = MidiNumbers.getAttributes(midiNumber);
    const baseLabel = attributes.note.replace(/[0-9]/g, "").toLowerCase();
    const label = getNoteLabel(baseLabel, user.notation);
    return /* @__PURE__ */ jsx(
      Box,
      {
        sx: {
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "0.85em",
          fontWeight: "bold",
          color: "#333"
        },
        children: label
      }
    );
  };
  const theme2 = useTheme();
  const isMobile = useMediaQuery(theme2.breakpoints.down("sm"));
  return /* @__PURE__ */ jsxs(Box, { sx: { maxWidth: 900, mx: "auto", p: 2 }, children: [
    /* @__PURE__ */ jsxs(
      Box,
      {
        sx: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2
        },
        children: [
          /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", alignItems: "center" }, children: [
            /* @__PURE__ */ jsx(Typography, { variant: "h6", sx: { color: "#1a5da6", mr: 1 }, children: user.notation === "anglo" ? "Anglo-Saxon" : "Solfege" }),
            /* @__PURE__ */ jsx(
              Switch,
              {
                checked: user.notation === "solfege",
                onChange: toggleNotation,
                color: "default"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              onClick: () => toggleDrawer(true),
              sx: { color: "#1a5da6" },
              children: /* @__PURE__ */ jsx(HistoryIcon, {})
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(Box, { sx: { textAlign: "center", mb: 2 }, children: [
      /* @__PURE__ */ jsxs(Typography, { variant: "h4", sx: { fontWeight: "bold", color: "#1a5da6" }, children: [
        "Level ",
        user.currentLevel,
        ":",
        " ",
        (_a = challengeLevels.find((l) => l.level === user.currentLevel)) == null ? void 0 : _a.title
      ] }),
      /* @__PURE__ */ jsxs(Typography, { variant: "h5", sx: { mt: 1, color: "#1a5da6" }, children: [
        "Score: ",
        sessionScore
      ] })
    ] }),
    /* @__PURE__ */ jsx(Box, { sx: { mb: 2, textAlign: "center" }, children: /* @__PURE__ */ jsx(
      Box,
      {
        ref: staffRef,
        sx: {
          backgroundColor: "#fff",
          p: 2,
          borderRadius: 2,
          boxShadow: 1
        }
      }
    ) }),
    /* @__PURE__ */ jsx(
      Box,
      {
        sx: {
          display: "flex",
          justifyContent: "center",
          mb: 2,
          backgroundColor: "#f5f5f5",
          p: 2,
          borderRadius: 2
        },
        children: /* @__PURE__ */ jsx(Box, { sx: { width: "100%", maxWidth: 600, height: 150 }, children: /* @__PURE__ */ jsx(
          Piano,
          {
            noteRange: {
              first: MidiNumbers.fromNote(clef === "treble" ? "c4" : "c2"),
              last: MidiNumbers.fromNote(clef === "treble" ? "b4" : "b2")
            },
            activeNotes: currentSequence.length > 0 && currentIndex < currentSequence.length ? [
              MidiNumbers.fromNote(
                `${currentSequence[currentIndex]}${clef === "treble" ? "4" : "2"}`
              )
            ] : [],
            playNote: () => {
            },
            stopNote: () => {
            },
            onPlayNoteInput: handleKeyPress,
            keyboardShortcuts: [],
            renderNoteLabel
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(Box, { sx: { textAlign: "center", mt: 2 }, children: !exerciseStarted ? /* @__PURE__ */ jsx(
      Button,
      {
        variant: "contained",
        color: "primary",
        onClick: startExercise,
        disabled: !((_b = challengeLevels.find((l) => l.level === user.currentLevel)) == null ? void 0 : _b.enabled),
        sx: { px: 4, py: 1 },
        children: "Start Exercise"
      }
    ) : /* @__PURE__ */ jsxs(Typography, { variant: "subtitle1", children: [
      "Round ",
      roundCount + 1,
      " - Note ",
      currentIndex + 1,
      " of",
      " ",
      currentSequence.length
    ] }) }),
    /* @__PURE__ */ jsx(
      Drawer,
      {
        anchor: "left",
        open: drawerOpen,
        onClose: () => toggleDrawer(false),
        children: /* @__PURE__ */ jsxs(Box, { sx: { width: isMobile ? 250 : 300, p: 2 }, children: [
          /* @__PURE__ */ jsxs(
            Box,
            {
              sx: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1
              },
              children: [
                /* @__PURE__ */ jsx(Typography, { variant: "h6", children: "Select Level" }),
                /* @__PURE__ */ jsx(IconButton, { onClick: () => toggleDrawer(false), children: /* @__PURE__ */ jsx(CloseIcon, {}) })
              ]
            }
          ),
          /* @__PURE__ */ jsx(Divider, { sx: { my: 1 } }),
          /* @__PURE__ */ jsx(List, { children: challengeLevels.map((lvl) => /* @__PURE__ */ jsx(
            ListItemButton,
            {
              onClick: () => handleLevelSelect(lvl.level),
              disabled: !lvl.enabled,
              children: /* @__PURE__ */ jsx(
                ListItemText,
                {
                  primary: `${lvl.title} (Level ${lvl.level})`,
                  secondary: lvl.description
                }
              )
            },
            lvl.level
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(Dialog, { open: congratsOpen, onClose: () => setCongratsOpen(false), children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Congratulations!" }),
      /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs(Typography, { children: [
        "You have completed the exercise session with a total score of",
        " ",
        sessionScore,
        "!"
      ] }) }),
      /* @__PURE__ */ jsx(DialogActions, { children: /* @__PURE__ */ jsx(Button, { onClick: () => setCongratsOpen(false), color: "primary", children: "Close" }) })
    ] })
  ] });
};
const Logo = "/assets/logo-B0Vii69F.png";
const theme$1 = createTheme({
  palette: {
    primary: {
      main: "#1a5da6",
      light: "rgba(26, 93, 166, 0.1)",
      dark: "#164c87"
    },
    secondary: {
      main: "#2196F3"
    },
    background: {
      default: "linear-gradient(45deg, #c9d6ff, #e2e2e2)",
      paper: "#ffffff"
    },
    text: {
      primary: "#333333"
    }
  },
  shape: {
    borderRadius: 12
  },
  spacing: 4
});
const MainContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile"
})(({ isMobile }) => ({
  flexGrow: 1,
  overflowY: "auto",
  overflowX: "hidden",
  paddingBottom: isMobile ? theme$1.spacing(16) : theme$1.spacing(5),
  paddingTop: theme$1.spacing(5),
  height: isMobile ? "calc(100vh - 160px)" : "calc(100vh - 320px)",
  WebkitOverflowScrolling: "touch"
}));
const StyledBottomNavigation = styled(BottomNavigation)(({ theme: theme2 }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: theme2.palette.background.paper,
  boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
  zIndex: 1100,
  [theme2.breakpoints.up("md")]: {
    position: "static",
    boxShadow: "none",
    margin: "12px 12px",
    backgroundColor: "transparent"
  }
}));
const StyledBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme: theme2 }) => ({
    padding: "10px 0",
    "&:hover": {
      backgroundColor: theme2.palette.primary.light
    },
    [theme2.breakpoints.up("md")]: {
      flexDirection: "row",
      padding: "10px 20px",
      fontSize: "1rem",
      backgroundColor: theme2.palette.background.paper,
      borderRadius: 20,
      "& .MuiBottomNavigationAction-label": {
        transition: "none",
        fontSize: "1rem",
        marginLeft: theme2.spacing(2)
      },
      "& .MuiSvgIcon-root": {
        marginBottom: 0
      }
    }
  })
);
const HomeSpace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const isMobile = useMediaQuery(theme$1.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open) => setDrawerOpen(open);
  const avatarText = user.name && user.name.length >= 2 ? `${user.name.charAt(0).toUpperCase()}${user.name.charAt(1).toLowerCase()}` : "GU";
  return /* @__PURE__ */ jsx(ThemeProvider, { theme: theme$1, children: /* @__PURE__ */ jsxs(
    Box,
    {
      sx: {
        bgcolor: "background.default",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      },
      children: [
        /* @__PURE__ */ jsx(
          AppBar,
          {
            position: "static",
            color: "default",
            elevation: 1,
            sx: { zIndex: 1200 },
            children: /* @__PURE__ */ jsxs(Toolbar, { children: [
              /* @__PURE__ */ jsx(
                Box,
                {
                  sx: {
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    flexGrow: 1
                  },
                  children: /* @__PURE__ */ jsx(
                    Box,
                    {
                      component: "img",
                      src: Logo,
                      alt: "OnaiPiano Logo",
                      sx: {
                        mt: 1,
                        width: { xs: "120px", sm: "160px", md: "220px" },
                        mb: 2
                      }
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(IconButton, { onClick: () => toggleDrawer(true), children: /* @__PURE__ */ jsx(
                Avatar,
                {
                  sx: {
                    bgcolor: "#1a5da6",
                    width: 40,
                    height: 40,
                    color: "white"
                  },
                  children: avatarText
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Drawer,
          {
            anchor: "left",
            open: drawerOpen,
            onClose: () => toggleDrawer(false),
            children: /* @__PURE__ */ jsxs(Box, { sx: { width: isMobile ? 250 : 300, p: 2 }, children: [
              /* @__PURE__ */ jsxs(
                Box,
                {
                  sx: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2
                  },
                  children: [
                    /* @__PURE__ */ jsx(Box, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: /* @__PURE__ */ jsx(Typography, { variant: "h6", children: user.name }) }),
                    /* @__PURE__ */ jsx(IconButton, { onClick: () => toggleDrawer(false), children: /* @__PURE__ */ jsx(CloseIcon, {}) })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(Divider, { sx: { mb: 2 } }),
              /* @__PURE__ */ jsxs(List, { children: [
                /* @__PURE__ */ jsx(
                  ListItemButton,
                  {
                    onClick: () => {
                      toggleDrawer(false);
                      navigate("/edit-profile");
                    },
                    children: /* @__PURE__ */ jsx(ListItemText, { primary: "Edit Profile" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  ListItemButton,
                  {
                    onClick: () => {
                      toggleDrawer(false);
                      navigate("/contact");
                    },
                    children: /* @__PURE__ */ jsx(ListItemText, { primary: "Contact" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  ListItemButton,
                  {
                    onClick: () => {
                      toggleDrawer(false);
                      navigate("/blog");
                    },
                    children: /* @__PURE__ */ jsx(ListItemText, { primary: "Blog" })
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(MainContent, { isMobile, children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Outlet, {}) }) }),
        /* @__PURE__ */ jsxs(
          StyledBottomNavigation,
          {
            showLabels: true,
            sx: {
              gap: isMobile ? 0 : 12,
              "& .Mui-selected": {
                color: "#1a5da6"
              }
            },
            children: [
              /* @__PURE__ */ jsx(
                StyledBottomNavigationAction,
                {
                  label: "Home",
                  icon: /* @__PURE__ */ jsx(Home, {}),
                  sx: {
                    backgroundColor: location.pathname === "/home" ? theme$1.palette.primary.light : "transparent"
                  },
                  onClick: () => navigate("/home")
                }
              ),
              /* @__PURE__ */ jsx(
                StyledBottomNavigationAction,
                {
                  label: "Community",
                  icon: /* @__PURE__ */ jsx(People, {}),
                  sx: {
                    backgroundColor: location.pathname === "/home/community" ? theme$1.palette.primary.light : "transparent"
                  },
                  onClick: () => navigate("/home/community")
                }
              ),
              /* @__PURE__ */ jsx(
                StyledBottomNavigationAction,
                {
                  label: "Timeline",
                  icon: /* @__PURE__ */ jsx(Timeline, {}),
                  sx: {
                    backgroundColor: location.pathname === "/home/timeline" ? theme$1.palette.primary.light : "transparent"
                  },
                  onClick: () => navigate("/home/timeline")
                }
              ),
              /* @__PURE__ */ jsx(
                StyledBottomNavigationAction,
                {
                  label: "Explore",
                  icon: /* @__PURE__ */ jsx(Explore, {}),
                  sx: {
                    backgroundColor: location.pathname === "/home/explore" ? theme$1.palette.primary.light : "transparent"
                  },
                  onClick: () => navigate("/home/explore")
                }
              )
            ]
          }
        )
      ]
    }
  ) });
};
const InformationPage = ({ content }) => {
  const [openCalendly, setOpenCalendly] = useState(false);
  return /* @__PURE__ */ jsxs(
    Box,
    {
      id: "Information",
      sx: { maxWidth: 800, mx: "auto", p: 3, textAlign: "center" },
      children: [
        /* @__PURE__ */ jsxs(Typography, { variant: "body1", sx: { mb: 3, fontStyle: "italic" }, children: [
          "The app is in progress, building something special for you! 🏗️",
          /* @__PURE__ */ jsx("br", {}),
          content && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("br", {}),
            "Feature in progress: ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx(Typography, { sx: { fontWeight: "bold" }, children: content })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Typography, { variant: "body1", sx: { mb: 3 }, children: [
          "📩 ",
          /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: "Let’s chat!" }),
          " Drop us a message at:",
          /* @__PURE__ */ jsx(Link, { href: "mailto:onaipiano7@gmail.com", underline: "hover", children: "onaipiano7@gmail.com" })
        ] }),
        /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: "Or" }),
        /* @__PURE__ */ jsx(Box, { sx: { mb: 3 }, children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "contained",
            onClick: () => {
              setOpenCalendly(true);
            },
            children: "📅 Schedule a call"
          }
        ) }),
        openCalendly && /* @__PURE__ */ jsx(InlineWidget, { url: "https://calendly.com/onaipiano7/30min" }),
        /* @__PURE__ */ jsxs(Box, { sx: { textAlign: "center", mb: 3 }, children: [
          /* @__PURE__ */ jsxs(Typography, { variant: "h6", sx: { mb: 1 }, children: [
            "🌍 ",
            /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", children: "Join our community!" })
          ] }),
          /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", justifyContent: "center", gap: 2 }, children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "https://www.instagram.com/onai.piano/",
                target: "_blank",
                rel: "noopener",
                underline: "hover",
                children: "📸 Instagram"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "https://www.facebook.com/profile.php?id=61573215503097",
                target: "_blank",
                rel: "noopener",
                underline: "hover",
                children: "👍 Facebook"
              }
            )
          ] })
        ] })
      ]
    }
  );
};
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};
const playBeep = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = "sine";
    oscillator.frequency.value = 1e3;
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(
      1e-5,
      audioCtx.currentTime + 0.1
    );
    oscillator.stop(audioCtx.currentTime + 0.1);
  } catch (error) {
    console.error("Metronome error", error);
  }
};
const getAdvice = (learnedCount, totalMeasures) => {
  if (learnedCount === 0) return "Start by learning two measures.";
  if (learnedCount > 0 && learnedCount < 2)
    return "Good start! Validate one more measure to complete your first set.";
  if (learnedCount === 2)
    return "Congrats! You've mastered your first two measures. Now, try validating two more.";
  if (learnedCount > 2 && learnedCount < totalMeasures)
    return "Great progress! Keep building your song piece by piece.";
  if (learnedCount === totalMeasures)
    return "Congratulations! You've validated all measures and mastered the song!";
  return "";
};
const SongLearningPage = () => {
  var _a;
  const { user, updateSongTraining } = useUser();
  const navigate = useNavigate();
  const currentSong = user.currentSong;
  const totalMinutes = currentSong ? currentSong.totalTime : 3;
  const totalMeasures = totalMinutes * 4;
  const [metronomeOn, setMetronomeOn] = useState(false);
  const [tempo, setTempo] = useState(120);
  const metronomeIntervalRef = useRef(null);
  const [sessionTime, setSessionTime] = useState(
    ((_a = user.currentSong) == null ? void 0 : _a.timeSpent) || 0
  );
  const [isTiming, setIsTiming] = useState(false);
  const sessionTimerRef = useRef(null);
  const [measures, setMeasures] = useState(
    Array(totalMeasures).fill(false)
  );
  const [adviceText, setAdviceText] = useState(
    getAdvice(0, totalMeasures)
  );
  useEffect(() => {
    if (metronomeOn) {
      const intervalMs = 60 * 1e3 / tempo;
      metronomeIntervalRef.current = setInterval(() => {
        playBeep();
      }, intervalMs);
    } else {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
    }
    return () => {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
    };
  }, [metronomeOn, tempo]);
  const startSession = () => {
    if (!isTiming) {
      setIsTiming(true);
      sessionTimerRef.current = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1e3);
    }
  };
  const pauseSession = () => {
    setIsTiming(false);
    if (sessionTimerRef.current) {
      clearInterval(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
  };
  const endSession = () => {
    pauseSession();
    const minutesSpent = Math.round(sessionTime / 60);
    console.log("Session ended. Time spent:", minutesSpent, "minutes");
    if (minutesSpent > 0) {
      updateSongTraining(minutesSpent, true);
    }
    navigate("/home");
  };
  const toggleMeasure = (index2) => {
    setMeasures((prev) => {
      const newMeasures = prev.map(
        (learned, i) => i === index2 ? !learned : learned
      );
      const learnedCount = newMeasures.filter(Boolean).length;
      const newAdvice = newMeasures[index2] ? `Congrats! Measure ${index2 + 1} validated. ${getAdvice(
        learnedCount,
        totalMeasures
      )}` : getAdvice(learnedCount, totalMeasures);
      setAdviceText(newAdvice);
      return newMeasures;
    });
  };
  const measuresLearned = measures.filter(Boolean).length;
  const progressPercent = measuresLearned / totalMeasures * 100;
  return (
    // Outer scrollable container: full viewport height with vertical scrolling
    /* @__PURE__ */ jsx(
      Box,
      {
        sx: {
          height: "100vh",
          overflowY: "auto",
          p: 2
        },
        children: /* @__PURE__ */ jsxs(
          Box,
          {
            sx: {
              maxWidth: 900,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 4
            },
            children: [
              /* @__PURE__ */ jsxs(
                Box,
                {
                  sx: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: 200
                  },
                  children: [
                    /* @__PURE__ */ jsx(Typography, { variant: "subtitle1", children: "Metronome" }),
                    /* @__PURE__ */ jsx(
                      FormControlLabel,
                      {
                        control: /* @__PURE__ */ jsx(
                          Switch,
                          {
                            checked: metronomeOn,
                            onChange: () => setMetronomeOn((prev) => !prev),
                            color: "primary"
                          }
                        ),
                        label: metronomeOn ? "On" : "Off"
                      }
                    ),
                    metronomeOn && /* @__PURE__ */ jsxs(Box, { sx: { mt: 1, textAlign: "center" }, children: [
                      /* @__PURE__ */ jsx(
                        TextField,
                        {
                          label: "Tempo (BPM)",
                          type: "number",
                          value: tempo,
                          onChange: (e) => setTempo(Number(e.target.value)),
                          size: "small",
                          sx: { width: 120 },
                          InputLabelProps: { shrink: true }
                        }
                      ),
                      /* @__PURE__ */ jsxs(Typography, { variant: "caption", display: "block", children: [
                        tempo,
                        " BPM"
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                Card,
                {
                  sx: {
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                    alignItems: "center"
                  },
                  children: /* @__PURE__ */ jsxs(CardContent, { sx: { flex: 1 }, children: [
                    /* @__PURE__ */ jsx(Typography, { variant: "h5", gutterBottom: true, children: currentSong ? currentSong.title : "No Song Selected" }),
                    /* @__PURE__ */ jsxs(Typography, { variant: "body1", children: [
                      "Progress: ",
                      measuresLearned,
                      " / ",
                      totalMeasures,
                      " measures learned"
                    ] }),
                    /* @__PURE__ */ jsx(
                      LinearProgress,
                      {
                        variant: "determinate",
                        value: progressPercent,
                        sx: { height: 10, borderRadius: 5, my: 1 }
                      }
                    ),
                    /* @__PURE__ */ jsxs(Typography, { variant: "body2", color: "textSecondary", children: [
                      "Time spent on training: ",
                      currentSong ? currentSong.timeSpent : 0,
                      " ",
                      "min"
                    ] })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(Card, { sx: { p: 2 }, children: /* @__PURE__ */ jsxs(CardContent, { children: [
                /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: "Practice Session" }),
                /* @__PURE__ */ jsx(Typography, { variant: "h4", sx: { my: 1 }, children: formatTime(sessionTime) }),
                /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", gap: 1, mb: 2 }, children: [
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "contained",
                      color: "primary",
                      onClick: startSession,
                      disabled: isTiming,
                      children: "Start"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "outlined",
                      color: "primary",
                      onClick: pauseSession,
                      disabled: !isTiming,
                      children: "Pause"
                    }
                  ),
                  /* @__PURE__ */ jsx(Button, { variant: "text", color: "secondary", onClick: endSession, children: "End Session" })
                ] }),
                /* @__PURE__ */ jsx(Box, { children: /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    target: "_blank",
                    underline: "hover",
                    color: "primary",
                    children: "Listen to the song on YouTube"
                  }
                ) })
              ] }) }),
              /* @__PURE__ */ jsx(Card, { sx: { p: 2 }, children: /* @__PURE__ */ jsxs(CardContent, { children: [
                /* @__PURE__ */ jsx(Typography, { variant: "h6", gutterBottom: true, children: "Learning Flow" }),
                /* @__PURE__ */ jsxs(Box, { sx: { mb: 2 }, children: [
                  /* @__PURE__ */ jsx(Button, { variant: "contained", disabled: true, children: "Upload Sheet / Music" }),
                  /* @__PURE__ */ jsx(
                    Typography,
                    {
                      variant: "caption",
                      color: "textSecondary",
                      display: "block",
                      children: "This feature will be available later."
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(Grid, { container: true, spacing: 1, children: measures.map((learned, index2) => /* @__PURE__ */ jsx(Grid, { item: true, xs: 3, sm: 1, children: /* @__PURE__ */ jsx(
                  FormControlLabel,
                  {
                    control: /* @__PURE__ */ jsx(
                      Checkbox,
                      {
                        checked: learned,
                        onChange: () => toggleMeasure(index2),
                        color: "primary"
                      }
                    ),
                    label: `M${index2 + 1}`,
                    labelPlacement: "top"
                  }
                ) }, index2)) }),
                /* @__PURE__ */ jsx(
                  Box,
                  {
                    sx: { mt: 2, p: 1, border: "1px dashed #ccc", borderRadius: 2 },
                    children: /* @__PURE__ */ jsx(Typography, { variant: "body1", children: adviceText })
                  }
                )
              ] }) })
            ]
          }
        )
      }
    )
  );
};
const landingPageTheme = createTheme$1({
  palette: {
    primary: {
      main: "#1a5da6",
      light: "rgba(74, 144, 226, 0.1)",
      dark: "#3A72B4"
    },
    secondary: { main: "#1a5da6" },
    accent: { main: "#FF6B6B" },
    background: { default: "#f5f7fa", paper: "#ffffff" },
    text: { primary: "#1a5da6" }
  },
  shape: { borderRadius: 12 },
  spacing: 8,
  typography: {
    fontFamily: "'Poppins','Roboto','Arial',sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      lineHeight: 1.2,
      "@media (max-width:600px)": { fontSize: "2rem" }
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
      "@media (max-width:600px)": { fontSize: "1.8rem" }
    }
    // ... other variants
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: "none",
          fontWeight: 600,
          padding: "12px 28px"
        },
        containedPrimary: {
          backgroundColor: "#1a5da6",
          "&:hover": {
            backgroundColor: "#6b5dd3"
            // ← bluish-violet
          }
        },
        outlinedPrimary: {
          borderColor: "#1a5da6",
          color: "#1a5da6",
          "&:hover": {
            backgroundColor: "rgba(107, 93, 211, 0.1)",
            // soft violet hover
            borderColor: "#6b5dd3",
            color: "#6b5dd3"
          }
        }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: "none",
          fontWeight: 600,
          padding: "12px 28px",
          "&:hover": {
            backgroundColor: "#6b5dd3"
            // ← bluish-violet
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(107, 93, 211, 0.1)",
          boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 24px rgba(107, 93, 211, 0.2)"
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(107, 93, 211, 0.08)",
          boxShadow: "none",
          backgroundColor: "#fff"
        }
      }
    },
    MuiContainer: {
      styleOverrides: { root: { paddingTop: "2rem", paddingBottom: "2rem" } }
    }
  }
});
const OnaiMascot = "/assets/onai_mascot-DZgRZoSx.png";
const TEXT_CONTENT_LANDING_PAGE = {
  hero: {
    onaiGreeting: "Hi! I'm Onai, and I'll be your piano buddy! 🎹✨",
    welcomePhrases: [
      "Hi! I'm Onai, and I'll be your piano buddy! Ready to start your musical journey? 🎹✨",
      "Want to learn your first song today? I can help! 🎵",
      "Practice makes perfect, and I'll be here every step of the way! 🎹"
    ]
  },
  featured: {
    title: "Stories",
    stories: [
      {
        title: "I Learned My First Song in Just 3 Days!",
        description: "A journey from complete beginner to playing your favorite tune",
        tag: "Success Story"
      },
      {
        title: "I was able to play 3 Basic Chords Today",
        description: "The foundation of countless popular songs at your fingertips",
        tag: "Chords"
      },
      {
        title: "I spent 15 Minutes a Day doing Challenges",
        description: "How small practice sessions led to big results",
        tag: "Challenge"
      }
    ]
  },
  tips: {
    title: "Piano Tips",
    items: [
      {
        title: "Finger Positioning 101",
        description: "Master the basics of hand placement for better control"
      },
      {
        title: "Reading Sheet Music Made Easy",
        description: "Simple tricks to understand musical notation"
      },
      {
        title: "Practice Routines for Beginners",
        description: "Structure your learning for maximum progress"
      }
    ]
  },
  community: {
    title: "Join Our Community",
    stats: [
      {
        value: "10,000+",
        label: "Active Learners"
      },
      {
        value: "500+",
        label: "Lessons"
      },
      {
        value: "1,000+",
        label: "Success Stories"
      }
    ]
  },
  features: {
    title: "Why Learn with OnaiPiano?",
    items: [
      {
        title: "Personalized Learning",
        description: "Adaptive lessons that grow with you"
      },
      {
        title: "Effective Practice",
        description: "Structured practice sessions for maximum progress"
      },
      {
        title: "Supportive Community",
        description: "Connect with fellow learners and get support"
      }
    ]
  },
  footer: {
    tagline: "Making piano learning accessible to everyone",
    links: ["Featured", "Stories", "Tips & Tricks", "Community"],
    copyright: `© ${(/* @__PURE__ */ new Date()).getFullYear()} OnaiPiano. All rights reserved.`
  }
};
function Hero() {
  const { welcomePhrases } = TEXT_CONTENT_LANDING_PAGE.hero;
  const [index2, setIndex] = useState(0);
  const theme2 = useTheme();
  const isMobile = useMediaQuery(theme2.breakpoints.down("sm"));
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % welcomePhrases.length);
    }, 3e3);
    return () => clearInterval(timer);
  }, [welcomePhrases.length]);
  return /* @__PURE__ */ jsxs(
    Box,
    {
      sx: {
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        mx: "2.5rem",
        animation: "slideIn 0.5s ease-out",
        justifyContent: "center",
        flexWrap: isMobile ? "wrap" : "nowrap"
      },
      children: [
        /* @__PURE__ */ jsx(
          Box,
          {
            component: "img",
            src: OnaiMascot,
            alt: "Onai Mascot",
            sx: { height: "140px", position: "relative" }
          }
        ),
        /* @__PURE__ */ jsx(
          Box,
          {
            sx: {
              background: "#fff",
              color: theme2.palette.text.primary,
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
                borderRight: "12px solid #fff"
              }
            },
            children: /* @__PURE__ */ jsx(Typography, { variant: "body1", sx: { fontSize: "1.1rem" }, children: welcomePhrases[index2] })
          }
        )
      ]
    }
  );
}
function FeaturedPage() {
  const { title, stories } = TEXT_CONTENT_LANDING_PAGE.featured;
  return /* @__PURE__ */ jsx(ThemeProvider$1, { theme: landingPageTheme, children: /* @__PURE__ */ jsxs(Container, { maxWidth: "lg", sx: { py: 2 }, children: [
    /* @__PURE__ */ jsx(
      Typography,
      {
        variant: "h2",
        align: "center",
        sx: {
          mb: 5,
          color: landingPageTheme.palette.primary.main,
          fontWeight: 600
        },
        children: title
      }
    ),
    /* @__PURE__ */ jsx(Grid, { container: true, spacing: 6, children: stories.map((story, idx) => /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, md: 6, children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { sx: { p: "2rem" }, children: [
      /* @__PURE__ */ jsx(
        Typography,
        {
          variant: "h5",
          component: "h2",
          gutterBottom: true,
          sx: { fontWeight: 600, mb: 2 },
          children: story.title
        }
      ),
      /* @__PURE__ */ jsx(
        Typography,
        {
          variant: "body1",
          component: "h3",
          color: "text.secondary",
          sx: { mb: 2 },
          children: story.description
        }
      )
    ] }) }) }, idx)) })
  ] }) });
}
function TipsPage() {
  const { title, items } = TEXT_CONTENT_LANDING_PAGE.tips;
  return /* @__PURE__ */ jsx(ThemeProvider$1, { theme: landingPageTheme, children: /* @__PURE__ */ jsxs(Container, { maxWidth: "lg", sx: { py: 2 }, children: [
    /* @__PURE__ */ jsx(
      Typography,
      {
        variant: "h2",
        align: "center",
        sx: {
          mb: 5,
          color: landingPageTheme.palette.primary.main,
          fontWeight: 600
        },
        children: title
      }
    ),
    /* @__PURE__ */ jsx(Grid, { container: true, spacing: 6, children: items.map((tip, idx) => /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, md: 6, children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { sx: { p: "2rem" }, children: [
      /* @__PURE__ */ jsx(
        Typography,
        {
          variant: "h5",
          component: "h2",
          gutterBottom: true,
          sx: { fontWeight: 600, mb: 2 },
          children: tip.title
        }
      ),
      /* @__PURE__ */ jsx(
        Typography,
        {
          variant: "body1",
          component: "h3",
          color: "text.secondary",
          children: tip.description
        }
      )
    ] }) }) }, idx)) })
  ] }) });
}
function LandingPage() {
  return /* @__PURE__ */ jsx(ThemeProvider$1, { theme: landingPageTheme, children: /* @__PURE__ */ jsxs(
    Box,
    {
      sx: {
        overflowX: "hidden",
        overflowY: "auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4
      },
      children: [
        /* @__PURE__ */ jsx(
          Box,
          {
            component: "img",
            src: Logo,
            alt: "OnaiPiano Logo",
            sx: {
              width: { xs: "120px", sm: "160px", md: "220px" }
            }
          }
        ),
        /* @__PURE__ */ jsx(Hero, {}),
        /* @__PURE__ */ jsx(Button, { href: "/onboarding", variant: "contained", children: "Start your Piano Journey" }),
        /* @__PURE__ */ jsx(FeaturedPage, {}),
        /* @__PURE__ */ jsx(TipsPage, {})
      ]
    }
  ) });
}
Chart.register(ArcElement, Tooltip);
const StyledDay = styled$1(Box, {
  shouldForwardProp: (prop) => prop !== "completed" && prop !== "active"
})(
  ({
    theme: theme2,
    completed,
    active
  }) => ({
    aspectRatio: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: completed ? theme2.palette.primary.main : "#f0f0f0",
    color: completed ? "white" : "inherit",
    borderRadius: 8,
    fontWeight: 500,
    border: active ? `2px solid ${theme2.palette.primary.main}` : "none",
    ...active && { color: theme2.palette.primary.main }
  })
);
const StyledCard$1 = styled$1(Card)(({ theme: theme2 }) => ({
  borderRadius: theme2.shape.borderRadius,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease",
  overflow: "hidden",
  border: "1px solid rgba(26, 93, 166, 0.1)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(26, 93, 166, 0.2)"
  }
}));
const StreakCount = styled$1(Typography)(({ theme: theme2 }) => ({
  fontWeight: "bold",
  color: theme2.palette.primary.main,
  "@keyframes pulse": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.05)" },
    "100%": { transform: "scale(1)" }
  },
  animation: "pulse 2s infinite"
}));
const StyledActionButtonPrimary$1 = styled$1(Button)(({ theme: theme2 }) => ({
  borderRadius: "8px",
  backgroundColor: theme2.palette.primary.main,
  color: "#ffffff",
  border: `2px solid ${theme2.palette.primary.main}`,
  boxShadow: "0 4px 8px rgba(26, 93, 166, 0.2)",
  transition: "all 0.3s ease",
  textTransform: "none",
  padding: "10px 20px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: theme2.palette.primary.dark,
    transform: "translateY(-2px)"
  }
}));
const getDateString = (date) => date.toISOString().split("T")[0];
const MainViewSpace = () => {
  const navigate = useNavigate();
  const { user, chartData, chartOptions, challengeLevels } = useUser();
  const dailyGoal = 30;
  const getLast7Days = () => {
    const daysArray = [];
    const today = /* @__PURE__ */ new Date();
    for (let i = 6; i >= 0; i--) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(today.getDate() - i);
      const dateStr = getDateString(d);
      daysArray.push({
        letter: d.toLocaleString("en-US", { weekday: "short" }).charAt(0),
        completed: (user.challengeHistory || []).includes(dateStr),
        active: dateStr === getDateString(today)
      });
    }
    return daysArray;
  };
  const days = getLast7Days();
  const todayDate = getDateString(/* @__PURE__ */ new Date());
  const todaysChallenge = user.challenges.find((ch) => ch.date === todayDate) || (user.challenges.length > 0 ? user.challenges[user.challenges.length - 1] : null);
  const remainingMinutes = Math.max(dailyGoal - user.timeSpent, 0);
  const currentLevelDetail = challengeLevels.find(
    (level) => level.level === user.currentLevel
  );
  const currentSong = user.currentSong || null;
  const defaultSongTotalTime = 3;
  const songTimeSpent = currentSong ? currentSong.timeSpent : 0;
  const songTotalTime = currentSong ? currentSong.totalTime : defaultSongTotalTime;
  const remainingSongMinutes = Math.max(songTotalTime - songTimeSpent, 0);
  const songTrainingSessions = currentSong ? currentSong.trainingSessions || 0 : 0;
  const songChartData = {
    labels: ["Learned", "Remaining"],
    datasets: [
      {
        data: [songTimeSpent, remainingSongMinutes],
        backgroundColor: ["#1a5da6", "#f0f0f0"],
        borderWidth: 0
      }
    ]
  };
  return /* @__PURE__ */ jsxs(
    Box,
    {
      sx: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        maxWidth: 800,
        mx: "auto",
        p: 2
      },
      children: [
        /* @__PURE__ */ jsx(StyledCard$1, { children: /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs(
            Box,
            {
              sx: {
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                textAlign: { xs: "center", sm: "left" }
              },
              children: [
                /* @__PURE__ */ jsx(Typography, { variant: "h6", children: "Current Streak" }),
                /* @__PURE__ */ jsxs(StreakCount, { variant: "body1", children: [
                  "🔥 ",
                  user.streak || "0",
                  " days"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(Grid, { container: true, spacing: 1, children: days.map((day, index2) => /* @__PURE__ */ jsx(Grid, { item: true, xs: 1.5, children: /* @__PURE__ */ jsx(
            StyledDay,
            {
              completed: !!day.completed,
              active: day.active ? true : void 0,
              children: day.letter
            }
          ) }, index2)) })
        ] }) }),
        /* @__PURE__ */ jsx(StyledCard$1, { children: /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs(
            Box,
            {
              sx: {
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: { xs: "center", sm: "flex-start" }
              },
              children: [
                /* @__PURE__ */ jsx(WhatshotIcon, { sx: { color: "#1a5da6" } }),
                /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "h6",
                    sx: { textAlign: { xs: "center", sm: "left" } },
                    children: "Today's Challenge"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 3, children: [
            /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sm: 3, children: /* @__PURE__ */ jsxs(Box, { sx: { position: "relative", height: 120 }, children: [
              /* @__PURE__ */ jsx(
                Doughnut,
                {
                  data: chartData,
                  options: chartOptions
                },
                remainingMinutes
              ),
              /* @__PURE__ */ jsxs(
                Box,
                {
                  sx: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsx(Typography, { variant: "h6", sx: { fontWeight: "bold" }, children: remainingMinutes > 0 ? `${remainingMinutes} min` : "Done!" }),
                    /* @__PURE__ */ jsx(
                      Typography,
                      {
                        variant: "caption",
                        sx: { color: "text.secondary" },
                        children: "left today"
                      }
                    )
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs(
              Grid,
              {
                item: true,
                xs: 12,
                sm: 9,
                sx: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", sm: "flex-start" },
                  textAlign: { xs: "center", sm: "left" }
                },
                children: [
                  todaysChallenge && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Typography, { variant: "h6", sx: { color: "#1a5da6" }, children: todaysChallenge.title }),
                    /* @__PURE__ */ jsx(Typography, { variant: "body2", sx: { mt: 1 }, children: todaysChallenge.description })
                  ] }),
                  currentLevelDetail && /* @__PURE__ */ jsxs(Box, { sx: { mt: 2 }, children: [
                    /* @__PURE__ */ jsxs(Typography, { variant: "subtitle1", sx: { fontWeight: "bold" }, children: [
                      "Current Level: ",
                      currentLevelDetail.title
                    ] }),
                    /* @__PURE__ */ jsx(Typography, { variant: "body2", sx: { color: "text.secondary" }, children: currentLevelDetail.description })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    Box,
                    {
                      sx: {
                        gap: 2,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" }
                      },
                      children: [
                        /* @__PURE__ */ jsx(
                          StyledActionButtonPrimary$1,
                          {
                            onClick: () => navigate("/dailychallenge"),
                            sx: { mt: 2 },
                            children: todaysChallenge ? "Continue Practice" : "Start Practice"
                          }
                        ),
                        /* @__PURE__ */ jsx(StyledActionButtonPrimary$1, { sx: { mt: 2 }, onClick: () => navigate("/home/explore"), children: "Discover Challenges" })
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(StyledCard$1, { children: /* @__PURE__ */ jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxs(
            Box,
            {
              sx: {
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: { xs: "center", sm: "flex-start" }
              },
              children: [
                /* @__PURE__ */ jsx(MusicNoteIcon, { sx: { color: "#1a5da6" } }),
                /* @__PURE__ */ jsx(
                  Typography,
                  {
                    variant: "h6",
                    sx: { textAlign: { xs: "center", sm: "left" } },
                    children: "Song Learning"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 3, children: [
            /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sm: 3, children: /* @__PURE__ */ jsxs(Box, { sx: { position: "relative", height: 120 }, children: [
              /* @__PURE__ */ jsx(
                Doughnut,
                {
                  data: songChartData,
                  options: chartOptions
                },
                remainingSongMinutes
              ),
              /* @__PURE__ */ jsxs(
                Box,
                {
                  sx: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsx(Typography, { variant: "h6", sx: { fontWeight: "bold" }, children: remainingSongMinutes > 0 ? `${remainingSongMinutes} min` : "Complete!" }),
                    /* @__PURE__ */ jsx(
                      Typography,
                      {
                        variant: "caption",
                        sx: { color: "text.secondary" },
                        children: "left to learn"
                      }
                    )
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxs(
              Grid,
              {
                item: true,
                xs: 12,
                sm: 9,
                sx: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", sm: "flex-start" },
                  textAlign: { xs: "center", sm: "left" }
                },
                children: [
                  currentSong ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsxs(Typography, { variant: "subtitle1", children: [
                      "Current Song: ",
                      /* @__PURE__ */ jsx("strong", { children: currentSong.title })
                    ] }),
                    /* @__PURE__ */ jsxs(Typography, { variant: "body1", sx: { mt: 1 }, children: [
                      "Training Sessions: ",
                      /* @__PURE__ */ jsxs("strong", { children: [
                        " ",
                        songTrainingSessions,
                        " "
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs(Typography, { variant: "body1", sx: { mt: 1 }, children: [
                      "Time Spent: ",
                      /* @__PURE__ */ jsxs("strong", { children: [
                        " ",
                        songTimeSpent,
                        " min "
                      ] })
                    ] })
                  ] }) : /* @__PURE__ */ jsx(Typography, { variant: "body2", sx: { mt: 1 }, children: "No song in progress yet. Start your first song to see progress here." }),
                  /* @__PURE__ */ jsxs(
                    Box,
                    {
                      sx: {
                        gap: 2,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" }
                      },
                      children: [
                        /* @__PURE__ */ jsx(
                          StyledActionButtonPrimary$1,
                          {
                            onClick: () => navigate("/learnsong"),
                            sx: { mt: 2 },
                            children: currentSong ? "Continue Learning" : "Start Learning"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          StyledActionButtonPrimary$1,
                          {
                            onClick: () => navigate("/learnsong"),
                            sx: { mt: 2 },
                            children: "Go to Studies"
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 3, children: [
          /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sm: 6, children: /* @__PURE__ */ jsxs(
            StyledCard$1,
            {
              sx: {
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              },
              onClick: () => navigate("/advice"),
              children: [
                /* @__PURE__ */ jsx(LibraryBooksIcon, { sx: { color: "#1a5da6", fontSize: 32, mb: 1 } }),
                /* @__PURE__ */ jsx(Typography, { variant: "body1", children: "Basic Advices" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sm: 6, children: /* @__PURE__ */ jsxs(
            StyledCard$1,
            {
              sx: {
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              },
              onClick: () => navigate("/tutorial"),
              children: [
                /* @__PURE__ */ jsx(PsychologyIcon, { sx: { color: "#1a5da6", fontSize: 32, mb: 1 } }),
                /* @__PURE__ */ jsx(Typography, { variant: "body1", children: "Philosophy" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(Box, { sx: { textAlign: "center", mt: 4 }, children: /* @__PURE__ */ jsxs(Box, { sx: { display: "flex", justifyContent: "center", gap: 3, mb: 2 }, children: [
          /* @__PURE__ */ jsx(
            IconButton,
            {
              onClick: () => window.open("https://www.instagram.com/onai.piano/", "_blank"),
              sx: { color: "#C13584" },
              children: /* @__PURE__ */ jsx(InstagramIcon, { fontSize: "large" })
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              onClick: () => window.open(
                "https://www.facebook.com/profile.php?id=61573215503097",
                "_blank"
              ),
              sx: { color: "#3b5998" },
              children: /* @__PURE__ */ jsx(FacebookIcon, { fontSize: "large" })
            }
          )
        ] }) })
      ]
    }
  );
};
var ChallengeType = /* @__PURE__ */ ((ChallengeType2) => {
  ChallengeType2["Info"] = "info_only";
  ChallengeType2["Quiz"] = "quiz_mcq";
  ChallengeType2["Match"] = "match_pairs";
  ChallengeType2["Input"] = "quiz_input";
  ChallengeType2["PlayNote"] = "play_note";
  ChallengeType2["PlaySeq"] = "play_sequence";
  ChallengeType2["Free"] = "free_practice";
  return ChallengeType2;
})(ChallengeType || {});
var ChallengeLevel = /* @__PURE__ */ ((ChallengeLevel2) => {
  ChallengeLevel2["Prep"] = "Prep";
  ChallengeLevel2["Grade1"] = "Grade1";
  ChallengeLevel2["Grade2"] = "Grade2";
  ChallengeLevel2["Grade3"] = "Grade3";
  ChallengeLevel2["Grade4"] = "Grade4";
  ChallengeLevel2["Grade5"] = "Grade5";
  return ChallengeLevel2;
})(ChallengeLevel || {});
var ChallengeDomain = /* @__PURE__ */ ((ChallengeDomain2) => {
  ChallengeDomain2["Notation"] = "notation";
  ChallengeDomain2["Sight"] = "sight_reading";
  ChallengeDomain2["Rhythm"] = "rhythm";
  ChallengeDomain2["Technique"] = "technique";
  ChallengeDomain2["Scales"] = "scales";
  ChallengeDomain2["Chords"] = "chords";
  ChallengeDomain2["Harmony"] = "harmony";
  ChallengeDomain2["Ear"] = "ear_training";
  return ChallengeDomain2;
})(ChallengeDomain || {});
var ObjectiveTag = /* @__PURE__ */ ((ObjectiveTag2) => {
  ObjectiveTag2["Read"] = "read";
  ObjectiveTag2["Recognize"] = "recognize";
  ObjectiveTag2["Play"] = "play";
  ObjectiveTag2["Listen"] = "listen";
  ObjectiveTag2["Match"] = "match";
  ObjectiveTag2["Memorize"] = "memorize";
  ObjectiveTag2["Apply"] = "apply";
  ObjectiveTag2["Analyze"] = "analysis";
  ObjectiveTag2["Explore"] = "explore";
  return ObjectiveTag2;
})(ObjectiveTag || {});
const typeLabels = {
  [
    "info_only"
    /* Info */
  ]: "Information Only",
  [
    "quiz_mcq"
    /* Quiz */
  ]: "Multiple‑Choice Quiz",
  [
    "match_pairs"
    /* Match */
  ]: "Matching Game",
  [
    "quiz_input"
    /* Input */
  ]: "Fill‑in Quiz",
  [
    "play_note"
    /* PlayNote */
  ]: "Play Note",
  [
    "play_sequence"
    /* PlaySeq */
  ]: "Play Sequence",
  [
    "free_practice"
    /* Free */
  ]: "Free Practice"
};
const levelLabels = {
  [
    "Prep"
    /* Prep */
  ]: "Prep",
  [
    "Grade1"
    /* Grade1 */
  ]: "Grade 1",
  [
    "Grade2"
    /* Grade2 */
  ]: "Grade 2",
  [
    "Grade3"
    /* Grade3 */
  ]: "Grade 3",
  [
    "Grade4"
    /* Grade4 */
  ]: "Grade 4",
  [
    "Grade5"
    /* Grade5 */
  ]: "Grade 5"
};
const domainLabels = {
  [
    "notation"
    /* Notation */
  ]: "Notation",
  [
    "sight_reading"
    /* Sight */
  ]: "Sight Reading",
  [
    "rhythm"
    /* Rhythm */
  ]: "Rhythm",
  [
    "technique"
    /* Technique */
  ]: "Technique",
  [
    "scales"
    /* Scales */
  ]: "Scales",
  [
    "chords"
    /* Chords */
  ]: "Chords",
  [
    "harmony"
    /* Harmony */
  ]: "Harmony",
  [
    "ear_training"
    /* Ear */
  ]: "Ear Training"
};
const objectiveLabels = {
  [
    "read"
    /* Read */
  ]: "Read",
  [
    "recognize"
    /* Recognize */
  ]: "Recognize",
  [
    "play"
    /* Play */
  ]: "Play",
  [
    "listen"
    /* Listen */
  ]: "Listen",
  [
    "match"
    /* Match */
  ]: "Match",
  [
    "memorize"
    /* Memorize */
  ]: "Memorize",
  [
    "apply"
    /* Apply */
  ]: "Apply",
  [
    "analysis"
    /* Analyze */
  ]: "Analyze",
  [
    "explore"
    /* Explore */
  ]: "Explore"
};
const challengesData = [
  {
    id: "prep_note_names",
    title: "Learn Note Names (A–G)",
    type: "info_only",
    level: "Prep",
    domain: "notation",
    objectives: [
      "recognize",
      "memorize"
      /* Memorize */
    ],
    estimatedDuration: 3,
    shortDescription: "Introduction to the musical alphabet and Middle C."
  },
  {
    id: "g1_quiz_treble_notes",
    title: "Treble Clef Quiz",
    type: "quiz_mcq",
    level: "Grade1",
    domain: "sight_reading",
    objectives: [
      "read",
      "recognize"
      /* Recognize */
    ],
    estimatedDuration: 4,
    shortDescription: "Identify line & space notes in the treble clef."
  },
  {
    id: "g2_quiz_bass_notes_line_space",
    title: "Bass Clef Line & Space Quiz",
    type: "quiz_mcq",
    level: "Grade2",
    domain: "sight_reading",
    objectives: [
      "read",
      "recognize"
      /* Recognize */
    ],
    estimatedDuration: 5,
    shortDescription: "Identify bass clef line and space notes—up to Grade 2."
  },
  {
    id: "g2_match_bass_to_key",
    title: "Match Bass Staff to Piano",
    type: "match_pairs",
    level: "Grade2",
    domain: "sight_reading",
    objectives: [
      "read",
      "match"
      /* Match */
    ],
    estimatedDuration: 5,
    shortDescription: "Drag bass-clef notes to their piano key positions."
  },
  {
    id: "g2_quiz_rhythm_fill",
    title: "Fill the Missing Rhythm",
    type: "quiz_input",
    level: "Grade2",
    domain: "rhythm",
    objectives: [
      "recognize",
      "apply"
      /* Apply */
    ],
    estimatedDuration: 5,
    shortDescription: "Complete the bar by typing the missing note/rest."
  },
  {
    id: "g3_play_c_scale",
    title: "Play C Major Scale",
    type: "play_sequence",
    level: "Grade3",
    domain: "scales",
    objectives: [
      "play",
      "memorize"
      /* Memorize */
    ],
    estimatedDuration: 6,
    shortDescription: "Play C-major scale up and down accurately."
  },
  {
    id: "g3_quiz_key_signature_g",
    title: "G Major Key Signature Quiz",
    type: "quiz_mcq",
    level: "Grade3",
    domain: "notation",
    objectives: [
      "recognize",
      "apply"
      /* Apply */
    ],
    estimatedDuration: 4,
    shortDescription: "Identify G‑major key signature in treble or bass clef."
  },
  {
    id: "g4_play_triad_root",
    title: "Identify Triad Root Note",
    type: "play_note",
    level: "Grade4",
    domain: "chords",
    objectives: [
      "listen",
      "recognize"
      /* Recognize */
    ],
    estimatedDuration: 4,
    shortDescription: "Hear a triad → press its root on the keyboard."
  },
  {
    id: "g4_match_quarter_rest",
    title: "Match Rests to Symbols",
    type: "match_pairs",
    level: "Grade4",
    domain: "rhythm",
    objectives: [
      "recognize",
      "match"
      /* Match */
    ],
    estimatedDuration: 4,
    shortDescription: "Match names (e.g., crotchet rest) to their notation."
  },
  {
    id: "g5_quiz_harmony_progression",
    title: "Chord Progression I–IV–V–I Quiz",
    type: "quiz_mcq",
    level: "Grade5",
    domain: "harmony",
    objectives: [
      "analysis",
      "recognize"
      /* Recognize */
    ],
    estimatedDuration: 7,
    shortDescription: "Identify chord functions in a typical progression."
  }
];
const StyledCard = styled("div")(({ theme: theme2 }) => ({
  borderRadius: theme2.shape.borderRadius,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease",
  overflow: "hidden",
  border: "1px solid rgba(26, 93, 166, 0.1)",
  backgroundColor: "#fff",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(26, 93, 166, 0.2)",
    backgroundColor: "#f9f9f9"
  },
  display: "flex",
  flexDirection: "column",
  height: "100%"
}));
const StyledActionButtonPrimary = styled(Button)(({ theme: theme2 }) => ({
  borderRadius: "8px",
  backgroundColor: theme2.palette.primary.main,
  color: "#ffffff",
  border: `2px solid ${theme2.palette.primary.main}`,
  boxShadow: "0 4px 8px rgba(26, 93, 166, 0.2)",
  transition: "all 0.3s ease",
  textTransform: "none",
  padding: "8px 16px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: theme2.palette.primary.dark,
    transform: "translateY(-2px)"
  }
}));
const StyledActionButtonSecondary = styled(Button)(({ theme: theme2 }) => ({
  borderRadius: "8px",
  backgroundColor: "#fff",
  color: theme2.palette.primary.main,
  border: `2px solid ${theme2.palette.primary.main}`,
  transition: "all 0.3s ease",
  textTransform: "none",
  padding: "8px 16px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: theme2.palette.action.hover
  }
}));
const domainColors = {
  notation: "primary",
  sight_reading: "secondary",
  rhythm: "success",
  ear_training: "warning",
  harmony: "info",
  scales: "primary",
  chords: "secondary",
  technique: "success"
};
function DiscoverChallenges() {
  const [types, setTypes] = React.useState([]);
  const [domains, setDomains] = React.useState([]);
  const [objectives, setObjectives] = React.useState([]);
  const [levels, setLevels] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleSelect = (value, setter) => (event) => {
    setter(event.target.value);
  };
  const handleInfoClick = (e) => setAnchorEl(e.currentTarget);
  const filtered = challengesData.filter((c) => {
    if (types.length && !types.includes(c.type)) return false;
    if (domains.length && !domains.includes(c.domain)) return false;
    if (levels.length && !levels.includes(c.level)) return false;
    if (objectives.length && !objectives.some((o) => c.objectives.includes(o)))
      return false;
    return true;
  });
  const levelsSorted = Object.values(ChallengeLevel);
  const grouped = levelsSorted.map((lvl) => ({
    level: lvl,
    items: filtered.filter((c) => c.level === lvl)
  }));
  return /* @__PURE__ */ jsxs(Container, { sx: { py: 4 }, children: [
    /* @__PURE__ */ jsx(Box, { textAlign: "center", mb: 4, children: /* @__PURE__ */ jsxs(Typography, { variant: "h3", component: "h1", gutterBottom: true, children: [
      "Discover Challenges",
      /* @__PURE__ */ jsx(
        DiscoverIcon,
        {
          fontSize: "large",
          sx: { verticalAlign: "middle", mr: 1, color: "primary.main" }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(
      Box,
      {
        sx: {
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)"
          },
          gap: 2,
          mb: 4
        },
        children: [
          /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, size: "small", children: [
            /* @__PURE__ */ jsx(InputLabel, { children: "Type" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                multiple: true,
                value: types,
                onChange: handleSelect(types, setTypes),
                label: "Type",
                renderValue: (sel) => sel.map((v) => typeLabels[v]).join(", "),
                children: Object.values(ChallengeType).map((t) => /* @__PURE__ */ jsxs(MenuItem, { value: t, children: [
                  /* @__PURE__ */ jsx(Checkbox, { checked: types.includes(t) }),
                  /* @__PURE__ */ jsx(ListItemText, { primary: typeLabels[t] })
                ] }, t))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, size: "small", children: [
            /* @__PURE__ */ jsx(InputLabel, { children: "Domain" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                multiple: true,
                value: domains,
                onChange: handleSelect(domains, setDomains),
                label: "Domain",
                renderValue: (sel) => sel.map((v) => domainLabels[v]).join(", "),
                children: Object.values(ChallengeDomain).map((d) => /* @__PURE__ */ jsxs(MenuItem, { value: d, children: [
                  /* @__PURE__ */ jsx(Checkbox, { checked: domains.includes(d) }),
                  /* @__PURE__ */ jsx(ListItemText, { primary: domainLabels[d] })
                ] }, d))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, size: "small", children: [
            /* @__PURE__ */ jsx(InputLabel, { children: "Objective" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                multiple: true,
                value: objectives,
                onChange: handleSelect(objectives, setObjectives),
                label: "Objective",
                renderValue: (sel) => sel.map((v) => objectiveLabels[v]).join(", "),
                children: Object.values(ObjectiveTag).map((o) => /* @__PURE__ */ jsxs(MenuItem, { value: o, children: [
                  /* @__PURE__ */ jsx(Checkbox, { checked: objectives.includes(o) }),
                  /* @__PURE__ */ jsx(ListItemText, { primary: objectiveLabels[o] })
                ] }, o))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, size: "small", children: [
            /* @__PURE__ */ jsx(InputLabel, { children: "Level" }),
            /* @__PURE__ */ jsx(
              Select,
              {
                multiple: true,
                value: levels,
                onChange: handleSelect(levels, setLevels),
                label: "Level",
                renderValue: (sel) => sel.map((v) => levelLabels[v]).join(", "),
                children: Object.values(ChallengeLevel).map((l) => /* @__PURE__ */ jsxs(MenuItem, { value: l, children: [
                  /* @__PURE__ */ jsx(Checkbox, { checked: levels.includes(l) }),
                  /* @__PURE__ */ jsx(ListItemText, { primary: levelLabels[l] })
                ] }, l))
              }
            )
          ] })
        ]
      }
    ),
    grouped.map(
      ({ level, items }) => items.length > 0 && /* @__PURE__ */ jsxs(Accordion, { defaultExpanded: true, sx: { mb: 2, background: "transparent" }, children: [
        /* @__PURE__ */ jsx(AccordionSummary, { expandIcon: /* @__PURE__ */ jsx(ExpandMoreIcon, {}), children: /* @__PURE__ */ jsx(Typography, { variant: "h6", children: levelLabels[level] }) }),
        /* @__PURE__ */ jsx(AccordionDetails, { children: /* @__PURE__ */ jsx(Grid, { container: true, spacing: 2, children: items.map((ch) => /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: /* @__PURE__ */ jsxs(StyledCard, { children: [
          /* @__PURE__ */ jsx(
            CardHeader,
            {
              title: ch.title,
              subheader: typeLabels[ch.type]
            }
          ),
          /* @__PURE__ */ jsxs(CardContent, { sx: { flexGrow: 1 }, children: [
            /* @__PURE__ */ jsxs(
              Stack,
              {
                direction: "row",
                spacing: 1,
                flexWrap: "wrap",
                mb: 1,
                children: [
                  /* @__PURE__ */ jsx(
                    Chip,
                    {
                      label: domainLabels[ch.domain],
                      size: "small",
                      color: domainColors[ch.domain]
                    }
                  ),
                  ch.objectives.map((o) => /* @__PURE__ */ jsx(
                    Chip,
                    {
                      label: objectiveLabels[o],
                      size: "small",
                      variant: "outlined"
                    },
                    o
                  )),
                  /* @__PURE__ */ jsx(IconButton, { size: "small", onClick: handleInfoClick, children: /* @__PURE__ */ jsx(InfoIcon, { fontSize: "small" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(Typography, { variant: "body2", mb: 1, children: [
              "⏱️ ",
              ch.estimatedDuration,
              " min"
            ] }),
            /* @__PURE__ */ jsx(Typography, { variant: "body2", mb: 2, children: ch.shortDescription }),
            /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 1, children: [
              /* @__PURE__ */ jsx(StyledActionButtonPrimary, { size: "small", children: "Start" }),
              /* @__PURE__ */ jsx(StyledActionButtonSecondary, { size: "small", children: "Details" })
            ] })
          ] })
        ] }) }, ch.id)) }) })
      ] }, level)
    ),
    /* @__PURE__ */ jsx(Box, { textAlign: "center", mt: 4, children: /* @__PURE__ */ jsx(Button, { startIcon: /* @__PURE__ */ jsx(FeedbackIcon, {}), variant: "outlined", color: "primary", children: "Send Feedback" }) })
  ] });
}
lazy(() => import("./Home-Dz3rcVlN.js"));
const TrainPiano = lazy(() => import("./TrainPiano-C9oKuhbZ.js"));
const OnboardingPage = lazy(() => import("./OnBoarding-RK1fZQ2Y.js"));
const AdvicePage = lazy(() => import("./AdvicePage-GELi558g.js"));
const TutorialPage = lazy(() => import("./TutorialPage-CawM3Usa.js"));
const theme = createTheme$1({
  palette: {
    primary: { main: "#1a5da6" },
    secondary: { main: "#FF4081" }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h1: { fontWeight: 700 }
  }
});
const Router = ({ isMobile }) => {
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx(ThemeProvider$1, { theme, children: /* @__PURE__ */ jsx(UserProvider, { children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(LandingPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/onboarding", element: /* @__PURE__ */ jsx(OnboardingPage, {}) }),
    /* @__PURE__ */ jsxs(Route, { path: "/home", element: /* @__PURE__ */ jsx(HomeSpace, {}), children: [
      /* @__PURE__ */ jsx(Route, { path: "", element: /* @__PURE__ */ jsx(MainViewSpace, {}) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "community",
          element: /* @__PURE__ */ jsx(InformationPage, { content: "Connect with fellow piano enthusiasts who share your musical interests and goals." })
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "timeline",
          element: /* @__PURE__ */ jsx(InformationPage, { content: "Through analyzing your style and goals, we create a personalized timeline that evolves with you." })
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "explore", element: /* @__PURE__ */ jsx(DiscoverChallenges, {}) })
    ] }),
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/advice",
        element: /* @__PURE__ */ jsx(AdvicePage, { isMobile })
      }
    ),
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/tutorial",
        element: /* @__PURE__ */ jsx(TutorialPage, { isMobile })
      }
    ),
    /* @__PURE__ */ jsx(Route, { path: "/trainpiano", element: /* @__PURE__ */ jsx(TrainPiano, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(InformationPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/dailychallenge", element: /* @__PURE__ */ jsx(PianoMasteryChallenge, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/learnsong", element: /* @__PURE__ */ jsx(SongLearningPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/featured", element: /* @__PURE__ */ jsx(FeaturedPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/tips", element: /* @__PURE__ */ jsx(TipsPage, {}) })
  ] }) }) }) });
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Router
}, Symbol.toStringTag, { value: "Module" }));
export {
  Logo as L,
  index as i,
  useUser as u
};
