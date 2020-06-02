import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import useSWR from "swr";
import AuthService from "../../utils/authService";

const DestinationSelect = ({ value, onChange, error, helperText }) => {
  const Auth = new AuthService();
  const url = `${process.env.API_URL}/destinations/`;

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
      <InputLabel id="demo-controlled-open-select-label">
        Destination
      </InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        error={error}
        variant="outlined"
        onClose={handleClose}
        onOpen={handleOpen}
        value={value}
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
          data._embedded.destinations.map((row) => (
            <MenuItem key={row.name} value={row._links.self.href}>
              {row.name}
            </MenuItem>
          ))
        ) : (
          ""
        )}
      </Select>
    </FormControl>
  );
};

export default DestinationSelect;
