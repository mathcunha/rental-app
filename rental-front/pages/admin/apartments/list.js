import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LayoutAdmin from "../../components/layoutAdmin";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AuthService from "../../../utils/authService";
import useSWR from "swr";
import FetcherError from "../../components/fetcherError";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "../../../src/Link";
import { useState } from "react";
import UserSelect from "../../components/userSelect";
import { TablePagination } from "@material-ui/core";

function AptRow({ row }) {
  const arr = row._links.self.href.split("/");
  const id = arr[arr.length - 1];

  return (
    <TableRow>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.aptSize}</TableCell>
      <TableCell>{row.price}</TableCell>
      <TableCell>{row.available === true ? "true" : "false"}</TableCell>
      <TableCell>
        <Link href="/admin/apartments/[id]" as={`/admin/apartments/${id}`}>
          <Tooltip title="Edit">
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Link>
      </TableCell>
    </TableRow>
  );
}

const TripList = () => {
  const [aptSize, setAptSize] = useState(0);
  const [price, setPrice] = useState(0);
  const [room, setRoom] = useState(0);
  const [user, setUser] = useState("");
  const Auth = new AuthService();
  const [size, setSize] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterURI = () => {
    let uri = "";
    if (Auth.getProfile().isAdmin === true) {
      if (user !== "") {
        const arr = user.split("/");
        uri += `&userId=${arr[arr.length - 1]}`;
      }
    } else {
      uri += `&userId=${Auth.getProfile().id}`;
    }

    if (price !== "") {
      uri += "&price=" + price;
    }
    if (room !== "") {
      uri += "&room=" + room;
    }
    if (aptSize !== "") {
      uri += "&aptSize=" + aptSize;
    }

    return uri;
  };

  const url = `${
    process.env.API_URL
  }/apartments/search/filter?size=${size}&page=${page}&sort=name${filterURI()}`;
  const { data, error } = Auth.getProfile() && useSWR(url, Auth.fetch);

  return (
    <LayoutAdmin>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4}>
          <Typography component="h1" variant="h6">
            Apartments
            <Link href="/admin/apartments/new">
              <Tooltip title="New">
                <IconButton aria-label="new">
                  <AddBoxIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={6} sm={2}>
          <UserSelect onChange={(e) => setUser(e.target.value)} value={user} />
        </Grid>
        <Grid item xs={3} sm={2}>
          <TextField
            id="input-size"
            label="Size"
            type="number"
            value={aptSize}
            onChange={(e) => setAptSize(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={3} sm={2}>
          <TextField
            id="input-price"
            label="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={3} sm={2}>
          <TextField
            id="input-room"
            label="Room"
            type="number"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Paper className="paper">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Floor Area</TableCell>
                <TableCell>Price per Month</TableCell>
                <TableCell>Available</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {error ? (
                <TableRow>
                  <FetcherError error={error} />
                </TableRow>
              ) : !data ? (
                <TableRow>
                  <TableCell>"loading data"</TableCell>
                </TableRow>
              ) : data._embedded ? (
                data._embedded.apartments.map((row) => (
                  <AptRow row={row} key={row._links.self.href} />
                ))
              ) : (
                <UserRow row={data} />
              )}
            </TableBody>
          </Table>
          {data && data.page ? (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.page.totalElements}
              rowsPerPage={size}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          ) : (
            ""
          )}
        </Paper>
      </Grid>
    </LayoutAdmin>
  );
};

export default TripList;
