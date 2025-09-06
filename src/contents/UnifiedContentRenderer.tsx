import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import HeroContent from "./HeroContent";

// Import types from the enhanced learning system
interface Action {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  options?: any;
  validation?: (value: any) => boolean | string;
}

interface LearningStep {
  id: string;
  title: string;
  description: string;
  type: "setup" | "instruction" | "practice" | "validation" | "feedback";
  required: boolean;
  estimatedDuration?: number;
  prerequisites?: string[];
  options?: any[];
  onaiGuidance?: string;
}

interface StepContext {
  stepId: string;
  scenario: string;
  songData: any;
  userPreferences: any;
  sessionData: {
    timeSpent: number;
    measuresCompleted: boolean[];
    currentStep: string;
    stepData: Record<string, any>;
    progressData: {
      measuresProgress: any[];
      performanceAttempts: any[];
      sessionCompleted: boolean;
    };
  };
}

interface UnifiedContentRendererProps {
  step: LearningStep;
  context: StepContext;
  actions: Action[];
  onAction: (actionId: string, value: any) => void;
  onStepComplete: (stepId: string, data?: any) => void;
  onStepSkip: (stepId: string) => void;
  errorMsg?: string;
  onErrorDismiss?: () => void;
}

// Time signatures and key signatures for form
const TIME_SIGNATURES = [
  "4/4",
  "3/4",
  "2/4",
  "6/8",
  "9/8",
  "12/8",
  "2/2",
  "3/8",
];

const KEY_SIGNATURES = [
  "C major",
  "G major",
  "D major",
  "A major",
  "E major",
  "B major",
  "F# major",
  "C# major",
  "F major",
  "Bb major",
  "Eb major",
  "Ab major",
  "Db major",
  "Gb major",
  "Cb major",
  "A minor",
  "E minor",
  "B minor",
  "F# minor",
  "C# minor",
  "G# minor",
  "D# minor",
  "A# minor",
  "D minor",
  "G minor",
  "C minor",
  "F minor",
  "Bb minor",
  "Eb minor",
  "Ab minor",
];

const UnifiedContentRenderer: React.FC<UnifiedContentRendererProps> = ({
  step,
  context,
  actions,
  onAction,
  onStepComplete,
  onStepSkip,
  errorMsg,
  onErrorDismiss,
}) => {
  const [actionValues, setActionValues] = useState<Record<string, any>>({});

  // Form handling for song form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      difficulty: "beginner",
      targetTempo: 120,
      timeSignature: "4/4",
      keySignature: "C major",
    },
  });

  const difficulty = watch("difficulty");

  const handleActionChange = (actionId: string, value: any) => {
    setActionValues((prev) => ({ ...prev, [actionId]: value }));
    onAction(actionId, value);
  };

  const handleFormSubmit = (formData: any) => {
    handleActionChange("song_form", formData);
    onStepComplete(step.id, { formData });
  };

  // Render Onai's guidance section
  const renderOnaiGuidance = () => {
    if (errorMsg) {
      return (
        <Alert
          severity="warning"
          action={
            <Button color="inherit" size="small" onClick={onErrorDismiss}>
              OK
            </Button>
          }
          sx={{ mb: 2 }}
        >
          {errorMsg}
        </Alert>
      );
    }

    if (step.onaiGuidance) {
      return (
        <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
          {step.onaiGuidance}
        </Typography>
      );
    }

    return null;
  };

  // Render hero content actions (buttons)
  const renderHeroContentAction = (action: Action) => {
    switch (action.type) {
      case "button":
        return (
          <Button
            key={action.id}
            variant={
              action.id.includes("ready") || action.id.includes("complete")
                ? "contained"
                : "outlined"
            }
            color={action.id.includes("skip") ? "secondary" : "primary"}
            onClick={() => {
              handleActionChange(action.id, true);
              if (
                action.id.includes("ready") ||
                action.id.includes("complete")
              ) {
                onStepComplete(step.id);
              } else if (action.id.includes("skip")) {
                onStepSkip(step.id);
              }
            }}
            sx={{ m: 1 }}
            size="large"
          >
            {action.label}
          </Button>
        );
      default:
        return <></>;
    }
  };

  // Render content actions (forms, inputs, etc.)
  const renderContentAction = (action: Action) => {
    const currentValue = actionValues[action.id];

    switch (action.type) {
      case "form":
        return (
          <Card key={action.id} sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Tell me about your song
              </Typography>

              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                Provide some basic information about the piece you want to
                practice. This will help me create a personalized learning plan
                for you.
              </Typography>

              <form onSubmit={handleSubmit(handleFormSubmit)}>
                {/* Basic Information Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Basic Information
                  </Typography>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      label="Song Title *"
                      {...register("songName", {
                        required: "Song name is required",
                      })}
                      error={!!errors.songName}
                      helperText={errors.songName?.message}
                      placeholder="e.g., Für Elise, Moonlight Sonata, etc."
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      type="number"
                      label="Number of Measures *"
                      {...register("measuresNumber", {
                        required: "Number of measures is required",
                        min: {
                          value: 1,
                          message: "Must be at least 1 measure",
                        },
                        max: { value: 500, message: "Maximum 500 measures" },
                      })}
                      error={!!errors.measuresNumber}
                      helperText={
                        errors.measuresNumber?.message ||
                        "How many measures does the piece have?"
                      }
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      select
                      label="Your Playing Level"
                      {...register("difficulty")}
                      helperText="This helps me adjust the learning approach"
                    >
                      <MenuItem value="beginner">
                        Beginner - New to piano or this type of piece
                      </MenuItem>
                      <MenuItem value="intermediate">
                        Intermediate - Comfortable with basic techniques
                      </MenuItem>
                      <MenuItem value="advanced">
                        Advanced - Experienced player
                      </MenuItem>
                    </TextField>
                  </FormControl>

                  {/* Learning Plan Preview */}
                  {difficulty && (
                    <Box
                      sx={{
                        mb: 3,
                        p: 2,
                        bgcolor: "info.50",
                        borderRadius: 1,
                        border: 1,
                        borderColor: "info.200",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        color="info.dark"
                        gutterBottom
                      >
                        Your Learning Plan Preview
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {difficulty === "beginner" &&
                          "I'll guide you through structured, step-by-step practice with hands-separate work, slow tempo building, and clear validation points."}
                        {difficulty === "intermediate" &&
                          "We'll focus on efficient problem-solving techniques, flexible practice approaches, and musical expression development."}
                        {difficulty === "advanced" &&
                          "I'll provide minimal guidance while focusing on artistic interpretation, advanced techniques, and performance preparation."}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Musical Details Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Musical Details (Optional)
                  </Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      type="number"
                      label="Target Tempo (BPM)"
                      {...register("targetTempo", {
                        min: { value: 40, message: "Minimum 40 BPM" },
                        max: { value: 200, message: "Maximum 200 BPM" },
                      })}
                      error={!!errors.targetTempo}
                      helperText={
                        errors.targetTempo?.message ||
                        "The tempo you want to achieve"
                      }
                      placeholder="120"
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      select
                      label="Key Signature"
                      {...register("keySignature")}
                    >
                      {KEY_SIGNATURES.map((key) => (
                        <MenuItem key={key} value={key}>
                          {key}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      select
                      label="Time Signature"
                      {...register("timeSignature")}
                    >
                      {TIME_SIGNATURES.map((sig) => (
                        <MenuItem key={sig} value={sig}>
                          {sig}
                        </MenuItem>
                      ))}
                    </TextField>
                  </FormControl>
                </Box>

                {/* Additional Resources Section */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Additional Resources
                  </Typography>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      label="YouTube Link"
                      {...register("youtubeLink", {
                        pattern: {
                          value:
                            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                          message: "Please enter a valid YouTube URL",
                        },
                      })}
                      error={!!errors.youtubeLink}
                      helperText={
                        errors.youtubeLink?.message ||
                        "Link to a performance or tutorial (optional)"
                      }
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                      multiline
                      rows={3}
                      label="Notes & Remarks"
                      {...register("remarks")}
                      helperText="Any specific challenges, goals, or notes about this piece"
                      placeholder="e.g., Struggling with the left hand in measures 12-16, want to focus on dynamics..."
                    />
                  </FormControl>
                </Box>

                <FormControl fullWidth>
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{ py: 1.5 }}
                  >
                    Start My Practice Session!
                  </Button>
                </FormControl>
              </form>
            </CardContent>
          </Card>
        );

      case "text_input":
        return (
          <Box key={action.id} sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              {action.label}
            </Typography>
            <TextField
              multiline={action.options?.multiline}
              rows={action.options?.multiline ? 4 : 1}
              fullWidth
              placeholder={action.options?.placeholder || ""}
              onChange={(e) => handleActionChange(action.id, e.target.value)}
              value={currentValue || ""}
              variant="outlined"
            />
          </Box>
        );

      case "number_input":
        return (
          <Box key={action.id} sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              {action.label}
            </Typography>
            <TextField
              type="number"
              fullWidth
              inputProps={{
                min: action.options?.min,
                max: action.options?.max,
                step: action.options?.step,
              }}
              onChange={(e) =>
                handleActionChange(action.id, parseInt(e.target.value))
              }
              value={currentValue || action.options?.default || ""}
              variant="outlined"
            />
          </Box>
        );

      case "select":
        return (
          <Box key={action.id} sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom>
              {action.label}
            </Typography>
            <TextField
              select
              fullWidth
              value={currentValue || ""}
              onChange={(e) => handleActionChange(action.id, e.target.value)}
              variant="outlined"
            >
              <MenuItem value="">Select an option...</MenuItem>
              {action.options?.choices?.map((choice: any) => (
                <MenuItem key={choice.value} value={choice.value}>
                  {choice.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        );

      case "checkbox":
        return (
          <Box key={action.id} sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={currentValue || false}
                  onChange={(e) =>
                    handleActionChange(action.id, e.target.checked)
                  }
                />
              }
              label={action.label}
            />
          </Box>
        );

      default:
        return <></>;
    }
  };

  return (
    <>
      <HeroContent>
        {/* Onai's Guidance Section */}
        {renderOnaiGuidance()}

        {/* Step metadata */}
        <Box sx={{ mb: 2 }}>
          {step.estimatedDuration && (
            <Typography variant="caption" color="textSecondary" sx={{ mr: 2 }}>
              ⏱️ Estimated: {step.estimatedDuration} min
            </Typography>
          )}
        </Box>

        {/* Step options */}
        {step.options && step.options.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              Options:
            </Typography>
            {step.options.map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    defaultChecked={option.default}
                    onChange={(e) =>
                      handleActionChange(
                        `option_${option.id}`,
                        e.target.checked
                      )
                    }
                  />
                }
                label={option.label}
              />
            ))}
          </Box>
        )}

        {/* Available actions - only buttons */}
        <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {actions.map(renderHeroContentAction)}
        </Box>
      </HeroContent>

      {/* Content actions - forms, inputs, etc. */}
      <CardContent>{actions.map(renderContentAction)}</CardContent>
    </>
  );
};

export default UnifiedContentRenderer;
