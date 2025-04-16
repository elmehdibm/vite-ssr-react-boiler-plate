import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { Doughnut } from "react-chartjs-2";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PsychologyIcon from "@mui/icons-material/Psychology";
import WhatshotIcon from "@mui/icons-material/Whatshot"; // Icon for challenge
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // Icon for song learning
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useNavigate } from "react-router-dom";
import { useUser } from "../utils/UserProvider";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip);

// Styled component for each day box – filter out custom props.
const StyledDay = styled(Box, {
  shouldForwardProp: (prop) => prop !== "completed" && prop !== "active",
})(
  ({
    theme,
    completed,
    active,
  }: {
    theme: any;
    completed: boolean;
    active: boolean;
  }) => ({
    aspectRatio: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: completed ? theme.palette.primary.main : "#f0f0f0",
    color: completed ? "white" : "inherit",
    borderRadius: 8,
    fontWeight: 500,
    border: active ? `2px solid ${theme.palette.primary.main}` : "none",
    ...(active && { color: theme.palette.primary.main }),
  })
);

// Styled Card with updated colors and hover effects
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease",
  overflow: "hidden",
  border: "1px solid rgba(26, 93, 166, 0.1)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(26, 93, 166, 0.2)",
  },
}));

const StreakCount = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.primary.main,
  "@keyframes pulse": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.05)" },
    "100%": { transform: "scale(1)" },
  },
  animation: "pulse 2s infinite",
}));

const StyledActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  border: `2px solid ${theme.palette.primary.main}`,
  boxShadow: "0 4px 8px rgba(26, 93, 166, 0.2)",
  transition: "all 0.3s ease",
  textTransform: "none",
  padding: "10px 20px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-2px)",
  },
}));

// Helper function to get a date string in YYYY-MM-DD format
const getDateString = (date: Date): string => date.toISOString().split("T")[0];

const MainViewSpace = () => {
  const navigate = useNavigate();
  const { user, chartData, chartOptions, challengeLevels } = useUser();

  // Daily goal for today's challenge (in minutes) – must match provider's value
  const dailyGoal = 30;

  // Compute an array for the last 7 days based on the user's challenge history
  const getLast7Days = () => {
    const daysArray = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = getDateString(d);
      daysArray.push({
        letter: d.toLocaleString("en-US", { weekday: "short" }).charAt(0),
        completed: (user.challengeHistory || []).includes(dateStr),
        active: dateStr === getDateString(today),
      });
    }
    return daysArray;
  };
  const days = getLast7Days();

  // Get the most recent challenge for today's challenge details
  const todayDate = getDateString(new Date());
  const todaysChallenge =
    user.challenges.find((ch) => ch.date === todayDate) ||
    (user.challenges.length > 0
      ? user.challenges[user.challenges.length - 1]
      : null);

  // Calculate remaining minutes for today's practice
  const remainingMinutes = Math.max(dailyGoal - user.timeSpent, 0);

  // Retrieve current challenge level details from challengeLevels
  const currentLevelDetail = challengeLevels.find(
    (level) => level.level === user.currentLevel
  );

  // --- New code for "Song Learning" ---
  // Assume user.currentSong contains:
  //   title, description, timeSpent (song training time), totalTime, and trainingSessions (number of sessions)
  const currentSong = user.currentSong || null;
  const defaultSongTotalTime = 3; // default song length in minutes for example
  const songTimeSpent = currentSong ? currentSong.timeSpent : 0;
  const songTotalTime = currentSong
    ? currentSong.totalTime
    : defaultSongTotalTime;
  const remainingSongMinutes = Math.max(songTotalTime - songTimeSpent, 0);

  // Assume the provider will provide number of song training sessions (fallback to 0)
  const songTrainingSessions = currentSong
    ? currentSong.trainingSessions || 0
    : 0;

  const songChartData = {
    labels: ["Learned", "Remaining"],
    datasets: [
      {
        data: [songTimeSpent, remainingSongMinutes],
        backgroundColor: ["#1a5da6", "#f0f0f0"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        maxWidth: 800,
        mx: "auto",
        p: 2,
      }}
    >
      {/* Current Streak Card */}
      <StyledCard>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography variant="h6">Current Streak</Typography>
            <StreakCount variant="body1">
              🔥 {user.streak || "0"} days
            </StreakCount>
          </Box>
          <Grid container spacing={1}>
            {days.map((day, index) => (
              <Grid item xs={1.5} key={index}>
                <StyledDay
                  completed={!!day.completed}
                  active={day.active ? true : undefined}
                >
                  {day.letter}
                </StyledDay>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </StyledCard>

      {/* Today's Challenge Card */}
      <StyledCard>
        <CardContent>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <WhatshotIcon sx={{ color: "#1a5da6" }} />
            <Typography
              variant="h6"
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              Today's Challenge
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Box sx={{ position: "relative", height: 120 }}>
                <Doughnut
                  key={remainingMinutes}
                  data={chartData}
                  options={chartOptions}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {remainingMinutes > 0 ? `${remainingMinutes} min` : "Done!"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    left today
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={9}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {todaysChallenge && (
                <>
                  <Typography variant="h6" sx={{ color: "#1a5da6" }}>
                    {todaysChallenge.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {todaysChallenge.description}
                  </Typography>
                </>
              )}
              {currentLevelDetail && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Current Level: {currentLevelDetail.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {currentLevelDetail.description}
                  </Typography>
                </Box>
              )}
              <StyledActionButton
                onClick={() => navigate("/dailychallenge")}
                sx={{ mt: 2 }}
              >
                {todaysChallenge ? "Continue Practice" : "Start Practice"}
              </StyledActionButton>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

      {/* Song Learning Card */}
      <StyledCard>
        <CardContent>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <MusicNoteIcon sx={{ color: "#1a5da6" }} />
            <Typography
              variant="h6"
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              Song Learning
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Box sx={{ position: "relative", height: 120 }}>
                <Doughnut
                  key={remainingSongMinutes}
                  data={songChartData}
                  options={chartOptions}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {remainingSongMinutes > 0
                      ? `${remainingSongMinutes} min`
                      : "Complete!"}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    left to learn
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={9}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-start" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              {currentSong ? (
                <>
                  <Typography variant="subtitle1">
                  Current Song: <strong>{currentSong.title}</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mt: 1 }}
                  >
                    Training Sessions: <strong> {songTrainingSessions} </strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mt: 1 }}
                  >
                    Time Spent: <strong> {songTimeSpent} min </strong>
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  No song in progress yet. Start your first song to see progress
                  here.
                </Typography>
              )}
              <StyledActionButton
                onClick={() => navigate("/learnsong")}
                sx={{ mt: 2 }}
              >
                {currentSong ? "Continue Learning" : "Start Learning"}
              </StyledActionButton>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

      {/* Navigation Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <StyledCard
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={() => navigate("/advice")}
          >
            <LibraryBooksIcon sx={{ color: "#1a5da6", fontSize: 32, mb: 1 }} />
            <Typography variant="body1">Basic Advices</Typography>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledCard
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onClick={() => navigate("/tutorial")}
          >
            <PsychologyIcon sx={{ color: "#1a5da6", fontSize: 32, mb: 1 }} />
            <Typography variant="body1">Philosophy</Typography>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Social Media & Newsletter Subscription */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 2 }}>
          <IconButton
            onClick={() =>
              window.open("https://www.instagram.com/onai.piano/", "_blank")
            }
            sx={{ color: "#C13584" }}
          >
            <InstagramIcon fontSize="large" />
          </IconButton>
          <IconButton
            onClick={() =>
              window.open(
                "https://www.facebook.com/profile.php?id=61573215503097",
                "_blank"
              )
            }
            sx={{ color: "#3b5998" }}
          >
            <FacebookIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MainViewSpace;
