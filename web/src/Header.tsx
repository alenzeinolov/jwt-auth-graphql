import React from "react";
import { Link } from "react-router-dom";
import { setAccessToken } from "./accessToken";
import { useLogoutMutation } from "./generated/graphql";

const Header: React.FC = () => {
  const [logout, { client }] = useLogoutMutation();

  return (
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

      <button
        onClick={async () => {
          await logout();
          setAccessToken("");
          await client.resetStore();
        }}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
