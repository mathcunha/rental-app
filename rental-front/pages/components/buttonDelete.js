import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useRef, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
}));

const ButtonDelete = ({ label, onSubmit, load }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const timer = useRef();
  const handleSubmit = onSubmit;

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
      Router.prefetch("/");
    };
  }, []);

  useEffect(() => {
    setLoading(load);
  }, [load]);

  return (
    <div className={classes.wrapper}>
      <Button
        type="submit"
        fullWidth
        disabled={loading}
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={handleSubmit}
      >
        {label}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

export default ButtonDelete;
