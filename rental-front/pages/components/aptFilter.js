import useSWR from "swr";
import AuthService from "../../utils/authService";
import { useState, useEffect } from "react";
import {
  Typography,
  Slider,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import withWidth from "@material-ui/core/withWidth";

const AptFilter = ({
  name,
  price,
  aptSize,
  room,
  setName,
  setPrice,
  setAptSize,
  setRoom,
  width,
  onClick,
}) => {
  const Auth = new AuthService();
  const { data, error } = useSWR(
    `${process.env.API_URL}/apartments/search/findAptFilterRange`,
    Auth.fetch
  );

  const [stats, setStats] = useState({
    minAptSize: 0,
    minPrice: 0,
    minRoom: 0,
    maxAptSize: 1000,
    maxPrice: 1000,
    maxRoom: 100,
  });

  useEffect(() => {
    data && data.minAptSize && setStats(data);
  }, [data]);

  const handleChange = (input) => (event, newValue) => {
    switch (input) {
      case "name":
        setName(event.target.value);
        break;
      case "price":
        setPrice(newValue);
        break;
      case "aptSize":
        setAptSize(newValue);
        break;
      case "room":
        setRoom(newValue);
        break;
      default:
        break;
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={2} md={1}>
        {width && ("sm" === width || "xs" === width) ? (
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={onClick}
            startIcon={<CloseIcon />}
          >
            Hide
          </Button>
        ) : (
          <Typography component="h1" variant="h6">
            Filter
          </Typography>
        )}
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <TextField
          id="input-size"
          label="Name"
          type="text"
          value={name}
          onChange={handleChange("name")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Typography
          variant="caption"
          display="block"
          id="size-range-slider"
          gutterBottom
        >
          Floor Area Size m²
        </Typography>
        <Slider
          value={aptSize}
          onChange={handleChange("aptSize")}
          aria-labelledby="size-range-slider"
          valueLabelDisplay="auto"
          min={stats.minAptSize}
          max={stats.maxAptSize}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Typography
          variant="caption"
          display="block"
          id="price-slider"
          gutterBottom
        >
          Price per Month $
        </Typography>
        <Slider
          value={price}
          onChange={handleChange("price")}
          aria-labelledby="price-slider"
          valueLabelDisplay="auto"
          min={stats.minPrice}
          max={stats.maxPrice}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={3}>
        <Typography
          variant="caption"
          display="block"
          id="room-slider"
          gutterBottom
        >
          Number of Rooms
        </Typography>
        <Slider
          value={room}
          onChange={handleChange("room")}
          aria-labelledby="room-slider"
          valueLabelDisplay="auto"
          min={stats.minRoom}
          max={stats.maxRoom}
        />
      </Grid>
    </Grid>
  );
};

export default withWidth()(AptFilter);
