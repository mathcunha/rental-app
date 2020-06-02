import { withRouter } from "next/router";

const FetcherError = ({ router, error, redirect }) => {
  if (error && error.status === 403) {
    router.push("/auth/signin");
  } else if (error && error.status === 404) {
    router.back();
  }
  return <td>{error && error.name}</td>;
};

export default withRouter(FetcherError);
