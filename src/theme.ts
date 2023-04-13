import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "'Oxanium', cursive", // Add your custom font here
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Oxanium', cursive", // Override the font for MuiButton
        },
      },
    },
  },
});

export default theme;