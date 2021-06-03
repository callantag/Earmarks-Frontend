import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { ApplicationContext } from "./../contexts/ApplicationContext";

const AdminRoutes = ({ component: Component, ...rest }) => {
  const { user } = useContext(ApplicationContext);

  return (
    <Route
      render={(props) =>
        user.isAdmin ? <Component {...rest} /> : <Redirect to="/login" />
      }
    />
  );
};

export default AdminRoutes;
