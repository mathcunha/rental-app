import useSWR from "swr";
import GoogleMaps from "./googleMaps";
import AptCard from "./aptCard";
import {
  Container,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthService from "../../utils/authService";
import { useState, Fragment } from "react";
import AptDescription from "./aptDescription";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  apartamentGrid: {
    overflowY: "auto",
    overflowX: "hidden",
    height: 500,
  },
  mapGrid: {
    width: 350,
    height: 500,
  },
  container: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(0, 0, 4),
    padding: theme.spacing(0, 5, 1),
  },
}));

const Welcome = () => {
  const classes = useStyles();
  const [aptSize, setAptSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [room, setRoom] = useState(0);
  const filterURI = () => {
    let uri = "";

    if (price !== "") {
      uri += "&price=" + price;
    }
    if (room !== "") {
      uri += "&room=" + room;
    }
    if (aptSize !== "") {
      uri += "&aptSize=" + aptSize;
    }

    return uri;
  };

  const Auth = new AuthService();
  const { data, error } = useSWR(
    `${
      process.env.API_URL
    }/apartments/search/filter?projection=publicApartment&available=true${filterURI()}`,
    Auth.fetch
  );
  const [focusApt, setFocusApt] = useState({});
  const [open, setOpen] = useState(false);

  const handleFocusApt = (apt) => () => {
    setFocusApt(apt);
  };
  return (
    <Fragment>
      <Container className={classes.container}>
        <Grid container maxWidth="xs" spacing={1}>
          <Grid item xs={3}>
            <Typography component="h1" variant="h6">
              Search
            </Typography>
          </Grid>
          <Grid item xs={3} sm={2}>
            <TextField
              id="input-size"
              label="Size"
              type="number"
              value={aptSize}
              onChange={(e) => setAptSize(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <TextField
              id="input-price"
              label="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3} sm={2}>
            <TextField
              id="input-room"
              label="Room"
              type="number"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" component="main">
        <Grid container spacing={1} direction="row-reverse">
          <Grid item xs={12} sm={6} md={8}>
            <AptDescription apt={focusApt} open={open} setOpen={setOpen} />
            <Paper className="paper" className={classes.apartamentGrid}>
              <Grid container spacing={2}>
                {!data ? (
                  <Grid item xs={12} md={6}>
                    Loading
                  </Grid>
                ) : (
                  data._embedded &&
                  data._embedded.apartments.map((apt) => (
                    <Grid item xs={12} md={6} key={apt.name}>
                      <AptCard
                        apt={apt}
                        setOpen={setOpen}
                        onMouseOver={handleFocusApt(apt)}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper className="paper" className={classes.mapGrid}>
              <GoogleMaps data={data} marker={focusApt} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Welcome;
