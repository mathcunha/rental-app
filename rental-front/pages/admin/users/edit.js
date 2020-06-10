import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import AuthService from "../../../utils/authService";
import FormControlValidation from "../../../utils/formControlValidation";
import ActionButtons from "../../components/actionButtons";
import { withRouter } from "next/router";
import {
  TextField,
  Paper,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  Tooltip,
} from "@material-ui/core";

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
        Auth.logout();
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

  const toggleRealtor = (e) => {
    if (Auth.getProfile().isAdmin) {
      e.preventDefault();
      setLoading(true);
      setAction("save");
      setError("");
      const link = user._links.self.href.split("/");
      Auth.fetch(
        `${process.env.API_HOST}/user/${link[link.length - 1]}/toggleRealtor`,
        {
          method: "POST",
        }
      )
        .then((res) => {
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setError({ status: err.status, json: "not authorized" });
          setLoading(false);
        });
    }
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

  const isRealtor =
    user &&
    user.authorities &&
    user.authorities.filter(
      (authority) => authority.authority === "ROLE_REALTOR"
    ).length === 1;

  const passwordError = FormControlValidation(error, "password");
  const emailError = FormControlValidation(error, "email");
  const usernameError = FormControlValidation(error, "username");
  const nameError = FormControlValidation(error, "name");

  return (
    <Paper className="paper">
      <Typography component="h1" variant="h5">
        User
      </Typography>
      <Typography component="h1" variant="h5"></Typography>
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
          <Grid item xs={Auth.getProfile().isAdmin ? 8 : 12}>
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
          {Auth.getProfile().isAdmin ? (
            <Grid item xs={4}>
              <Tooltip
                arrow={true}
                title={isRealtor ? "Remove Realtor Role" : "Add Realtor Role"}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={isRealtor}
                      onChange={toggleRealtor}
                      name="realtor"
                    />
                  }
                  label="Realtor"
                />
              </Tooltip>
            </Grid>
          ) : (
            " "
          )}
        </Grid>

        <ActionButtons
          action={action}
          isNew={isNew()}
          onSave={handleSave}
          saveLabel={isNew() ? "Sign Up" : "Update"}
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
