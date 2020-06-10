import useSWR from "swr";
import GoogleMaps from "./googleMaps";
import AptCard from "./aptCard";
import { Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthService from "../../utils/authService";
import { useState, Fragment } from "react";
import AptDescription from "./aptDescription";

import { withRouter } from "next/router";

import AptFilter from "./aptFilter";

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
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [aptSize, setAptSize] = useState(0);
  const [room, setRoom] = useState(0);
  const filterURI = () => {
    return `&price=${price}&name=${name}&aptSize=${aptSize}&room=${room}`;
  };

  const Auth = new AuthService();
  const { data, error } = useSWR(
    `${
      process.env.API_URL
    }/apartments/search/filter?projection=publicApartment${filterURI()}&available=true&sort=price`,
    Auth.fetch
  );
  const [focusApt, setFocusApt] = useState({});
  const [open, setOpen] = useState(false);

  const handleFocusApt = (apt) => () => {
    setFocusApt(apt);
  };

  const handleRent = (apt) => () => {
    if (!Auth.loggedIn()) {
      router.push("/auth/signin");
    } else {
      const arr = apt._links.self.href.split("/");
      router.push(`/apt/${arr[arr.length - 1]}`);
    }
    setFocusApt(apt);
  };

  const resetSearchFields = () => {
    setName("");
    setPrice(0);
    setRoom(0);
    setAptSize(0);
  };

  return (
    <Fragment>
      <Container className={classes.container}>
        <AptFilter
          name={name}
          price={price}
          setName={setName}
          setPrice={setPrice}
          aptSize={aptSize}
          room={room}
          setRoom={setRoom}
          setAptSize={setAptSize}
        />
      </Container>
      <Container maxWidth="lg" component="main">
        <Grid container spacing={1} direction="row-reverse">
          <Grid item xs={12} sm={6} md={8}>
            <AptDescription apt={focusApt} open={open} setOpen={setOpen} />
            <Paper className="paper" className={classes.apartamentGrid}>
              <Grid container spacing={2}>
                {!data ? (
                  <Grid item xs={12} md={6}>
                    <AptCard
                      label={"Loading data"}
                      resetSearchFields={resetSearchFields}
                    />
                  </Grid>
                ) : data._embedded && data._embedded.apartments.length === 0 ? (
                  <Grid item xs={12} md={6}>
                    <AptCard
                      label={"No results found"}
                      resetSearchFields={resetSearchFields}
                    />
                  </Grid>
                ) : (
                  data._embedded &&
                  data._embedded.apartments.map((apt) => (
                    <Grid item xs={12} md={6} key={apt.name}>
                      <AptCard
                        apt={apt}
                        setOpen={setOpen}
                        onRent={handleRent(apt)}
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

export default withRouter(Welcome);
