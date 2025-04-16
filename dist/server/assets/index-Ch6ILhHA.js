import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createContext, useState, useEffect, useContext, useRef, lazy, Suspense } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Vex, Stave, StaveNote, Accidental } from "vexflow";
import { Piano, MidiNumbers } from "react-piano";
import { useTheme, useMediaQuery, Box, Typography, Switch, IconButton, Button, Drawer, Divider, List, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, Grid, Link, BottomNavigation, BottomNavigationAction, AppBar, Toolbar, Avatar, Container, FormControlLabel, TextField, LinearProgress, Checkbox, createTheme as createTheme$1, ThemeProvider as ThemeProvider$1 } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";
import { createTheme, styled as styled$1, ThemeProvider } from "@mui/material/styles/index.js";
import { Home, People, Timeline, Explore } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Doughnut } from "react-chartjs-2";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PsychologyIcon from "@mui/icons-material/Psychology";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { InlineWidget } from "react-calendly";
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
Chart.register(ArcElement, Tooltip);
const StyledDay = styled(Box, {
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
const StyledCard = styled(Card)(({ theme: theme2 }) => ({
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
const StreakCount = styled(Typography)(({ theme: theme2 }) => ({
  fontWeight: "bold",
  color: theme2.palette.primary.main,
  "@keyframes pulse": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.05)" },
    "100%": { transform: "scale(1)" }
  },
  animation: "pulse 2s infinite"
}));
const StyledActionButton = styled(Button)(({ theme: theme2 }) => ({
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
        /* @__PURE__ */ jsx(StyledCard, { children: /* @__PURE__ */ jsxs(CardContent, { children: [
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
        /* @__PURE__ */ jsx(StyledCard, { children: /* @__PURE__ */ jsxs(CardContent, { children: [
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
                  /* @__PURE__ */ jsx(
                    StyledActionButton,
                    {
                      onClick: () => navigate("/dailychallenge"),
                      sx: { mt: 2 },
                      children: todaysChallenge ? "Continue Practice" : "Start Practice"
                    }
                  )
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(StyledCard, { children: /* @__PURE__ */ jsxs(CardContent, { children: [
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
                    /* @__PURE__ */ jsxs(
                      Typography,
                      {
                        variant: "body1",
                        sx: { mt: 1 },
                        children: [
                          "Training Sessions: ",
                          /* @__PURE__ */ jsxs("strong", { children: [
                            " ",
                            songTrainingSessions,
                            " "
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      Typography,
                      {
                        variant: "body1",
                        sx: { mt: 1 },
                        children: [
                          "Time Spent: ",
                          /* @__PURE__ */ jsxs("strong", { children: [
                            " ",
                            songTimeSpent,
                            " min "
                          ] })
                        ]
                      }
                    )
                  ] }) : /* @__PURE__ */ jsx(Typography, { variant: "body2", sx: { mt: 1 }, children: "No song in progress yet. Start your first song to see progress here." }),
                  /* @__PURE__ */ jsx(
                    StyledActionButton,
                    {
                      onClick: () => navigate("/learnsong"),
                      sx: { mt: 2 },
                      children: currentSong ? "Continue Learning" : "Start Learning"
                    }
                  )
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 3, children: [
          /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sm: 6, children: /* @__PURE__ */ jsxs(
            StyledCard,
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
            StyledCard,
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
const MainContent = styled$1(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile"
})(({ theme: theme2, isMobile }) => ({
  flexGrow: 1,
  overflowY: "auto",
  overflowX: "hidden",
  paddingBottom: isMobile ? theme2.spacing(16) : theme2.spacing(5),
  paddingTop: theme2.spacing(5),
  height: isMobile ? "calc(100vh - 160px)" : "calc(100vh - 320px)",
  WebkitOverflowScrolling: "touch"
}));
const StyledBottomNavigation = styled$1(BottomNavigation)(({ theme: theme2 }) => ({
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
const StyledBottomNavigationAction = styled$1(BottomNavigationAction)(
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
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
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
                      navigate("/contact");
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
                      navigate("/contact");
                    },
                    children: /* @__PURE__ */ jsx(ListItemText, { primary: "Blog" })
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(MainContent, { isMobile, children: /* @__PURE__ */ jsxs(Container, { children: [
          value === 0 && /* @__PURE__ */ jsx(MainViewSpace, {}),
          value === 1 && /* @__PURE__ */ jsx(InformationPage, { content: "Connect with fellow piano enthusiasts who share your musical interests and goals." }),
          value === 2 && /* @__PURE__ */ jsx(InformationPage, { content: "Through analyzing your style and goals, we create a personalized timeline that evolves with you." }),
          value === 3 && /* @__PURE__ */ jsx(InformationPage, { content: "Music is about emotion - we help you connect with every piece you play." })
        ] }) }),
        /* @__PURE__ */ jsxs(
          StyledBottomNavigation,
          {
            value,
            onChange: (_, newValue) => {
              console.log(newValue);
              setValue(newValue);
            },
            showLabels: true,
            sx: {
              gap: isMobile ? 0 : 12,
              "& .Mui-selected": {
                color: "#1a5da6"
              }
            },
            children: [
              /* @__PURE__ */ jsx(StyledBottomNavigationAction, { label: "Home", icon: /* @__PURE__ */ jsx(Home, {}) }),
              /* @__PURE__ */ jsx(
                StyledBottomNavigationAction,
                {
                  label: "Community",
                  icon: /* @__PURE__ */ jsx(People, {})
                }
              ),
              /* @__PURE__ */ jsx(
                StyledBottomNavigationAction,
                {
                  label: "Timeline",
                  icon: /* @__PURE__ */ jsx(Timeline, {})
                }
              ),
              /* @__PURE__ */ jsx(
                StyledBottomNavigationAction,
                {
                  label: "Explore",
                  icon: /* @__PURE__ */ jsx(Explore, {})
                }
              )
            ]
          }
        )
      ]
    }
  ) });
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
          p: 2,
          background: "#f5f5f5"
          // subtle background for contrast
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
lazy(() => import("./Home-aoWihwri.js"));
const TrainPiano = lazy(() => import("./TrainPiano-BY64VzeD.js"));
const OnboardingPage = lazy(() => import("./OnBoarding-DsOGqXSJ.js"));
const AdvicePage = lazy(() => import("./AdvicePage-GELi558g.js"));
const TutorialPage = lazy(() => import("./TutorialPage-AcpgWSIE.js"));
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
  if (isMobile) {
    return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx(ThemeProvider$1, { theme, children: /* @__PURE__ */ jsx(UserProvider, { children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(OnboardingPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/home", element: /* @__PURE__ */ jsx(HomeSpace, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/advice", element: /* @__PURE__ */ jsx(AdvicePage, { isMobile: true }) }),
      /* @__PURE__ */ jsx(Route, { path: "/tutorial", element: /* @__PURE__ */ jsx(TutorialPage, { isMobile: true }) }),
      /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(InformationPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/dailychallenge", element: /* @__PURE__ */ jsx(PianoMasteryChallenge, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/learnsong", element: /* @__PURE__ */ jsx(SongLearningPage, {}) })
    ] }) }) }) });
  }
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx(ThemeProvider$1, { theme, children: /* @__PURE__ */ jsx(UserProvider, { children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(OnboardingPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/home", element: /* @__PURE__ */ jsx(HomeSpace, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/advice", element: /* @__PURE__ */ jsx(AdvicePage, { isMobile: false }) }),
    /* @__PURE__ */ jsx(
      Route,
      {
        path: "/tutorial",
        element: /* @__PURE__ */ jsx(TutorialPage, { isMobile: false })
      }
    ),
    /* @__PURE__ */ jsx(Route, { path: "/trainpiano", element: /* @__PURE__ */ jsx(TrainPiano, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(InformationPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/dailychallenge", element: /* @__PURE__ */ jsx(PianoMasteryChallenge, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/learnsong", element: /* @__PURE__ */ jsx(SongLearningPage, {}) })
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
