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
import { withRouter } from "next/router";
import AptRent from "./aptRent";

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

const Welcome = ({ router }) => {
  const classes = useStyles();
  const [aptSize, setAptSize] = useState("");
  const [price, setPrice] = useState("");
  const [room, setRoom] = useState("");
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
  const [openRent, setOpenRent] = useState(false);

  const handleFocusApt = (apt) => () => {
    setFocusApt(apt);
  };

  const handleRent = (apt) => () => {
    if (!Auth.loggedIn()) {
      router.push("/auth/signin");
    } else {
      setOpenRent(true);
    }
    setFocusApt(apt);
  };
  const handleChange = (input) => (e) => {
    let value = parseFloat(e.target.value);
    switch (input) {
      case "aptSize":
        setAptSize(isNaN(value) ? room : Math.abs(value));
        break;
      case "price":
        setPrice(isNaN(value) ? room : Math.abs(value));
        break;
      case "room":
        value = parseInt(e.target.value);
        setRoom(isNaN(value) ? room : Math.abs(value));
        break;
      default:
        break;
    }
  };
  return (
    <Fragment>
      <Container className={classes.container}>
        <Grid container spacing={1}>
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
              onChange={handleChange("aptSize")}
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
              label="Price"
              type="number"
              value={price}
              onChange={handleChange("price")}
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
              onChange={handleChange("room")}
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
            <AptRent open={openRent} setOpen={setOpenRent} />
            <Paper className="paper" className={classes.apartamentGrid}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {!data
                    ? "Loading"
                    : data._embedded && data._embedded.apartments.length === 0
                    ? "No Results Found"
                    : data._embedded &&
                      data._embedded.apartments.map((apt) => (
                        <AptCard
                          apt={apt}
                          setOpen={setOpen}
                          onRent={handleRent(apt)}
                          onMouseOver={handleFocusApt(apt)}
                          key={apt.name}
                        />
                      ))}
                </Grid>
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

export default withRouter(Welcome);
