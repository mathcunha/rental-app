import { withRouter } from "next/router";
import AuthService from "../../../utils/authService";
import LayoutAdmin from "../../components/layoutAdmin";
import useSWR from "swr";
import Container from "@material-ui/core/Container";
import EditApt from "./edit";
import FetcherError from "../../components/fetcherError";

const TripGet = ({ router }) => {
  const { id } = router.query;
  const Auth = new AuthService();
  const url = `${process.env.API_URL}/apartments/${id}`;

  const { data, error } = id ? useSWR(url, Auth.fetch) : {};

  return (
    <LayoutAdmin>
      {error ? (
        <FetcherError error={error} />
      ) : !data ? (
        "loading data"
      ) : (
        <Container maxWidth="sm">
          <EditApt apt={data} />
        </Container>
      )}
    </LayoutAdmin>
  );
};

export default withRouter(TripGet);
