import useSWR from "swr";
import GoogleMaps from "./googleMaps";
import AptCard from "./aptCard";
import { Container, Grid, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthService from "../../utils/authService";
import { useState, Fragment, useEffect } from "react";
import AptDescription from "./aptDescription";
import withWidth from "@material-ui/core/withWidth";
import { withRouter } from "next/router";
import ListIcon from "@material-ui/icons/List";

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
    margin: theme.spacing(0, 0, 2),
    padding: theme.spacing(0, 1, 1),
  },
  containerHidden: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(0, 0, 2),
    padding: theme.spacing(0, 1, 1),
    display: "none",
  },
}));

const Welcome = ({ router, width }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [aptSize, setAptSize] = useState(0);
  const [room, setRoom] = useState(0);
  const filterURI = () => {
    return `&price=${price}&name=${name}&aptSize=${aptSize}&room=${room}`;
  };

  const Auth = new AuthService();
  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR(
    `${
      process.env.API_URL
    }/apartments?projection=publicApartment${filterURI()}&available=true&sort=price&size=1000`,
    fetcher
  );
  const [focusApt, setFocusApt] = useState({});
  const [open, setOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(true);

  useEffect(() => {
    setShowFilter(width && !("sm" === width || "xs" === width));
  }, width);
  const handleShowFilter = (e) => {
    e.preventDefault();
    setShowFilter(!showFilter);
  };

  const handleFocusApt = (apt) => () => {
    setFocusApt(apt);
  };

  const handleRent = (apt) => () => {
    if (!Auth.loggedIn()) {
      router.push("/auth/signin");
    } else {
      router.push(`/apt/${apt.id}`);
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
      <Container
        maxWidth="lg"
        className={
          showFilter === false ? classes.container : classes.containerHidden
        }
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={handleShowFilter}
              startIcon={<ListIcon />}
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container
        className={
          showFilter === true ? classes.container : classes.containerHidden
        }
      >
        <AptFilter
          name={name}
          price={price}
          setName={setName}
          setPrice={setPrice}
          aptSize={aptSize}
          room={room}
          setRoom={setRoom}
          setAptSize={setAptSize}
          onClick={handleShowFilter}
        />
      </Container>
      <Container maxWidth="lg" component="main">
        <Grid container spacing={1} direction="row-reverse">
          <Grid item xs={12} sm={6} md={8}>
            <AptDescription apt={focusApt} open={open} setOpen={setOpen} />
            <Paper className="paper" className={classes.apartamentGrid}>
              <Grid container spacing={2}>
                {error ? (
                  <Grid item xs={12} md={6}>
                    <AptCard
                      label={"Sorry... offline"}
                      resetSearchFields={resetSearchFields}
                    />
                  </Grid>
                ) : !data ? (
                  <Grid item xs={12} md={6}>
                    <AptCard
                      label={"Loading data"}
                      resetSearchFields={resetSearchFields}
                    />
                  </Grid>
                ) : data.content && data.content.length === 0 ? (
                  <Grid item xs={12} md={6}>
                    <AptCard
                      label={"No results found"}
                      resetSearchFields={resetSearchFields}
                    />
                  </Grid>
                ) : (
                  data.content &&
                  data.content.map((apt) => (
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

export default withWidth()(withRouter(Welcome));
