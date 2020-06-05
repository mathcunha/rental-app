import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#E64A19",
    },
    secondary: {
      main: "rgba(255, 191, 105, 1)",
    },
    error: {
      main: "#418e87",
    },
    background: {
      default: "#fff",
    },
    success: {
      main: "rgba(255, 191, 105, 1)",
    },
  },
});

export default theme;
