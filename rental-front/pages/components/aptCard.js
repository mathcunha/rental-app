import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 140,
  },
});

export default function AptCard({ apt }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/200/300"
          title="Contemplative Reptile"
        />
        {apt && (
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {apt.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${apt.room} rooms . ${apt.size}`} m<sup>2</sup>
            </Typography>
            <Typography variant="overline" color="textSecondary" component="p">
              {`U$ ${apt.price}/month`}
            </Typography>
          </CardContent>
        )}
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Rent Now
        </Button>
      </CardActions>
    </Card>
  );
}
