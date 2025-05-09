import { Box, Typography, Link, Button } from "@mui/material";
import { useState } from "react";
import { InlineWidget, PopupWidget } from "react-calendly";

interface InformationPageProps {
  content?: string;
}

const InformationPage = ({ content }: InformationPageProps) => {
  const [openCalendly, setOpenCalendly] = useState(false);
  return (
    <Box
      id="Information"
      sx={{ maxWidth: 800, mx: "auto", p: 3, textAlign: "center" }}
    >
      {/* Welcome Message */}
      {/* Content Section */}

      <Typography variant="body1" sx={{ mb: 3, fontStyle: "italic" }}>
        The app is in progress, building something special for you! 🏗️
        <br />
        {content && (
          <>
            <br />
            Feature in progress: <br />
            <Typography sx={{ fontWeight: "bold" }}>{content}</Typography>
          </>
        )}
      </Typography>

      {/* Contact Information */}
      <Typography variant="body1" sx={{ mb: 3 }}>
        📩 <Typography fontWeight="bold">Let’s chat!</Typography> Drop us a
        message at:
        <Link href="mailto:onaipiano7@gmail.com" underline="hover">
          onaipiano7@gmail.com
        </Link>
      </Typography>
      <Typography fontWeight="bold">Or</Typography>
      {/* Calendly Badge Widget */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={() => {
            setOpenCalendly(true);
          }}
        >
          📅 Schedule a call
        </Button>
      </Box>
      {openCalendly && (
        <InlineWidget url="https://calendly.com/onaipiano7/30min" />
      )}

      {/* Social Media Links */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          🌍 <Typography fontWeight="bold">Join our community!</Typography>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Link
            href="https://www.instagram.com/onai.piano/"
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            📸 Instagram
          </Link>
          <Link
            href="https://www.facebook.com/profile.php?id=61573215503097"
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            👍 Facebook
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default InformationPage;
