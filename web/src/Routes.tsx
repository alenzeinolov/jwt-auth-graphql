import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Me from "./pages/Me";
import Register from "./pages/Register";

const Routes: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/me">Me</Link>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/register">Register</Link>
          </div>
        </header>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/me" component={Me} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
