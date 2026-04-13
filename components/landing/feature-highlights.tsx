import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Smartphone, Palette, Type, Ruler } from "lucide-react";

const FEATURES = [
  {
    icon: <Smartphone size={24} />,
    title: "Device Frames",
    description:
      "iPhone, iPad, and Android frames. Your screenshot sits inside a realistic device mockup, ready for the store.",
  },
  {
    icon: <Palette size={24} />,
    title: "Backgrounds",
    description:
      "Solid colors and gradients. Match your app's branding or pick a trending style that converts.",
  },
  {
    icon: <Type size={24} />,
    title: "Headlines",
    description:
      "Add benefit-driven text above your device. Control font size, weight, and color.",
  },
  {
    icon: <Ruler size={24} />,
    title: "Pixel-Perfect Export",
    description:
      "Export at the exact dimensions Apple and Google require. No more rejection for wrong sizes.",
  },
];

export function FeatureHighlights() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          textAlign="center"
          sx={{
            mb: 2,
            fontWeight: 700,
            fontSize: { xs: "1.75rem", md: "2.5rem" },
          }}
        >
          Everything you need, nothing you don&apos;t
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6, maxWidth: 480, mx: "auto" }}
        >
          No bloat. No subscriptions. Just the tools to make your app look great
          on the store.
        </Typography>
        <Grid container spacing={3}>
          {FEATURES.map((feature) => (
            <Grid key={feature.title} size={{ xs: 12, sm: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 1.5,
                    bgcolor: "secondary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "primary.main",
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
