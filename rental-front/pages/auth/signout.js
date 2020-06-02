import Layout from "../components/layout";
import AuthService from "../../utils/authService";
import Welcome from "../components/welcome";

const Logout = ({ router }) => {
  const Auth = new AuthService();
  Auth.logout();

  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default Logout;
