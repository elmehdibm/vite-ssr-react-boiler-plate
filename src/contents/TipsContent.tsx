import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { landingPageTheme } from "../utils/LandingPageTheme";
import { TEXT_CONTENT_LANDING_PAGE } from "../data/landingPageConstants";

export default function TipsContent() {
  const { title, items } = TEXT_CONTENT_LANDING_PAGE.tips;
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
          {items.map((tip, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card>
                <CardContent sx={{ p: "2rem" }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {tip.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    component="h3"
                    color="text.secondary"
                  >
                    {tip.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
