import { createTheme } from "@material-ui/core/styles";
import { green, red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#5b65ff",
      extraLight: "#eaebfa",
    },
    secondary: {
      main: "#19857b",
    },
    success: {
      main: green.A400,
    },
    error: {
      main: red.A400,
    },
    // background: {
    //   default: '#fff',
    // },
  },
});

export default theme;
