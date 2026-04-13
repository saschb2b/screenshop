import Box from "@mui/material/Box";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FeatureHighlights } from "@/components/landing/feature-highlights";
import { SiteFooter } from "@/components/landing/site-footer";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <HeroSection />
      <HowItWorks />
      <FeatureHighlights />
      <Box sx={{ flexGrow: 1 }} />
      <SiteFooter />
    </Box>
  );
}
