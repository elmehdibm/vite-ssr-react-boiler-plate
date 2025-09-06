import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Alert,
} from "@mui/material";
import { useUser } from "../utils/UserProvider";
import { useNavigate } from "react-router-dom";

// Import the enhanced learning system
import {
  EnhancedLearningSystemController,
  LearningSystemState,
  MeasureProgress,
  PerformanceAttempt,
} from "../data/practicePiano";

// Import the unified content renderer
import UnifiedContentRenderer from "../contents/UnifiedContentRenderer";

// Import the new ProgressView component
import ProgressView from "../contents/ProgressView";

// ==========================================
// UPDATED MAIN COMPONENT
// ==========================================

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const SongLearningPage: React.FC = () => {
  const { user, updateSongTraining } = useUser();
  const navigate = useNavigate();

  // Enhanced learning system state
  const [learningSystem, setLearningSystem] =
    useState<EnhancedLearningSystemController | null>(null);
  const [systemState, setSystemState] = useState<LearningSystemState | null>(
    null
  );

  // Error handling
  const [errorMsg, setErrorMsg] = useState("");

  // Session completion state
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Initialize enhanced learning system
  useEffect(() => {
    if (!learningSystem) {
      const system = new EnhancedLearningSystemController((newState) => {
        setSystemState({ ...newState });

        // If song data was added through form, update user context
        if (newState.context.songData && !user.currentSong) {
          updateSongTraining(0, false, newState.context.songData);
        }
      });

      setLearningSystem(system);
      setSystemState(system.getState());
    }
  }, [learningSystem, user.currentSong, updateSongTraining]);

  // Get current step and actions from learning system
  const currentStep = learningSystem?.getCurrentStep();
  const availableActions = learningSystem?.getAvailableActions() || [];
  const progress = learningSystem?.getProgress() || {
    current: 0,
    total: 1,
    percentage: 0,
  };

  // Session control functions
  const endSession = () => {
    if (learningSystem && systemState) {
      const minutesSpent = Math.round(
        systemState.context.sessionData.timeSpent / 60
      );
      console.log("Session ended. Time spent:", minutesSpent, "minutes");
      if (minutesSpent > 0) {
        updateSongTraining(minutesSpent, true);
      }
    }
    navigate("/home");
  };

  // Handle error dismissal
  const handleErrorDismiss = () => {
    setErrorMsg("");
  };

  // ProgressView handlers
  const handleProgressUpdate = (data: {
    measuresProgress: MeasureProgress[];
    timeSpent: number;
  }) => {
    if (learningSystem && systemState) {
      // Update the learning system with progress data
      learningSystem.handleAction("progress_update", data);
    }
  };

  const handlePerformanceAttempt = (
    attempt: Omit<PerformanceAttempt, "id" | "timestamp">
  ) => {
    console.log("Performance attempt recorded:", attempt);
    if (learningSystem) {
      learningSystem.handleAction("performance_attempt", attempt);
    }
  };

  const handleSessionComplete = () => {
    setSessionCompleted(true);
    if (learningSystem) {
      learningSystem.handleAction("session_complete", true);
    }
  };

  // Show loading state if system is not ready
  if (!learningSystem || !systemState || !currentStep) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">
          Initializing your practice session...
        </Typography>
      </Box>
    );
  }

  const isSetupPhase = systemState.currentScenario === "universal_start";
  const hasActiveSong = systemState.context.songData || user.currentSong;

  return (
    <Box sx={{ height: "100vh", overflowY: "auto", p: 2 }}>
      <Box
        sx={{
          maxWidth: 1400, // Increased width to accommodate progress view
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Page Title */}
        {systemState.context.songData?.title ||
        (user.currentSong?.title && !isSetupPhase && hasActiveSong) ? (
          <Box display="flex" justifyContent={"space-between"} mb={2}>
            <Box sx={{ flex: 1 }}>
              <Typography align="left" variant="h4" gutterBottom>
                {systemState.context.songData?.title || user.currentSong?.title}
              </Typography>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Learning Progress
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={progress.percentage}
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                />
                <Typography variant="body2" color="textSecondary">
                  Step {progress.current + 1} of {progress.total}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ textAlign: "right" }}>
              <Box>
                <Typography variant="h4" align="center">
                  {formatTime(systemState.context.sessionData.timeSpent)}
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                >
                  Session time
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={endSession}
                >
                  End Session
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Typography align="center" variant="h4" gutterBottom>
            Practice Session with Onai
          </Typography>
        )}

        {/* Main Content Area - Two Column Layout (only when song is active) */}
        {!isSetupPhase && hasActiveSong ? (
          <Box sx={{ display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" } }}>
            {/* Left Column - Learning Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {systemState.isActive && !sessionCompleted ? (
                <UnifiedContentRenderer
                  step={currentStep}
                  context={systemState.context}
                  actions={availableActions}
                  onAction={learningSystem.handleAction}
                  onStepComplete={learningSystem.completeStep}
                  onStepSkip={learningSystem.skipStep}
                  errorMsg={errorMsg}
                  onErrorDismiss={handleErrorDismiss}
                />
              ) : (
                /* Session Complete */
                <Card sx={{ p: 2 }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography variant="h5" color="primary" gutterBottom>
                      Congratulations!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      You've completed your practice session! Great work on "
                      {systemState.context.songData?.title ||
                        user.currentSong?.title}
                      ".
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mb: 2 }}
                    >
                      Session Summary:
                    </Typography>

                    <Box
                      sx={{
                        mb: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Typography variant="body2">
                        Time Practiced:{" "}
                        {formatTime(systemState.context.sessionData.timeSpent)}
                      </Typography>
                      <Typography variant="body2">
                        Steps Completed: {systemState.completedSteps.length}
                      </Typography>
                      <Typography variant="body2">
                        Measures Progress:{" "}
                        {
                          systemState.context.sessionData.measuresCompleted.filter(
                            Boolean
                          ).length
                        }{" "}
                        /{" "}
                        {
                          systemState.context.sessionData.measuresCompleted
                            .length
                        }
                      </Typography>
                      <Typography variant="body2">
                        Performance Attempts:{" "}
                        {
                          systemState.context.sessionData.progressData
                            .performanceAttempts.length
                        }
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={endSession}
                      size="large"
                    >
                      Finish & Save Progress
                    </Button>
                  </CardContent>
                </Card>
              )}
            </Box>

            {/* Right Column - Progress View (Always visible when song is active) */}
            <Box sx={{ flex: 1, minWidth: 400 }}>
              <ProgressView
                songTitle={
                  systemState.context.songData?.title ||
                  user.currentSong?.title ||
                  "Unknown Song"
                }
                totalMeasures={
                  systemState.context.songData?.measuresNumber || 12
                }
                targetTempo={systemState.context.songData?.targetTempo || 120}
                sessionTimeSpent={systemState.context.sessionData.timeSpent}
                initialMeasuresProgress={
                  systemState.context.sessionData.progressData.measuresProgress
                }
                initialPerformanceAttempts={
                  systemState.context.sessionData.progressData
                    .performanceAttempts
                }
                onProgressUpdate={handleProgressUpdate}
                onPerformanceAttempt={handlePerformanceAttempt}
                onSessionComplete={handleSessionComplete}
              />
            </Box>
          </Box>
        ) : (
          /* Setup Phase - Single Column */
          <Box sx={{ maxWidth: 800, mx: "auto" }}>
            {systemState.isActive ? (
              <UnifiedContentRenderer
                step={currentStep}
                context={systemState.context}
                actions={availableActions}
                onAction={learningSystem.handleAction}
                onStepComplete={learningSystem.completeStep}
                onStepSkip={learningSystem.skipStep}
                errorMsg={errorMsg}
                onErrorDismiss={handleErrorDismiss}
              />
            ) : (
              <Card sx={{ p: 2 }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h5" color="primary" gutterBottom>
                    Setup Complete!
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    Your practice session is ready to begin.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={endSession}
                    size="large"
                  >
                    Continue to Practice
                  </Button>
                </CardContent>
              </Card>
            )}
          </Box>
        )}

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === "development" && (
          <Card sx={{ p: 2, bgcolor: "grey.100" }}>
            <CardContent>
              <Typography variant="caption" gutterBottom>
                Debug Info:
              </Typography>
              <pre style={{ fontSize: "12px", overflow: "auto" }}>
                {JSON.stringify(
                  {
                    currentStep: currentStep?.id,
                    scenario: systemState.currentScenario,
                    completedSteps: systemState.completedSteps,
                    availableActions: availableActions.map((a) => a.id),
                    hasActiveSong: hasActiveSong,
                    isSetupPhase: isSetupPhase,
                    sessionCompleted: sessionCompleted,
                    progressData: systemState.context.sessionData.progressData,
                  },
                  null,
                  2
                )}
              </pre>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default SongLearningPage;
