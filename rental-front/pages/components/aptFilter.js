import useSWR from "swr";
import AuthService from "../../utils/authService";
import { useState, useEffect } from "react";
import {
  Typography,
  Slider,
  Grid,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const AptFilter = ({ name, price, setName, setPrice }) => {
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
      default:
        break;
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Typography component="h1" variant="h6">
          Search
        </Typography>
      </Grid>
      <Grid item xs={3}>
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
      <Grid item xs={3}>
        <TextField
          id="input-size"
          label="Location"
          type="text"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <Typography
          variant="caption"
          display="block"
          id="room-range-slider"
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
    </Grid>
  );
};

export default AptFilter;
