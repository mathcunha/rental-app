import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LayoutAdmin from "../../components/layoutAdmin";
import EditIcon from "@material-ui/icons/Edit";
import AuthService from "../../../utils/authService";
import useSWR from "swr";
import FetcherError from "../../components/fetcherError";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Link from "../../../src/Link";
import { useState } from "react";
import { TextField, Typography, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function UserRow({ row }) {
  const arr = row._links.self.href.split("/");
  const id = arr[arr.length - 1];
  return (
    <TableRow>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.username}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>
        <Link href="/admin/users/[id]" as={`/admin/users/${id}`}>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Link>
      </TableCell>
    </TableRow>
  );
}

const UserList = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const Auth = new AuthService();
  const url =
    Auth.getProfile().isAdmin === true
      ? `${process.env.API_URL}/users/search/findByEmailIgnoreCaseStartingWithAndNameIgnoreCaseStartingWith?name=${name}&email=${email}&sort=name`
      : `${process.env.API_URL}/users/${Auth.getProfile().id}`;

  const { data, error } = useSWR(url, Auth.fetch);

  return (
    <LayoutAdmin>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography component="h1" variant="h6">
            Users
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="input-name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="input-email"
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
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
                data._embedded.users.map((row) => (
                  <UserRow row={row} key={row.name} />
                ))
              ) : (
                <UserRow row={data} />
              )}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </LayoutAdmin>
  );
};

export default UserList;
