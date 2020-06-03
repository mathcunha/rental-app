import EditApt from "./edit";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LayoutAdmin from "../../components/layoutAdmin";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const NewApt = () => {
  const classes = useStyles();
  return (
    <LayoutAdmin>
      <Container maxWidth="sm">
        <EditApt />
      </Container>
    </LayoutAdmin>
  );
};

export default NewApt;
