import { withRouter } from "next/router";
import AuthService from "../../../utils/authService";
import LayoutAdmin from "../../components/layoutAdmin";
import useSWR from "swr";
import Container from "@material-ui/core/Container";
import EditUser from "./edit";
import FetcherError from "../../components/fetcherError";

const UserGet = ({ router }) => {
  const { id } = router.query;
  const Auth = new AuthService();
  const url = `${process.env.API_URL}/users/${id}`;

  const { data, error } = id ? useSWR(url, Auth.fetch) : {};

  return (
    <LayoutAdmin>
      {error ? (
        <FetcherError error={error} />
      ) : !data ? (
        "loading data"
      ) : (
        <Container maxWidth="sm">
          <EditUser user={data} />
        </Container>
      )}
    </LayoutAdmin>
  );
};

export default withRouter(UserGet);
