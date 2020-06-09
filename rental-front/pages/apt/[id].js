import { withRouter } from "next/router";
import AuthService from "../../utils/authService";
import Layout from "../components/layout";
import useSWR from "swr";
import {
  Grid,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import GroupIcon from "@material-ui/icons/Group";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
  grid: {
    display: "flex",
    alignItems: "center",
    direction: "row",
    justifyContent: "center",
  },
  media: {
    height: 150,
  },
}));

const Rent = ({ router }) => {
  const classes = useStyles();
  const { id } = router.query;
  const [city, setCity] = useState("");
  const [img, setImg] = useState({});
  const Auth = new AuthService();
  const url =
    id &&
    `${process.env.API_URL}/apartments/search/rent?projection=publicApartment&id=${id}`;
  const [loading, setLoading] = useState(false);

  const searchAddress = () => {
    return Auth.fetch(`/api/image?lat=${data.lat}&lng=${data.lng}`).then(
      (res) => {
        if (res.city) {
          setCity(res.city);
          setImg(res.img);
        }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  const { data, error } =
    Auth.getProfile() && Auth.getProfile().id ? useSWR(url, Auth.fetch) : {};

  useEffect(() => {
    data && searchAddress();
  }, [data]);

  return (
    <Layout>
      <Container maxWidth="sm" component="main">
        <Paper elevation={3}>
          {error ? (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">Apartment not found</Typography>
              </Grid>
            </Grid>
          ) : (
            data && (
              <Grid container spacing={1}>
                <Grid item xs={4} className={classes.grid}>
                  <Typography variant="h5">
                    {" "}
                    {`${data.name} at ${city}`}
                  </Typography>
                </Grid>
                <Grid item xs={8} className={classes.grid}>
                  <img
                    src={
                      img ? img.webformatURL : "https://picsum.photos/200/300"
                    }
                    width="300"
                    height="200"
                  />
                </Grid>
                <Grid item xs={12} className={classes.grid}>
                  <Typography variant="body1">{data.description}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    required
                    fullWidth
                    id="initialDate"
                    label="Move-in Date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs={12} className={classes.grid}>
                  <Chip
                    icon={<AttachMoneyIcon />}
                    label={data.price}
                    className={classes.chip}
                  />
                  <Chip
                    icon={<PhotoSizeSelectActualIcon />}
                    label={`${data.aptSize} m²`}
                    className={classes.chip}
                  />
                  <Chip
                    icon={<GroupIcon />}
                    label={data.room}
                    className={classes.chip}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    Rent
                  </Button>
                </Grid>
              </Grid>
            )
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default withRouter(Rent);
