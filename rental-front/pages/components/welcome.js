import useSWR from "swr";
import GoogleMaps from "./googleMaps";
import AptCard from "./aptCard";
import { Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthService from "../../utils/authService";
import { useState } from "react";
import AptDescription from "./aptDescription";

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
    direction: "row-reverse",
  },
}));

const Welcome = () => {
  const classes = useStyles();
  const Auth = new AuthService();
  const { data, error } = useSWR(
    `${process.env.API_URL}/apartments/search/filter?projection=publicApartment&available=true`,
    Auth.fetch
  );
  const [focusApt, setFocusApt] = useState({});
  const [open, setOpen] = useState(false);

  const handleFocusApt = (apt) => () => {
    setFocusApt(apt);
  };
  return (
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
  );
};

export default Welcome;
