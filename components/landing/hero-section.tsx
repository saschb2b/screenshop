import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <Box
      sx={{
        pt: { xs: 12, md: 18 },
        pb: { xs: 8, md: 14 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            App store screenshots,
            <br />
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(135deg, var(--mui-palette-primary-main), var(--mui-palette-accent-main))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              made simple
            </Box>
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            fontWeight={400}
            sx={{
              maxWidth: 520,
              fontSize: { xs: "1rem", md: "1.25rem" },
              lineHeight: 1.6,
            }}
          >
            Upload your screenshot, pick a device frame, add a headline, export.
            Store-ready PNGs in minutes, not hours.
          </Typography>
          <Link href="/editor" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowRight size={20} />}
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
              }}
            >
              Open Editor
            </Button>
          </Link>
          <Typography variant="caption" color="text.secondary">
            No signup. No watermark. Free to use.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
