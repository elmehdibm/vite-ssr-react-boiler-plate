import { Button, Card, FormControl, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

type SongForm = {
  songName: string;
  measuresNumber: number;
  youtubeLink?: string;
};

export default function PractiseSessionSongFormContent({
  onSubmit,
}: {
  onSubmit: (data: SongForm) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SongForm>();

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 2,
        alignItems: "center",
        flexWrap: "wrap",
        gap: 4,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl size="small" fullWidth>
          <TextField
            label="Song name"
            {...register("songName", { required: "Song name is required" })}
            error={!!errors.songName}
            helperText={errors.songName?.message}
            sx={{ marginBottom: "8px" }}
          />
        </FormControl>

        <FormControl size="small" fullWidth>
          <TextField
            type="number"
            label="Measures Number"
            {...register("measuresNumber", {
              required: "Measures number is required",
              min: { value: 2, message: "At least 2" },
            })}
            error={!!errors.measuresNumber}
            helperText={errors.measuresNumber?.message}
            sx={{ marginBottom: "8px" }}
          />
        </FormControl>

        <FormControl size="small" fullWidth>
          <TextField
            type="text"
            label="Youtube Link (optional)"
            {...register("youtubeLink")}
            sx={{ marginBottom: "8px" }}
          />
        </FormControl>

        <FormControl size="small" fullWidth>
          <Button variant="contained" type="submit">
            Start!
          </Button>
        </FormControl>
      </form>
    </Card>
  );
}
