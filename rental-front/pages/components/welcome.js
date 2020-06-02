import React from "react";
import GoogleMaps from "./googleMaps";
import AptCard from "./aptCard";
import { Container, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const Welcome = () => {
  const classes = useStyles();
  return (
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
  );
};

export default Welcome;
