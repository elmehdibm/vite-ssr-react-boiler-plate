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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import CloseIcon from "@mui/icons-material/Close";

// Utility: map note letters to solfege labels when needed
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
  const {
    user,
    updateCurrentLevel,
    toggleNotation,
    recordExerciseSession,
    challengeLevels,
  } = useUser();

  // Local state variables
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [roundCount, setRoundCount] = useState<number>(0);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [exerciseStarted, setExerciseStarted] = useState<boolean>(false);
  const [congratsOpen, setCongratsOpen] = useState<boolean>(false);

  // Manage clef based on active level: Level 1 => treble, Level 2 => bass
  const [clef, setClef] = useState<"treble" | "bass">("treble");
  useEffect(() => {
    if (user.currentLevel === 1) {
      setClef("treble");
    } else if (user.currentLevel === 2) {
      setClef("bass");
    }
  }, [user.currentLevel]);

  // VexFlow staff rendering
  const staffRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<any>(null);

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
          clef,
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

  // For revision levels, generate a single note
  const generateSequence = () => {
    const available = ["c", "d", "e", "f", "g", "a", "b"];
    const seq = [available[Math.floor(Math.random() * available.length)]];
    setCurrentSequence(seq);
    setCurrentIndex(0);
  };

  // Handle piano key press
  const handleKeyPress = (midiNumber: number) => {
    if (!exerciseStarted) return;
    const attributes = MidiNumbers.getAttributes(midiNumber);
    const pressed = attributes.note.replace(/[0-9]/g, "").toLowerCase();
    const target = currentSequence[currentIndex];
    if (pressed === target) {
      setSessionScore((prev) => prev + 10);
      // Complete the round and generate a new note
      setRoundCount((prev) => prev + 1);
      if (roundCount + 1 >= 20) {
        recordExerciseSession(sessionScore + 10, 20);
        setCongratsOpen(true);
        setExerciseStarted(false);
      } else {
        setTimeout(() => generateSequence(), 1000);
      }
    } else {
      // Deduct points for a wrong key press (score never goes below 0)
      setSessionScore((prev) => Math.max(0, prev - 2));
    }
  };

  // Start a new exercise session
  const startExercise = () => {
    setExerciseStarted(true);
    setSessionScore(0);
    setRoundCount(0);
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

  // Render note label on piano keys
  const renderNoteLabel = ({ midiNumber }: { midiNumber: number }) => {
    const attributes = MidiNumbers.getAttributes(midiNumber);
    const baseLabel = attributes.note.replace(/[0-9]/g, "").toLowerCase();
    const label = getNoteLabel(baseLabel, user.notation);
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
      {/* Header: Notation toggle and History button */}
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
          <HistoryIcon />
        </IconButton>
      </Box>

      {/* Dashboard: Level title and current score */}
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
          sx={{
            backgroundColor: "#fff",
            p: 2,
            borderRadius: 2,
            boxShadow: 1,
          }}
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
            noteRange={{
              first: MidiNumbers.fromNote(clef === "treble" ? "c4" : "c2"),
              last: MidiNumbers.fromNote(clef === "treble" ? "b4" : "b2"),
            }}
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

      {/* Action Area: Start Exercise / Progress display */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        {!exerciseStarted ? (
          <Button
            variant="contained"
            color="primary"
            onClick={startExercise}
            disabled={
              !challengeLevels.find((l) => l.level === user.currentLevel)
                ?.enabled
            }
            sx={{ px: 4, py: 1 }}
          >
            Start Exercise
          </Button>
        ) : (
          <Typography variant="subtitle1">
            Round {roundCount + 1} - Note {currentIndex + 1} of{" "}
            {currentSequence.length}
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
                disabled={!lvl.enabled}
              >
                <ListItemText
                  primary={`${lvl.title} (Level ${lvl.level})`}
                  secondary={lvl.description}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Congratulations Dialog */}
      <Dialog open={congratsOpen} onClose={() => setCongratsOpen(false)}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContent>
          <Typography>
            You have completed the exercise session with a total score of{" "}
            {sessionScore}!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCongratsOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PianoMasteryChallenge;
