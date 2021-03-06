import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLoginMutation } from "../generated/graphql";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await login({ variables: { email, password } });

        if (!res || !res.data) return;

        setAccessToken(res.data.login.accessToken);

        history.push("/");
      }}
    >
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
