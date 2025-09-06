import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  ExpandMore,
  PlayArrow,
  Pause,
  Timer,
  Speed,
} from "@mui/icons-material";

// Extended measure data structure
export interface MeasureProgress {
  measureNumber: number;
  leftHandComplete: boolean;
  rightHandComplete: boolean;
  currentTempo: number;
  targetTempo: number;
  practiceAttempts: number;
  userNotes: string;
  lastPracticed?: Date;
  difficulty: "easy" | "medium" | "hard" | "very_hard";
  timeSpent: number; // in seconds
}

export interface PerformanceAttempt {
  id: string;
  timestamp: Date;
  completedMeasures: number;
  totalMeasures: number;
  averageTempo: number;
  notes: string;
}

interface ProgressViewProps {
  songTitle: string;
  totalMeasures: number;
  targetTempo: number;
  sessionTimeSpent: number;
  initialMeasuresProgress?: MeasureProgress[];
  initialPerformanceAttempts?: PerformanceAttempt[];
  onProgressUpdate: (data: {
    measuresProgress: MeasureProgress[];
    timeSpent: number;
  }) => void;
  onPerformanceAttempt: (
    attempt: Omit<PerformanceAttempt, "id" | "timestamp">
  ) => void;
  onSessionComplete: () => void;
}

const ProgressView: React.FC<ProgressViewProps> = ({
  songTitle,
  totalMeasures,
  targetTempo,
  sessionTimeSpent,
  initialMeasuresProgress,
  initialPerformanceAttempts,
  onProgressUpdate,
  onPerformanceAttempt,
  onSessionComplete,
}) => {
  // Initialize or use provided measures progress
  const [measuresProgress, setMeasuresProgress] = useState<MeasureProgress[]>(
    () =>
      initialMeasuresProgress ||
      Array.from({ length: totalMeasures }, (_, index) => ({
        measureNumber: index + 1,
        leftHandComplete: false,
        rightHandComplete: false,
        currentTempo: Math.round(targetTempo * 0.6), // Start at 60% of target
        targetTempo,
        practiceAttempts: 0,
        userNotes: "",
        difficulty: "medium" as const,
        timeSpent: 0,
      }))
  );

  const [performanceAttempts, setPerformanceAttempts] = useState<
    PerformanceAttempt[]
  >(initialPerformanceAttempts || []);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentMeasureTimer, setCurrentMeasureTimer] = useState<number | null>(
    null
  );
  const [measureTimerSeconds, setMeasureTimerSeconds] = useState(0);
  const [performanceDialogOpen, setPerformanceDialogOpen] = useState(false);
  const [performanceNotes, setPerformanceNotes] = useState("");
  const [sessionTimeAccumulator, setSessionTimeAccumulator] = useState(0);

  // Timer effect for individual measure practice
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && currentMeasureTimer !== null) {
      interval = setInterval(() => {
        setMeasureTimerSeconds((prev) => prev + 1);
        setSessionTimeAccumulator((prev) => prev + 1);

        // Update time spent for current measure
        setMeasuresProgress((prevMeasures) => {
          const newMeasures = prevMeasures.map((measure) =>
            measure.measureNumber === currentMeasureTimer + 1
              ? { ...measure, timeSpent: measure.timeSpent + 1 }
              : measure
          );

          // Trigger progress update callback
          onProgressUpdate({
            measuresProgress: newMeasures,
            timeSpent: 1, // Increment by 1 second
          });

          return newMeasures;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, currentMeasureTimer, onProgressUpdate]);

  // Calculate overall progress
  const completedMeasures = measuresProgress.filter(
    (m) => m.leftHandComplete && m.rightHandComplete
  ).length;
  const overallProgress = (completedMeasures / totalMeasures) * 100;
  const averageTempo =
    measuresProgress.reduce((sum, m) => sum + m.currentTempo, 0) /
    totalMeasures;
  const totalPracticeTime =
    measuresProgress.reduce((sum, m) => sum + m.timeSpent, 0) +
    sessionTimeSpent;

  const updateMeasureProgress = (
    measureNumber: number,
    updates: Partial<MeasureProgress>
  ) => {
    setMeasuresProgress((prev) => {
      const newMeasures = prev.map((measure) =>
        measure.measureNumber === measureNumber
          ? { ...measure, ...updates, lastPracticed: new Date() }
          : measure
      );

      // Trigger progress update callback
      onProgressUpdate({
        measuresProgress: newMeasures,
        timeSpent: 0, // No additional time for simple updates
      });

      return newMeasures;
    });
  };

  const startMeasurePractice = (measureIndex: number) => {
    // Stop any existing timer first
    if (isTimerRunning) {
      stopMeasurePractice();
    }

    setCurrentMeasureTimer(measureIndex);
    setMeasureTimerSeconds(0);
    setIsTimerRunning(true);

    // Increment practice attempts
    updateMeasureProgress(measureIndex + 1, {
      practiceAttempts: measuresProgress[measureIndex].practiceAttempts + 1,
    });
  };

  const stopMeasurePractice = () => {
    setIsTimerRunning(false);
    setCurrentMeasureTimer(null);
    setMeasureTimerSeconds(0);
  };

  const handlePerformanceAttempt = () => {
    const attempt: Omit<PerformanceAttempt, "id" | "timestamp"> = {
      completedMeasures,
      totalMeasures,
      averageTempo: Math.round(averageTempo),
      notes: performanceNotes,
    };

    const newAttempt: PerformanceAttempt = {
      ...attempt,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setPerformanceAttempts((prev) => [...prev, newAttempt]);
    onPerformanceAttempt(attempt);
    setPerformanceDialogOpen(false);
    setPerformanceNotes("");

    // Check if session should be considered complete
    if (completedMeasures === totalMeasures) {
      onSessionComplete();
    }
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getHandStatus = (leftComplete: boolean, rightComplete: boolean) => {
    if (leftComplete && rightComplete)
      return { text: "Both Complete", color: "success" };
    if (leftComplete || rightComplete)
      return { text: "Partial", color: "warning" };
    return { text: "Not Started", color: "default" };
  };

  return (
    <Card>
      <CardContent>
        {/* Header with overall stats */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h6">Practice Progress</Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Chip
              icon={<Timer />}
              label={formatTime(totalPracticeTime)}
              variant="outlined"
              color="primary"
            />
            <Chip
              icon={<Speed />}
              label={`${Math.round(averageTempo)} BPM`}
              variant="outlined"
              color="secondary"
            />
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={() => setPerformanceDialogOpen(true)}
              size="small"
            >
              Full Performance
            </Button>
          </Box>
        </Box>

        {/* Overall progress bar */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2">Overall Progress</Typography>
            <Typography variant="body2">
              {completedMeasures}/{totalMeasures} measures
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={overallProgress}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        {/* Performance attempts summary */}
        {performanceAttempts.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Performance Attempts ({performanceAttempts.length})
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {performanceAttempts.slice(-3).map((attempt) => (
                <Chip
                  key={attempt.id}
                  size="small"
                  label={`${Math.round(
                    (attempt.completedMeasures / attempt.totalMeasures) * 100
                  )}%`}
                  color={
                    attempt.completedMeasures === attempt.totalMeasures
                      ? "success"
                      : "default"
                  }
                  title={`${attempt.completedMeasures}/${
                    attempt.totalMeasures
                  } measures - ${attempt.notes || "No notes"}`}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Measures grid */}
        <Typography variant="subtitle2" gutterBottom>
          Individual Measures
        </Typography>

        <Grid container spacing={1}>
          {measuresProgress.map((measure, index) => {
            const handStatus = getHandStatus(
              measure.leftHandComplete,
              measure.rightHandComplete
            );
            const isCurrentlyPracticing = currentMeasureTimer === index;

            return (
              <Grid item xs={12} sm={6} md={4} key={measure.measureNumber}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        gap: 1,
                      }}
                    >
                      <Badge
                        badgeContent={measure.practiceAttempts}
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        <Typography variant="body2" fontWeight="bold">
                          M{measure.measureNumber}
                        </Typography>
                      </Badge>

                      <Chip
                        size="small"
                        label={handStatus.text}
                        color={handStatus.color as any}
                        sx={{ minWidth: 80 }}
                      />

                      <Box sx={{ flexGrow: 1 }} />

                      {isCurrentlyPracticing && (
                        <Chip
                          size="small"
                          icon={<Timer />}
                          label={formatTime(measureTimerSeconds)}
                          color="primary"
                        />
                      )}
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      {/* Hand completion toggles */}
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant={
                            measure.leftHandComplete ? "contained" : "outlined"
                          }
                          onClick={() =>
                            updateMeasureProgress(measure.measureNumber, {
                              leftHandComplete: !measure.leftHandComplete,
                            })
                          }
                        >
                          Left Hand
                        </Button>
                        <Button
                          size="small"
                          variant={
                            measure.rightHandComplete ? "contained" : "outlined"
                          }
                          onClick={() =>
                            updateMeasureProgress(measure.measureNumber, {
                              rightHandComplete: !measure.rightHandComplete,
                            })
                          }
                        >
                          Right Hand
                        </Button>
                      </Box>

                      {/* Tempo control */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Typography variant="caption" sx={{ minWidth: 50 }}>
                          Tempo:
                        </Typography>
                        <TextField
                          type="number"
                          size="small"
                          value={measure.currentTempo}
                          onChange={(e) =>
                            updateMeasureProgress(measure.measureNumber, {
                              currentTempo: parseInt(e.target.value) || 0,
                            })
                          }
                          inputProps={{ min: 40, max: 200, step: 5 }}
                          sx={{ width: 80 }}
                        />
                        <Typography variant="caption">
                          /{targetTempo} BPM
                        </Typography>
                      </Box>

                      {/* Difficulty selector */}
                      <FormControl size="small" fullWidth>
                        <InputLabel>Difficulty</InputLabel>
                        <Select
                          value={measure.difficulty}
                          label="Difficulty"
                          onChange={(e) =>
                            updateMeasureProgress(measure.measureNumber, {
                              difficulty: e.target.value as any,
                            })
                          }
                        >
                          <MenuItem value="easy">Easy</MenuItem>
                          <MenuItem value="medium">Medium</MenuItem>
                          <MenuItem value="hard">Hard</MenuItem>
                          <MenuItem value="very_hard">Very Hard</MenuItem>
                        </Select>
                      </FormControl>

                      {/* Practice timer controls */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {!isCurrentlyPracticing ? (
                          <Button
                            size="small"
                            startIcon={<PlayArrow />}
                            onClick={() => startMeasurePractice(index)}
                            disabled={isTimerRunning}
                          >
                            Practice
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            startIcon={<Pause />}
                            onClick={stopMeasurePractice}
                            color="secondary"
                          >
                            Stop
                          </Button>
                        )}
                        <Typography variant="caption">
                          Total: {formatTime(measure.timeSpent)}
                        </Typography>
                      </Box>

                      {/* Notes */}
                      <TextField
                        size="small"
                        multiline
                        rows={2}
                        placeholder="Notes about this measure..."
                        value={measure.userNotes}
                        onChange={(e) =>
                          updateMeasureProgress(measure.measureNumber, {
                            userNotes: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            );
          })}
        </Grid>

        {/* Session complete button */}
        {completedMeasures === totalMeasures && (
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button
              variant="contained"
              size="large"
              onClick={onSessionComplete}
              sx={{ bgcolor: "success.main" }}
            >
              Mark Session Complete!
            </Button>
          </Box>
        )}
      </CardContent>

      {/* Performance attempt dialog */}
      <Dialog
        open={performanceDialogOpen}
        onClose={() => setPerformanceDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Full Performance Attempt</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Record a full performance attempt. This helps track your overall
            progress and readiness to perform the complete piece.
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              Current Progress: {completedMeasures}/{totalMeasures} measures
              ready
            </Typography>
            <LinearProgress
              variant="determinate"
              value={overallProgress}
              sx={{ mt: 1, height: 6 }}
            />
          </Box>

          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="How did the performance go? Any specific challenges or successes?"
            value={performanceNotes}
            onChange={(e) => setPerformanceNotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPerformanceDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handlePerformanceAttempt} variant="contained">
            Record Attempt
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProgressView;
