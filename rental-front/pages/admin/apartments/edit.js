import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from "react";
import AuthService from "../../../utils/authService";
import FormControlValidation from "../../../utils/formControlValidation";
import ActionButtons from "../../components/actionButtons";
import { withRouter } from "next/router";
import SearchIcon from "@material-ui/icons/Search";
import {
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  OutlinedInput,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

const EditApt = ({ apt, router }) => {
  const Auth = new AuthService();
  const classes = useStyles();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [aptSize, setAptSize] = useState("");
  const [price, setPrice] = useState("");
  const [room, setRoom] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [address, setAddress] = useState("");
  const [available, setAvailable] = useState(true);

  const isNew = () => {
    return id === "";
  };

  useEffect(() => {
    if (apt && apt.id) {
      setName(apt.publicInfo.name);
      setDescription(apt.publicInfo.description);
      setAptSize(apt.publicInfo.aptSize);
      setPrice(apt.publicInfo.price);
      setAvailable(apt.available);
      setRoom(apt.publicInfo.room);
      setLat(apt.publicInfo.lat);
      setLng(apt.publicInfo.lng);

      setId(apt.id);
    }
  }, [apt]);

  const handleChange = (input) => (e) => {
    switch (input) {
      case "name":
        setName(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "aptSize":
        setAptSize(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "available":
        setAvailable(e.target.value);
        break;
      case "room":
        const value = parseInt(e.target.value);
        setRoom(isNaN(value) ? room : value);
        break;
      case "lat":
        setLat(e.target.value);
        break;
      case "lng":
        setLng(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
        break;
      default:
        break;
    }
  };

  const getData = () => {
    return {
      publicInfo: {
        name: name,
        description: description,
        aptSize: aptSize,
        price: price,
        room: room,
        lat: lat,
        lng: lng,
      },
      available: available,
      id: id,
      user: { id: isNew() ? Auth.getProfile().id : apt.user.id },
      version: isNew() ? 0 : apt.version,
    };
  };

  const handleSearchAddress = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    Auth.fetch(`/api/geocode?address=${address}`)
      .then((res) => {
        setLoading(false);
        if (res.location) {
          setLat(res.location.lat);
          setLng(res.location.lng);
        }
      })
      .catch((err) => {
        setError({ status: err.status, json: "error reaching geocoding api" });
        setLoading(false);
      });
  };

  const handleDelete = (e) => {
    setAction("delete");
    setLoading(true);
    Auth.delete(`${process.env.API_URL}/apartments/${id}`)
      .then((res) => {
        router.push("/admin/apartments/list");
      })
      .catch((err) => {
        setError({ status: err.status, json: "error deleting resource" });
        setLoading(false);
      });
  };

  const handleSuccess = (e) => {
    router.push("/admin/apartments/list");
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setAction("save");
    setError("");

    Auth.save("apartments", getData())
      .then((res) => {
        setSuccess(true);
      })
      .catch((err) => {
        err.response.json().then((json) => {
          json.status = err.status;
          setError({ json });
        });
        setLoading(false);
      });
  };

  const nameError = FormControlValidation(error, "publicInfo.name")
    ? FormControlValidation(error, "publicInfo.name")
    : FormControlValidation(error, "name");
  const descriptionError = FormControlValidation(
    error,
    "publicInfo.description"
  );
  const aptSizeError = FormControlValidation(error, "publicInfo.aptSize");
  const priceError = FormControlValidation(error, "publicInfo.price");
  const roomError = FormControlValidation(error, "publicInfo.room");
  const latError = FormControlValidation(error, "publicInfo.lat");
  const lngError = FormControlValidation(error, "publicInfo.lng");
  const availableError = FormControlValidation(error, "available");

  return (
    <Paper className="paper">
      <Typography component="h1" variant="h5">
        Apartment
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <TextField
              error={nameError != ""}
              helperText={nameError}
              type="text"
              autoComplete="fname"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              InputLabelProps={{
                shrink: true,
              }}
              value={name}
              onChange={handleChange("name")}
              InputProps={{
                readOnly: !isNew(),
              }}
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <InputLabel shrink={true} id="available-label">
              State
            </InputLabel>
            <Select
              labelId="available-label"
              id="demo-controlled-open-select"
              error={availableError}
              value={available}
              onChange={handleChange("available")}
            >
              <MenuItem value={true}>
                <em>Available</em>
              </MenuItem>
              <MenuItem value={false}>
                <em>Rented</em>
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={descriptionError != ""}
              helperText={descriptionError}
              type="text"
              name="description"
              variant="outlined"
              required
              multiline
              fullWidth
              rows={4}
              id="description"
              label="Description"
              InputLabelProps={{
                shrink: true,
              }}
              value={description}
              onChange={handleChange("description")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={aptSizeError != ""}
              helperText={aptSizeError}
              type="number"
              name="aptSize"
              variant="outlined"
              required
              fullWidth
              id="aptSize"
              label="Floor Size"
              InputLabelProps={{
                shrink: true,
              }}
              value={aptSize}
              onChange={handleChange("aptSize")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={priceError != ""}
              helperText={priceError}
              type="number"
              name="price"
              variant="outlined"
              required
              fullWidth
              id="price"
              label="Price per Month"
              InputLabelProps={{
                shrink: true,
              }}
              value={price}
              onChange={handleChange("price")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              error={roomError != ""}
              helperText={roomError}
              type="number"
              name="room"
              variant="outlined"
              required
              fullWidth
              id="room"
              label="Number of Rooms"
              InputLabelProps={{
                shrink: true,
              }}
              value={room}
              onChange={handleChange("room")}
            />
          </Grid>
          <Grid item xs={6}>
            <OutlinedInput
              value={address}
              onChange={handleChange("address")}
              placeholder="Search Apt Address"
              inputProps={{ "aria-label": "search apt address" }}
              endAdornment={
                <IconButton
                  type="submit"
                  aria-label="search"
                  onClick={handleSearchAddress}
                >
                  <SearchIcon />
                </IconButton>
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={latError != ""}
              helperText={latError}
              type="number"
              name="lat"
              variant="outlined"
              required
              fullWidth
              id="lat"
              label="Latitude"
              InputLabelProps={{
                shrink: true,
              }}
              value={lat}
              onChange={handleChange("lat")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              error={lngError != ""}
              helperText={lngError}
              type="number"
              name="lng"
              variant="outlined"
              required
              fullWidth
              id="lng"
              label="Longitude"
              InputLabelProps={{
                shrink: true,
              }}
              value={lng}
              onChange={handleChange("lng")}
            />
          </Grid>
        </Grid>
        <ActionButtons
          action={action}
          isNew={isNew()}
          onSave={handleSave}
          onDelete={handleDelete}
          loading={loading}
          success={success}
          onSuccess={handleSuccess}
          error={error}
        />
      </form>
    </Paper>
  );
};

export default withRouter(EditApt);
