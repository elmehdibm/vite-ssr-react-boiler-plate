import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
  LinearProgress,
  Link,
} from "@mui/material";
import { useUser } from "../utils/UserProvider";
import { useNavigate } from "react-router-dom";

// Utility to format seconds into MM:SS
const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

// Create a basic beep sound using the Web Audio API.
const playBeep = () => {
  try {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = "sine";
    oscillator.frequency.value = 1000; // Hz
    oscillator.start();

    // Stop after 100ms
    gainNode.gain.exponentialRampToValueAtTime(
      0.00001,
      audioCtx.currentTime + 0.1
    );
    oscillator.stop(audioCtx.currentTime + 0.1);
  } catch (error) {
    console.error("Metronome error", error);
  }
};

// Helper: Compute dynamic advice text based on measures learned.
const getAdvice = (learnedCount: number, totalMeasures: number): string => {
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

const SongLearningPage: React.FC = () => {
  // Access data and functions from the context.
  const { user, updateSongTraining } = useUser();
  const navigate = useNavigate();

  const currentSong = user.currentSong;

  // Set up song-related constants.
  // Assume 4 measures per minute. Adjust as needed.
  const totalMinutes = currentSong ? currentSong.totalTime : 3;
  const totalMeasures = totalMinutes * 4;

  // --- Card 1 State: Metronome & Song Overview ---
  // Metronome state.
  const [metronomeOn, setMetronomeOn] = useState<boolean>(false);
  const [tempo, setTempo] = useState<number>(120); // BPM
  const metronomeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- Card 2 State: Session Timer ---
  const [sessionTime, setSessionTime] = useState<number>(
    user.currentSong?.timeSpent || 0
  );
  const [isTiming, setIsTiming] = useState<boolean>(false);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Card 3 State: Measures & Advice ---
  // Track if each measure has been validated.
  const [measures, setMeasures] = useState<boolean[]>(
    Array(totalMeasures).fill(false)
  );
  // Dynamic advice text that reacts to measure validation.
  const [adviceText, setAdviceText] = useState<string>(
    getAdvice(0, totalMeasures)
  );

  // --- Metronome Effect ---
  useEffect(() => {
    // If the metronome is turned on, set up an interval based on the selected tempo.
    if (metronomeOn) {
      // Calculate interval (ms) between beats.
      const intervalMs = (60 * 1000) / tempo;
      metronomeIntervalRef.current = setInterval(() => {
        playBeep();
      }, intervalMs);
    } else {
      // Ensure any running interval is cleared.
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
    }
    // Cleanup on tempo or switch change.
    return () => {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
    };
  }, [metronomeOn, tempo]);

  // --- Session Timer Functions ---
  const startSession = () => {
    if (!isTiming) {
      setIsTiming(true);
      sessionTimerRef.current = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
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
    // Convert seconds to minutes (rounded) for recording.
    const minutesSpent = Math.round(sessionTime / 60);
    console.log("Session ended. Time spent:", minutesSpent, "minutes");
    if (minutesSpent > 0) {
      updateSongTraining(minutesSpent, true);
    }
    navigate("/home");
  };

  // --- Measures / Learning Flow ---
  // Update advice text when a measure is toggled.
  const toggleMeasure = (index: number) => {
    setMeasures((prev) => {
      const newMeasures = prev.map((learned, i) =>
        i === index ? !learned : learned
      );
      const learnedCount = newMeasures.filter(Boolean).length;
      // If the user just validated a measure, add a congratulatory note.
      const newAdvice = newMeasures[index]
        ? `Congrats! Measure ${index + 1} validated. ${getAdvice(
            learnedCount,
            totalMeasures
          )}`
        : getAdvice(learnedCount, totalMeasures);
      setAdviceText(newAdvice);
      return newMeasures;
    });
  };

  const measuresLearned = measures.filter(Boolean).length;
  const progressPercent = (measuresLearned / totalMeasures) * 100;

  return (
    // Outer scrollable container: full viewport height with vertical scrolling
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        p: 2,
        background: "#f5f5f5", // subtle background for contrast
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* Header */}
        {/* Metronome Section at far right */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 200,
          }}
        >
          <Typography variant="subtitle1">Metronome</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={metronomeOn}
                onChange={() => setMetronomeOn((prev) => !prev)}
                color="primary"
              />
            }
            label={metronomeOn ? "On" : "Off"}
          />
          {metronomeOn && (
            <Box sx={{ mt: 1, textAlign: "center" }}>
              <TextField
                label="Tempo (BPM)"
                type="number"
                value={tempo}
                onChange={(e) => setTempo(Number(e.target.value))}
                size="small"
                sx={{ width: 120 }}
                InputLabelProps={{ shrink: true }}
              />
              <Typography variant="caption" display="block">
                {tempo} BPM
              </Typography>
            </Box>
          )}
        </Box>
        {/* Card 1: Song Overview and Metronome */}
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            alignItems: "center",
          }}
        >
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom>
              {currentSong ? currentSong.title : "No Song Selected"}
            </Typography>
            <Typography variant="body1">
              Progress: {measuresLearned} / {totalMeasures} measures learned
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progressPercent}
              sx={{ height: 10, borderRadius: 5, my: 1 }}
            />
            <Typography variant="body2" color="textSecondary">
              Time spent on training: {currentSong ? currentSong.timeSpent : 0}{" "}
              min
            </Typography>
          </CardContent>
        </Card>

        {/* Card 2: Session Timer and YouTube Link */}
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Practice Session
            </Typography>
            <Typography variant="h4" sx={{ my: 1 }}>
              {formatTime(sessionTime)}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={startSession}
                disabled={isTiming}
              >
                Start
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={pauseSession}
                disabled={!isTiming}
              >
                Pause
              </Button>
              <Button variant="text" color="secondary" onClick={endSession}>
                End Session
              </Button>
            </Box>
            <Box>
              <Link
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                underline="hover"
                color="primary"
              >
                Listen to the song on YouTube
              </Link>
            </Box>
          </CardContent>
        </Card>

        {/* Card 3: Learning Flow & Measures */}
        <Card sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Learning Flow
            </Typography>
            {/* Disabled Upload Button with note */}
            <Box sx={{ mb: 2 }}>
              <Button variant="contained" disabled>
                Upload Sheet / Music
              </Button>
              <Typography
                variant="caption"
                color="textSecondary"
                display="block"
              >
                This feature will be available later.
              </Typography>
            </Box>

            {/* Measures List */}
            <Grid container spacing={1}>
              {measures.map((learned, index) => (
                <Grid item xs={3} sm={1} key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={learned}
                        onChange={() => toggleMeasure(index)}
                        color="primary"
                      />
                    }
                    label={`M${index + 1}`}
                    labelPlacement="top"
                  />
                </Grid>
              ))}
            </Grid>

            {/* Dynamic Learning Advice */}
            <Box
              sx={{ mt: 2, p: 1, border: "1px dashed #ccc", borderRadius: 2 }}
            >
              <Typography variant="body1">{adviceText}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default SongLearningPage;
