import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { TEXT_CONTENT_LANDING_PAGE } from "../data/landingPageConstants";
import { landingPageTheme } from "../utils/LandingPageTheme";

export default function FeaturedContent() {
  const { title, stories } = TEXT_CONTENT_LANDING_PAGE.featured;
  return (
    <ThemeProvider theme={landingPageTheme}>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 5,
            color: landingPageTheme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        <Grid container spacing={6}>
          {stories.map((story, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card>
                <CardContent sx={{ p: "2rem" }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {story.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="h3"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {story.description}
                  </Typography>
                  {/* Additional detail content can go here */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
