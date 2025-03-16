import React, { useState, useEffect, useRef } from "react";
import { Vex, Stave, StaveNote, Accidental } from "vexflow";
import { Piano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./PianoNotesChallenge.css";
import { useUser } from "../utils/UserProvider";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  Switch,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";

// Utility: mapping note letters to solfege labels
const getNoteLabel = (note: string, notation: "anglo" | "solfege") => {
  if (notation === "anglo") return note.toUpperCase();
  const mapping: { [key: string]: string } = {
    c: "Do",
    d: "Re",
    e: "Mi",
    f: "Fa",
    g: "Sol",
    a: "La",
    b: "Ti",
  };
  return mapping[note] || note;
};

const PianoMasteryChallenge = () => {
  // Retrieve provider state and functions
  const {
    user,
    updateTimeSpent,
    updateCurrentLevel,
    toggleNotation,
    recordExerciseSession,
    challengeLevels,
  } = useUser();

  // Local exercise state
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [roundCount, setRoundCount] = useState<number>(0);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [exerciseStarted, setExerciseStarted] = useState<boolean>(false);
  const [lastKeyStatus, setLastKeyStatus] = useState<{
    midi: number;
    status: "correct" | "incorrect";
  } | null>(null);

  // Target rounds per session
  const targetRounds = 20;

  // Refs for VexFlow staff rendering
  const staffRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<any>(null);

  // Single octave ranges
  const noteRanges = {
    treble: {
      first: MidiNumbers.fromNote("c4"),
      last: MidiNumbers.fromNote("b4"),
    },
    bass: {
      first: MidiNumbers.fromNote("c2"),
      last: MidiNumbers.fromNote("b2"),
    },
  };

  // Local clef state with toggle function
  const [clef, setClef] = useState<"treble" | "bass">("treble");
  const toggleClef = () =>
    setClef((prev) => (prev === "treble" ? "bass" : "treble"));

  // Initialize VexFlow renderer and redraw staff on sequence change
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

  // Redraw staff with current sequence
  const redrawStaff = (sequence: string[]) => {
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
          clef: clef,
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

  // Generate a new sequence (length equals current level)
  const generateSequence = () => {
    const numNotes = user.currentLevel;
    const available = ["c", "d", "e", "f", "g", "a", "b"];
    const seq: string[] = [];
    for (let i = 0; i < numNotes; i++) {
      seq.push(available[Math.floor(Math.random() * available.length)]);
    }
    setCurrentSequence(seq);
    setCurrentIndex(0);
  };

  // Handle piano key press and check against the current sequence
  const handleKeyPress = (midiNumber: number) => {
    if (currentIndex >= currentSequence.length) return;
    const attributes = MidiNumbers.getAttributes(midiNumber);
    const pressed = attributes.note.replace(/[0-9]/g, "").toLowerCase();
    const target = currentSequence[currentIndex].toLowerCase();
    if (pressed === target) {
      setSessionScore((prev) => prev + 10);
      setLastKeyStatus({ midi: midiNumber, status: "correct" });
      setTimeout(() => setLastKeyStatus(null), 500);
      if (currentIndex === currentSequence.length - 1) {
        setRoundCount((prev) => prev + 1);
        if (roundCount + 1 >= targetRounds) {
          recordExerciseSession(sessionScore + 10, targetRounds);
          setExerciseStarted(false);
          setRoundCount(0);
          setSessionScore(0);
        } else {
          setTimeout(() => generateSequence(), 1000);
        }
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    } else {
      setSessionScore((prev) => Math.max(0, prev - 2));
      setLastKeyStatus({ midi: midiNumber, status: "incorrect" });
      setTimeout(() => setLastKeyStatus(null), 500);
    }
  };

  // Start a new exercise session
  const startExercise = () => {
    setExerciseStarted(true);
    setRoundCount(0);
    setSessionScore(0);
    generateSequence();
  };

  // Drawer state for level selection and history
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const toggleDrawer = (open: boolean) => setDrawerOpen(open);
  const handleLevelSelect = (level: number) => {
    updateCurrentLevel(level);
    toggleDrawer(false);
    if (exerciseStarted) generateSequence();
  };

  // Render note label on piano keys based on chosen notation with feedback coloring
  const renderNoteLabel = ({ midiNumber }: { midiNumber: number }) => {
    const attributes = MidiNumbers.getAttributes(midiNumber);
    const baseLabel = attributes.note.replace(/[0-9]/g, "").toLowerCase();
    const label = getNoteLabel(baseLabel, user.notation);
    const isFeedback =
      lastKeyStatus && lastKeyStatus.midi === midiNumber
        ? lastKeyStatus.status
        : null;
    return (
      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "0.85em",
          fontWeight: "bold",
          color: "#333",
          bgcolor:
            isFeedback === "correct"
              ? "#4caf50"
              : isFeedback === "incorrect"
              ? "#f44336"
              : "transparent",
          px: isFeedback ? 0.5 : 0,
          borderRadius: 1,
        }}
      >
        {label}
      </Box>
    );
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
      {/* Header: Notation switch and History button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ color: "#1a5da6", mr: 1 }}>
            {user.notation === "anglo" ? "Anglo-Saxon" : "Solfege"}
          </Typography>
          <Switch
            checked={user.notation === "solfege"}
            onChange={toggleNotation}
            color="default"
          />
        </Box>
        <IconButton
          onClick={() => toggleDrawer(true)}
          sx={{ color: "#1a5da6" }}
        >
          <HistoryIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Dashboard: Level Title and Score */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1a5da6" }}>
          Level {user.currentLevel}:{" "}
          {challengeLevels.find((l) => l.level === user.currentLevel)?.title}
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, color: "#1a5da6" }}>
          Score: {sessionScore}
        </Typography>
      </Box>

      {/* Partition (VexFlow Staff) */}
      <Box sx={{ mb: 2, textAlign: "center" }}>
        <Box
          ref={staffRef}
          sx={{ backgroundColor: "#fff", p: 2, borderRadius: 2, boxShadow: 1 }}
        />
      </Box>

      {/* Piano Board */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
          backgroundColor: "#f5f5f5",
          p: 2,
          borderRadius: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 600, height: 150 }}>
          <Piano
            noteRange={noteRanges[clef]}
            activeNotes={
              currentSequence.length > 0 &&
              currentIndex < currentSequence.length
                ? [
                    MidiNumbers.fromNote(
                      `${currentSequence[currentIndex]}${
                        clef === "treble" ? "4" : "2"
                      }`
                    ),
                  ]
                : []
            }
            playNote={() => {}}
            stopNote={() => {}}
            onPlayNoteInput={handleKeyPress}
            keyboardShortcuts={[]}
            renderNoteLabel={renderNoteLabel}
          />
        </Box>
      </Box>

      {/* Action Area: Start Exercise or Show Progress */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        {!exerciseStarted ? (
          <Button
            variant="contained"
            color="primary"
            onClick={startExercise}
            sx={{ px: 4, py: 1 }}
          >
            Start Exercise
          </Button>
        ) : (
          <Typography variant="subtitle1">
            Round {roundCount + 1} of {targetRounds} – Note {currentIndex + 1}{" "}
            of {currentSequence.length}
          </Typography>
        )}
      </Box>

      {/* Drawer for Level Selection and Exercise History */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ width: isMobile ? 250 : 300, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="h6">Select Level</Typography>
            <IconButton onClick={() => toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ my: 1 }} />
          <List>
            {challengeLevels.map((lvl) => (
              <ListItemButton
                key={lvl.level}
                onClick={() => handleLevelSelect(lvl.level)}
              >
                <ListItemText
                  primary={`${lvl.title} (Level ${lvl.level})`}
                  secondary={lvl.description}
                />
              </ListItemButton>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6" sx={{ mt: 1 }}>
            Exercise History
          </Typography>
          <List>
            {user.exerciseHistory?.length ? (
              user.exerciseHistory.map((item, idx) => (
                <ListItemButton key={idx}>
                  <ListItemText
                    primary={`Score: ${item.score} on ${item.date}`}
                    secondary={`Level ${item.level} – ${item.rounds} rounds`}
                  />
                </ListItemButton>
              ))
            ) : (
              <Typography variant="body2" sx={{ p: 1 }}>
                No history yet.
              </Typography>
            )}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default PianoMasteryChallenge;
