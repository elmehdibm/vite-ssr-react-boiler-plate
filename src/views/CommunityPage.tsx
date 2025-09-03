import { Container, Box, Typography } from "@mui/material";
import ShareWhatsappImage from "../assets/sharewhatsapp.png";

export default function CommunityPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Join Our Piano Community
        </Typography>
        <Typography variant="body1">
          Connect with fellow piano enthusiasts who share your musical interests
          and goals. Share tips, challenges, and experiences to enhance your
          learning journey.
        </Typography>
        <Box
          component="img"
          src={ShareWhatsappImage}
          alt="Join the community by whatsapp"
          sx={{
            maxWidth: "100%",
            maxHeight: 400,
            borderRadius: 4,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        />
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            fontWeight: "bold",
            color: "#1a5da6",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() =>
            window.open(
              "https://chat.whatsapp.com/BaudXTobKCoBhykSvacBmN?mode=r_c",
              "_blank"
            )
          }
        >
          Or Click here to join via a link
        </Typography>
      </Box>
    </Container>
  );
}
