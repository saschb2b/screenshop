import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{ py: 4, borderTop: 1, borderColor: "divider" }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Screenshop. Built for developers who ship apps.
        </Typography>
      </Container>
    </Box>
  );
}
