"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
  }
  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: "#F8F6F3",
          paper: "#FFFFFF",
        },
        primary: {
          main: "#6C3CE0",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#EDE8F5",
          contrastText: "#1A1A2E",
        },
        error: {
          main: "#D32F2F",
          contrastText: "#FFFFFF",
        },
        warning: {
          main: "#ED6C02",
          contrastText: "#FFFFFF",
        },
        success: {
          main: "#2E7D32",
          contrastText: "#FFFFFF",
        },
        accent: {
          main: "#E040FB",
          light: "#EA80FC",
          dark: "#AA00FF",
          contrastText: "#FFFFFF",
        },
        text: {
          primary: "#1A1A2E",
          secondary: "#5A5A7A",
        },
        divider: "#E0DCE8",
      },
    },
    dark: {
      palette: {
        background: {
          default: "#121218",
          paper: "#1E1E2A",
        },
        primary: {
          main: "#A78BFA",
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: "#2A2A3E",
          contrastText: "#E8E0F5",
        },
        error: {
          main: "#EF5350",
          contrastText: "#FFFFFF",
        },
        warning: {
          main: "#FFA726",
          contrastText: "#FFFFFF",
        },
        success: {
          main: "#66BB6A",
          contrastText: "#FFFFFF",
        },
        accent: {
          main: "#EA80FC",
          light: "#F3B4FF",
          dark: "#E040FB",
          contrastText: "#FFFFFF",
        },
        text: {
          primary: "#E8E0F5",
          secondary: "#A0A0C0",
        },
        divider: "#3A3A50",
        action: {
          hover: "rgba(255,255,255,0.08)",
          selected: "rgba(255,255,255,0.16)",
          focus: "rgba(255,255,255,0.24)",
        },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-inter), sans-serif",
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*, *::before, *::after": {
          transition:
            "background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease, fill 0.3s ease, stroke 0.3s ease",
        },
        body: {
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          transition:
            "background-color 0.3s ease, background-image 0.3s ease, color 0.3s ease",
        },
        ".light body, body.light": {
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, #EDE8F5 0%, #F8F6F3 60%)",
        },
        ".dark body, body.dark": {
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, #1E1E2A 0%, #121218 60%)",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 4,
        },
      },
    },
  },
});

export default theme;
