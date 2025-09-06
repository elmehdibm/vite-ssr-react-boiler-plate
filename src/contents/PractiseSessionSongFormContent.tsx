import {
  Button,
  Card,
  FormControl,
  TextField,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";

type SongForm = {
  songName: string;
  measuresNumber: number;
  targetTempo?: number;
  keySignature?: string;
  timeSignature?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  youtubeLink?: string;
  remarks?: string;
};

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

export default function PractiseSessionSongFormContent({
  onSubmit,
}: {
  onSubmit: (data: SongForm) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SongForm>({
    defaultValues: {
      difficulty: "beginner",
      targetTempo: 120,
      timeSignature: "4/4",
      keySignature: "C major",
    },
  });

  const difficulty = watch("difficulty");

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 2,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom color="primary">
        Tell me about your song
      </Typography>

      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Provide some basic information about the piece you want to practice.
        This will help me create a personalized learning plan for you.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Basic Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Basic Information
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Song Title *"
              {...register("songName", { required: "Song name is required" })}
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
                min: { value: 1, message: "Must be at least 1 measure" },
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
        </Box>

        {/* Musical Details */}
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
                errors.targetTempo?.message || "The tempo you want to achieve"
              }
              placeholder="120"
            />
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              select
              label="Time Signature"
              {...register("timeSignature")}
              helperText="The piece's time signature"
            >
              {TIME_SIGNATURES.map((sig) => (
                <MenuItem key={sig} value={sig}>
                  {sig}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              select
              label="Key Signature"
              {...register("keySignature")}
              helperText="The key the piece is written in"
            >
              {KEY_SIGNATURES.map((key) => (
                <MenuItem key={key} value={key}>
                  {key}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Box>

        {/* Additional Resources */}
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
                    /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
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

        {/* Dynamic Learning Plan Preview */}
        {difficulty && (
          <Box sx={{ mb: 3, p: 2, bgcolor: "primary.50", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              📚 Your Learning Plan Preview
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

        <FormControl fullWidth>
          <Button
            variant="contained"
            type="submit"
            size="large"
            sx={{ py: 1.5 }}
          >
            🎹 Start My Practice Session!
          </Button>
        </FormControl>
      </form>
    </Card>
  );
}
