import { useState, useEffect, useRef, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Link,
} from "@mui/material";
import { useUser } from "../utils/UserProvider";
import { useNavigate } from "react-router-dom";
import HeroContent from "../contents/HeroContent";
import PractiseSessionOnaiContent from "../contents/PractiseSessionOnaiContent";
import PractiseSessionSongFormContent from "../contents/PractiseSessionSongFormContent";

/**
 * User has this informations :
 *
 * user.currentSong :
 * description (string)
 * timeSpent (number)
 * title (string)
 * totalTime (number)
 * trainingSessions (number)
 * measuresNumber (number)
 *
 *
 * Scenario of learning :
 *
 * The pianist is new and he will start a new training
 *
 * Onai will ask him to fill some infos by loading a form and getting the data
 *
 * The first message will be
 * Welcome to the practice session, I'll guide you step by step until you master your song, before, I'll need you to give me some infos about your song .. and a button "Ready ?"
 *
 *
 * Then the form appears
 *
 *
 *
 *
 *
 *
 */

// Utility to format seconds into MM:SS
const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
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

  console.log("user is ", user);

  const [errorMsg, setErrorMsg] = useState("");

  // Logic of the form
  const [isFormDisplayed, setDisplayForm] = useState(false);
  const [formFilled, setFormFilled] = useState(false);

  // Set up song-related constants.
  // Assume 4 measures per minute. Adjust as needed.

  const totalMinutes = currentSong?.totalTime || 3;

  const totalMeasures = totalMinutes * 4;

  console.log("totalMeasures are ", totalMeasures);

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
        <Typography align="center" variant="h4">
          {"Practice Session with Onai"}
        </Typography>
        {/* Header */}
        <HeroContent>
          <PractiseSessionOnaiContent
            currentSong={user.currentSong}
            isFormDisplayed={isFormDisplayed}
            setDisplayForm={setDisplayForm}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
            formFilled={formFilled}
          />
        </HeroContent>
        {!user.currentSong && isFormDisplayed && (
          <PractiseSessionSongFormContent
            onSubmit={(data) => {
              console.log("data are ", data);
              setDisplayForm(false);
              setFormFilled(true);
              updateSongTraining(0, false, {
                title: data.songName,
                measuresNumber: data.measuresNumber,
              });
            }}
          />
        )}
        {user.currentSong && (
          <>
            {/* Card 1: Song Overview */}
            <Card
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <CardContent>
                <Typography
                  color="primary"
                  fontWeight="bold"
                  variant="h5"
                  gutterBottom
                >
                  {currentSong ? currentSong.title : "No Song Selected"}
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
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="body1">
                  Progress: {measuresLearned} / {totalMeasures} measures learned
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progressPercent}
                  sx={{ height: 10, borderRadius: 5, my: 1 }}
                />
                <Typography variant="body2" color="textSecondary">
                  Time spent on training:{" "}
                  {currentSong ? currentSong.timeSpent : 0} min
                </Typography>
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
                  sx={{
                    mt: 2,
                    p: 1,
                    border: "1px dashed #ccc",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1">{adviceText}</Typography>
                </Box>
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SongLearningPage;
