import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AuthService from "../../utils/authService";
import theme from "../../src/theme";

const useStyles = makeStyles({
  root: {
    maxWidth: "30vw",
    [theme.breakpoints.only("sm")]: {
      maxWidth: "50vw",
    },
    [theme.breakpoints.only("xs")]: {
      maxWidth: "95vw",
    },
  },
  media: {
    height: 150,
  },
});

export default function AptCard({ apt, onMouseOver }) {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const Auth = new AuthService();

  const searchAddress = () => {
    Auth.fetch(`/api/geocode?lat=${apt.lat}&lng=${apt.lng}`).then((res) => {
      if (res.city) {
        setCity(res.city);
      }
    });
  };

  useEffect(() => {
    searchAddress();
  }, [apt]);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/200/300"
          title={city}
        />
        {apt && (
          <CardContent onMouseOver={onMouseOver}>
            <Typography gutterBottom variant="h5" component="h2">
              {apt.name} {city !== "" ? `at ${city}` : ""}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${apt.room} rooms . ${apt.aptSize}`} m<sup>2</sup>
            </Typography>
            <Typography variant="overline" color="textSecondary" component="p">
              {`U$ ${apt.price}/month`}
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onMouseOver}>
          On Map
        </Button>
        <Button size="small" color="primary" onClick={onMouseOver}>
          Rent Now
        </Button>
      </CardActions>
    </Card>
  );
}
