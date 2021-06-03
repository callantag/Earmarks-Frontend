import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNav from "./components/MainNav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Page404 from "./pages/Page404";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import AdminRoutes from "./components/AdminRoutes";
import UsersEntries from "./pages/UsersEntries";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApplicationProvider from "./contexts/ApplicationContext";

const App = () => {
  return (
    <div className="App">
      <ApplicationProvider>
        <Router>
          <MainNav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dash" component={Dashboard} />
            <Route exact path="/categories" component={Categories} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <AdminRoutes exact path="/dash/allUsers" component={UsersEntries} />
            <Route path="*" component={Page404} />
          </Switch>
        </Router>
      </ApplicationProvider>
    </div>
  );
};

export default App;

// <Route path="/categories" component={Categories} />
