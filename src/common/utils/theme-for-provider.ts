import { createTheme, PaletteColorOptions } from "@mui/material";

interface ThemeOptions {
  palette?: {
    primary?: PaletteColorOptions | undefined;
    secondary?: PaletteColorOptions | undefined;
  };
}

export const theme: ThemeOptions = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette: {
    text: {
      primary: "#424242",
    },
    primary: {
      main: "#91ab5d",
      contrastText: "#fff",
    },
    secondary: {
      main: "#d2cfcf",
      light: "#eeeeee",
      dark: "#757575",
    },
  },
});
