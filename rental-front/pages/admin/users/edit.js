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

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

const EditUser = ({ user, router }) => {
  const Auth = new AuthService();
  const classes = useStyles();
  const [endpoint, setEndpoint] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const isNew = () => {
    return endpoint === "";
  };

  useEffect(() => {
    if (user && user._links) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setUsername(user.username);
      setEndpoint(user._links.self.href);
    }
  }, [user]);

  const handleChange = (input) => (e) => {
    switch (input) {
      case "password":
        setPassword(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "name":
        setName(e.target.value);
        break;
      default:
        break;
    }
  };

  const getData = () => {
    return {
      name: name,
      username: username,
      password: password,
      email: email,
      endpoint: endpoint,
    };
  };

  const handleDelete = (e) => {
    setAction("delete");
    setLoading(true);
    Auth.delete(endpoint)
      .then((res) => {
        router.push("/admin/users/list");
      })
      .catch((err) => {
        setError({ status: err.status, json: "error deleting resource" });
        setLoading(false);
      });
  };

  const handleSuccess = (e) => {
    router.push("/admin/users/list");
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setAction("save");
    setError("");

    Auth.save("users", getData())
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

  const passwordError = FormControlValidation(error, "password");
  const emailError = FormControlValidation(error, "email");
  const usernameError = FormControlValidation(error, "username");
  const nameError = FormControlValidation(error, "name");

  return (
    <Paper className="paper">
      <Typography component="h1" variant="h5">
        User
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              error={nameError != ""}
              helperText={nameError}
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              value={name}
              onChange={handleChange("name")}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              error={usernameError != ""}
              helperText={usernameError}
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="lname"
              value={username}
              onChange={handleChange("username")}
              InputProps={{
                readOnly: !isNew(),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={emailError != ""}
              helperText={emailError}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleChange("email")}
              InputProps={{
                readOnly: !isNew(),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={passwordError != ""}
              helperText={passwordError}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange("password")}
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

export default withRouter(EditUser);
