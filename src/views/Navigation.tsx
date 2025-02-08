import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { ArrowForward, CheckCircle } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

// **★ Modern AppBar with Responsive Design**
function Navigation() {
  const location = useLocation();

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Love Piano</Typography>
        <Box>
          <IconButton color="primary" href="/advice">
            <CheckCircle />
          </IconButton>
          <IconButton color="primary" href="/tutorial">
            <ArrowForward />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
