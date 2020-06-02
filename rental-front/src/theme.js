import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: red.A200,
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#556cd6",
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
