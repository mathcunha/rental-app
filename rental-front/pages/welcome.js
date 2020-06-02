import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Loyalty from "@material-ui/icons/Loyalty";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { CssBaseline, Container, Box, Grid, Paper } from "@material-ui/core";
import Copyright from "./components/copyright";
import GoogleMaps from "./components/googleMaps";
import AptCard from "./components/aptCard";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
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
  apartamentGrid: {
    overflowY: "auto",
    overflowX: "hidden",
    height: 500,
  },
  mapGrid: {
    width: 350,
    height: 500,
  },
}));

const fakeData = [
  {
    name: "12345678901234567890",
    size: 124,
    rooms: 12,
    price: 12.12,
    lat: 47,
    lng: -120,
  },
  {
    name: "Casa Azul",
    size: 123,
    rooms: 4,
    price: 120.01,
    lat: 47,
    lng: -120,
  },
  {
    name: "Casa Amarela",
    size: 124,
    rooms: 12,
    price: 12.12,
    lat: 47,
    lng: -120,
  },
  {
    name: "Casa Azul",
    size: 123,
    rooms: 4,
    price: 120.01,
    lat: 47,
    lng: -120,
  },
];

export default function Welcome() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
          >
            <Loyalty />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Rental
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
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
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My rentals</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container
        maxWidth="sm"
        component="main"
        className={classes.heroContent}
      ></Container>
      {/* End hero unit */}
      {/* Hero unit */}
      <Container maxWidth="lg" component="main">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className="paper" className={classes.mapGrid}>
              <GoogleMaps />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Paper className="paper" className={classes.apartamentGrid}>
              <Grid container spacing={2}>
                {fakeData.map((apt, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <AptCard apt={apt} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
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
}
