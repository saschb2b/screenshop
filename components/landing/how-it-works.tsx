import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Upload, SlidersHorizontal, Download } from "lucide-react";

const STEPS = [
  {
    icon: <Upload size={28} />,
    title: "1. Upload",
    description:
      "Drop in your app screenshot. Supports any image format, any resolution.",
  },
  {
    icon: <SlidersHorizontal size={28} />,
    title: "2. Customize",
    description:
      "Pick a device frame, set your background, add a headline. Drag to reposition.",
  },
  {
    icon: <Download size={28} />,
    title: "3. Export",
    description:
      "Download store-ready PNGs at the exact dimensions Apple and Google require.",
  },
];

export function HowItWorks() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{
            mb: 6,
            fontWeight: 700,
            fontSize: { xs: "1.75rem", md: "2.5rem" },
          }}
        >
          Three steps to store-ready screenshots
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="center"
        >
          {STEPS.map((step) => (
            <Paper
              key={step.title}
              elevation={0}
              sx={{
                flex: 1,
                p: 4,
                textAlign: "center",
                border: 1,
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: "secondary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "primary.main",
                  mx: "auto",
                  mb: 2,
                }}
              >
                {step.icon}
              </Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {step.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
