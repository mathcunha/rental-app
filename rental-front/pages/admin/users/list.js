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
  const Auth = new AuthService();
  const url =
    Auth.getProfile().isAdmin === true
      ? `${process.env.API_URL}/users`
      : `${process.env.API_URL}/users/${Auth.getProfile().id}`;

  const { data, error } = useSWR(url, Auth.fetch);

  return (
    <LayoutAdmin>
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
