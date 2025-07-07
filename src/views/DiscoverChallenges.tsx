import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Container,
  Grid,
  CardHeader,
  CardContent,
  Chip,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import FeedbackIcon from "@mui/icons-material/Feedback";
import DiscoverIcon from "@mui/icons-material/Explore";
import {
  Challenge,
  ChallengeDomain,
  ChallengeLevel,
  challengesData,
  ChallengeType,
  domainLabels,
  levelLabels,
  objectiveLabels,
  ObjectiveTag,
  typeLabels,
} from "../data/challengesData";

// Styled Card with hover
const StyledCard = styled("div")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease",
  overflow: "hidden",
  border: "1px solid rgba(26, 93, 166, 0.1)",
  backgroundColor: "#fff",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 8px rgba(26, 93, 166, 0.2)",
    backgroundColor: "#f9f9f9",
  },
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

// Styled Primary Button
const StyledActionButtonPrimary = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  border: `2px solid ${theme.palette.primary.main}`,
  boxShadow: "0 4px 8px rgba(26, 93, 166, 0.2)",
  transition: "all 0.3s ease",
  textTransform: "none",
  padding: "8px 16px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-2px)",
  },
}));

// Styled Secondary Button
const StyledActionButtonSecondary = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: "#fff",
  color: theme.palette.primary.main,
  border: `2px solid ${theme.palette.primary.main}`,
  transition: "all 0.3s ease",
  textTransform: "none",
  padding: "8px 16px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Domain → chip color mapping
const domainColors: Record<
  ChallengeDomain,
  "default" | "primary" | "secondary" | "success" | "warning" | "info"
> = {
  notation: "primary",
  sight_reading: "secondary",
  rhythm: "success",
  ear_training: "warning",
  harmony: "info",
  scales: "primary",
  chords: "secondary",
  technique: "success",
};

export default function DiscoverChallenges() {
  // filter states
  const [types, setTypes] = React.useState<ChallengeType[]>([]);
  const [domains, setDomains] = React.useState<ChallengeDomain[]>([]);
  const [objectives, setObjectives] = React.useState<ObjectiveTag[]>([]);
  const [levels, setLevels] = React.useState<ChallengeLevel[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  // handlers
  const handleSelect =
    <T,>(value: T[], setter: React.Dispatch<React.SetStateAction<T[]>>) =>
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setter(event.target.value as T[]);
    };
  const handleInfoClick = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // filtering logic
  const filtered = challengesData.filter((c: Challenge) => {
    if (types.length && !types.includes(c.type)) return false;
    if (domains.length && !domains.includes(c.domain)) return false;
    if (levels.length && !levels.includes(c.level)) return false;
    if (objectives.length && !objectives.some((o) => c.objectives.includes(o)))
      return false;
    return true;
  });

  // group by level
  const levelsSorted = Object.values(ChallengeLevel);
  const grouped = levelsSorted.map((lvl) => ({
    level: lvl,
    items: filtered.filter((c) => c.level === lvl),
  }));

  return (
    <Container sx={{ py: 4 }}>
      {/* Styled Title */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Discover Challenges
          <DiscoverIcon
            fontSize="large"
            sx={{ verticalAlign: "middle", mr: 1, color: "primary.main" }}
          />
        </Typography>
      </Box>

      {/* Filter Controls */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 4,
        }}
      >
        {/* Type */}
        <FormControl fullWidth size="small">
          <InputLabel>Type</InputLabel>
          <Select
            multiple
            value={types}
            onChange={handleSelect<ChallengeType>(types, setTypes)}
            label="Type"
            renderValue={(sel) => sel.map((v) => typeLabels[v]).join(", ")}
          >
            {Object.values(ChallengeType).map((t) => (
              <MenuItem key={t} value={t}>
                <Checkbox checked={types.includes(t)} />
                <ListItemText primary={typeLabels[t]} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Domain */}
        <FormControl fullWidth size="small">
          <InputLabel>Domain</InputLabel>
          <Select
            multiple
            value={domains}
            onChange={handleSelect<ChallengeDomain>(domains, setDomains)}
            label="Domain"
            renderValue={(sel) => sel.map((v) => domainLabels[v]).join(", ")}
          >
            {Object.values(ChallengeDomain).map((d) => (
              <MenuItem key={d} value={d}>
                <Checkbox checked={domains.includes(d)} />
                <ListItemText primary={domainLabels[d]} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Objective */}
        <FormControl fullWidth size="small">
          <InputLabel>Objective</InputLabel>
          <Select
            multiple
            value={objectives}
            onChange={handleSelect<ObjectiveTag>(objectives, setObjectives)}
            label="Objective"
            renderValue={(sel) => sel.map((v) => objectiveLabels[v]).join(", ")}
          >
            {Object.values(ObjectiveTag).map((o) => (
              <MenuItem key={o} value={o}>
                <Checkbox checked={objectives.includes(o)} />
                <ListItemText primary={objectiveLabels[o]} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Level */}
        <FormControl fullWidth size="small">
          <InputLabel>Level</InputLabel>
          <Select
            multiple
            value={levels}
            onChange={handleSelect<ChallengeLevel>(levels, setLevels)}
            label="Level"
            renderValue={(sel) => sel.map((v) => levelLabels[v]).join(", ")}
          >
            {Object.values(ChallengeLevel).map((l) => (
              <MenuItem key={l} value={l}>
                <Checkbox checked={levels.includes(l)} />
                <ListItemText primary={levelLabels[l]} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Accordions by Level */}
      {grouped.map(
        ({ level, items }) =>
          items.length > 0 && (
            <Accordion defaultExpanded key={level} sx={{ mb: 2, background: "transparent" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{levelLabels[level]}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {items.map((ch) => (
                    <Grid item xs={12} sm={6} md={4} key={ch.id}>
                      <StyledCard>
                        <CardHeader
                          title={ch.title}
                          subheader={typeLabels[ch.type]}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          {/* Domain & Objectives */}
                          <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            mb={1}
                          >
                            <Chip
                              label={domainLabels[ch.domain]}
                              size="small"
                              color={domainColors[ch.domain]}
                            />
                            {ch.objectives.map((o) => (
                              <Chip
                                key={o}
                                label={objectiveLabels[o]}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                            <IconButton size="small" onClick={handleInfoClick}>
                              <InfoIcon fontSize="small" />
                            </IconButton>
                          </Stack>

                          {/* Duration & Description */}
                          <Typography variant="body2" mb={1}>
                            ⏱️ {ch.estimatedDuration} min
                          </Typography>
                          <Typography variant="body2" mb={2}>
                            {ch.shortDescription}
                          </Typography>

                          {/* CTAs */}
                          <Stack direction="row" spacing={1}>
                            <StyledActionButtonPrimary size="small">
                              Start
                            </StyledActionButtonPrimary>
                            <StyledActionButtonSecondary size="small">
                              Details
                            </StyledActionButtonSecondary>
                          </Stack>
                        </CardContent>
                      </StyledCard>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          )
      )}
      {/* Feedback Button */}
      <Box textAlign="center" mt={4}>
        <Button startIcon={<FeedbackIcon />} variant="outlined" color="primary">
          Send Feedback
        </Button>
      </Box>
    </Container>
  );
}
