import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import useSWR from "swr";
import AuthService from "../../utils/authService";

const UserSelect = ({ value, onChange, error }) => {
  const Auth = new AuthService();
  const url =
    Auth.getProfile().isRealtor === true
      ? `${process.env.API_URL}/users`
      : `${process.env.API_URL}/users/${Auth.getProfile().id}`;

  const [open, setOpen] = React.useState(false);
  const { data, swrError } = useSWR(url, Auth.fetch);

  const handleChange = onChange;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-controlled-open-select-label">User</InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        error={error}
        value={value}
        onClose={handleClose}
        onOpen={handleOpen}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {!data ? (
          <MenuItem value="loading">
            <em>Loading</em>
          </MenuItem>
        ) : data._embedded ? (
          data._embedded.users.map((row) => (
            <MenuItem key={row.name} value={row._links.self.href}>
              {row.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem key={data.name} value={data._links.self.href}>
            {data.name}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default UserSelect;
