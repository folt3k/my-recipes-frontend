import { createTheme, PaletteColorOptions } from "@mui/material";

interface ThemeOptions {
  palette?: {
    primary?: PaletteColorOptions | undefined;
    secondary?: PaletteColorOptions | undefined;
  };
}

export const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#91ab5d",
      contrastText: "#fff",
    },
    secondary: {
      main: "#efebe1",
      light: "#fffbf1",
      dark: "#d2c7ac",
    },
  },
});
