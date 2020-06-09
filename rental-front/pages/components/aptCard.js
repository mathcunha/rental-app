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

export default function AptCard({
  apt,
  onMouseOver,
  setOpen,
  onRent,
  label,
  resetSearchFields,
}) {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [img, setImg] = useState({});
  const Auth = new AuthService();

  if (label) {
    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={"https://picsum.photos/200/300"}
        />
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {label}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={(e) => resetSearchFields()}
          >
            Reset Search Filter
          </Button>
        </CardActions>
      </Card>
    );
  }

  const searchAddress = () => {
    Auth.fetch(`/api/image?lat=${apt.lat}&lng=${apt.lng}`).then((res) => {
      if (res.city) {
        setCity(res.city);
        setImg(res.img);
      }
    });
  };

  const handleDescription = (e) => {
    e.preventDefault();
    onMouseOver();
    setOpen(true);
  };

  useEffect(() => {
    searchAddress();
  }, [apt]);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={img ? img.webformatURL : "https://picsum.photos/200/300"}
        title={city}
      />
      <CardActionArea>
        {apt && (
          <CardContent onMouseOver={onMouseOver}>
            <Typography gutterBottom variant="h5" component="h2">
              {apt.name} {city !== "" ? `at ${city}` : ""}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${apt.room} rooms . ${apt.aptSize}`} m<sup>2</sup>
            </Typography>
            <Typography variant="overline" color="textSecondary" component="p">
              {`$${apt.price}/month`}
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onMouseOver}>
          Set Map
        </Button>
        <Button size="small" color="primary" onClick={handleDescription}>
          More Info
        </Button>
        <Button size="small" color="primary" onClick={onRent}>
          Rent
        </Button>
      </CardActions>
    </Card>
  );
}
