import React from "react";
import { withRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Loyalty from "@material-ui/icons/Loyalty";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { CssBaseline, Container, Box, Button, Grid } from "@material-ui/core";
import Copyright from "./copyright";
import AuthService from "../../utils/authService";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  heroContent: {
    padding: theme.spacing(4, 0, 6),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const Layout = ({ router, children }) => {
  const classes = useStyles();
  const Auth = new AuthService();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogin = (event) => {
    router.push("/auth/signin");
  };

  const handleClose = (link) => () => {
    if (link === "admin") {
      router.push("/admin");
    } else if (link === "logout") {
      router.push("/auth/signout");
    } else if (link === "myaccount") {
      router.push("/profile");
    }
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={(e) => router.push("/")}
          >
            <Loyalty />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Rental
          </Typography>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose("")}
          >
            <MenuItem onClick={handleClose("myaccount")}>My account</MenuItem>
            <MenuItem onClick={handleClose("logout")}>Logout</MenuItem>
            {Auth.getProfile().isAdmin || Auth.getProfile().isRealtor ? (
              <MenuItem onClick={handleClose("admin")}>Admin</MenuItem>
            ) : (
              ""
            )}
          </Menu>
          {Auth && Auth.loggedIn() ? (
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
        <Grid container></Grid>
      </Container>
      {/* Hero unit */}
      {children}
      {/* End hero unit */}
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
};

export default withRouter(Layout);
