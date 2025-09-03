import { Button, Typography } from "@mui/material";
import { Song } from "../utils/UserProvider";

const PractiseSessionOnaiContent = ({
  currentSong,
  isFormDisplayed,
  setDisplayForm,
  errorMsg,
  setErrorMsg,
  formFilled,
}: {
  currentSong: Song | undefined;
  isFormDisplayed: boolean;
  setDisplayForm: (value: boolean) => void;
  errorMsg: string;
  setErrorMsg: (value: string) => void;
  formFilled: boolean;
}) => {
  console.log("currentSong ", currentSong);
  if (errorMsg) {
    return (
      <>
        <Typography variant="body1" color="warning" sx={{ fontSize: "1.1rem" }}>
          {errorMsg}
        </Typography>
        <Button
          variant="contained"
          type="button"
          color="warning"
          onClick={() => {
            setErrorMsg("");
          }}
        >
          {"Ok"}
        </Button>
      </>
    );
  }
  // First Messages when the user has no current song and the form is not displayed
  if (!currentSong && !formFilled && !isFormDisplayed) {
    return (
      <>
        <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
          {
            "Welcome to the practice session, I'll guide you step by step until you master your song, before, I'll need you to give me some infos about your song .."
          }
        </Typography>
        <br />
        <Button
          variant="contained"
          type="button"
          onClick={() => {
            setDisplayForm(true);
          }}
        >
          {"Ready ?"}
        </Button>
      </>
    );
  }
  if (isFormDisplayed && !currentSong) {
    return (
      <>
        <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
          {"Fill the form to start your practice session !"}
        </Typography>
      </>
    );
  }
  // Message when the form is filled
  if (formFilled) {
    return (
      <>
        <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
          {
            "Great ! You are now ready to start your practice session, follow the instructions and you'll be playing your song in no time !"
          }
        </Typography>
      </>
    );
  }
  return <>Default Mode</>;
};

export default PractiseSessionOnaiContent;
