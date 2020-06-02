import { withRouter } from "next/router";
import AuthService from "./../utils/authService";
import Layout from "./components/layout";
import useSWR from "swr";
import Container from "@material-ui/core/Container";
import EditUser from "./admin/users/edit";
import FetcherError from "./components/fetcherError";

const Profile = ({ router }) => {
  const Auth = new AuthService();
  const url = `${process.env.API_URL}/users/${Auth.getProfile().id}`;

  const { data, error } =
    Auth.getProfile() && Auth.getProfile().id ? useSWR(url, Auth.fetch) : {};

  return (
    <Layout>
      {error ? (
        <FetcherError error={error} />
      ) : !data ? (
        "loading data"
      ) : (
        <Container maxWidth="sm">
          <EditUser user={data} />
        </Container>
      )}
    </Layout>
  );
};

export default withRouter(Profile);
