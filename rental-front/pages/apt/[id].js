import { withRouter } from "next/router";
import AuthService from "../../utils/authService";
import Layout from "../components/layout";
import FormControlValidation from "../../utils/formControlValidation";
import useSWR from "swr";
import {
  Grid,
  Typography,
  Container,
  Paper,
  TextField,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import GroupIcon from "@material-ui/icons/Group";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import ActionButtons from "../components/actionButtons";

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
  const [saveError, setSaveError] = useState("");
  const [success, setSuccess] = useState(false);
  const [moveDate, setMoveDate] = useState("");

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

  const tokenExpired = () => {
    Auth.fetch(`${process.env.API_HOST}/user`).catch((err) => {
      Auth.logout();
      router.push("/");
    });
    return "";
  };

  const handleSuccess = (e) => {
    router.push("/");
  };

  const { data, error } =
    Auth.getProfile() && Auth.getProfile().id ? useSWR(url, Auth.fetch) : {};

  const getData = () => {
    return {
      moveDate: moveDate,
      user: `${process.env.API_URL}/users/${Auth.getProfile().id}`,
      apartment: {
        price: data.price,
        apartmentId: id,
      },
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveError("");

    Auth.save("rents", getData())
      .then((res) => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        err.response.json().then((json) => {
          json.status = err.status;
          setSaveError({ json });
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    data && searchAddress();
  }, [data]);

  const priceError = FormControlValidation(saveError, "price");
  const moveDateError = FormControlValidation(saveError, "moveDate");

  return (
    <Layout>
      <Container maxWidth="sm" component="main">
        <Paper elevation={3}>
          {error ? (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Apartment not found {tokenExpired()}
                </Typography>
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
                    error={moveDateError != ""}
                    helperText={moveDateError}
                    required
                    fullWidth
                    value={moveDate}
                    onChange={(e) => setMoveDate(e.target.value)}
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
                  <ActionButtons
                    action={"save"}
                    isNew={true}
                    onSave={handleSubmit}
                    saveLabel={"Confirm Rent"}
                    loading={loading}
                    success={success}
                    onSuccess={handleSuccess}
                    error={saveError}
                  />
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
