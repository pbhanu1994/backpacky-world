import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5b65ff',
      extraLight: '#eaebfa',
    },
    secondary: {
      main: '#19857b',
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