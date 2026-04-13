import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Smartphone } from "lucide-react";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              bgcolor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "primary.contrastText",
            }}
          >
            <Smartphone size={32} />
          </Box>
          <Typography variant="h2" component="h1">
            Screenshop
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight={400}>
            The screenshot studio for App Store and Google Play. AI-assisted,
            developer-friendly.
          </Typography>
          <Button variant="contained" size="large" disabled>
            Coming soon
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
