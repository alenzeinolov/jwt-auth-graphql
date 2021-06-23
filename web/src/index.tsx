import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from "./App";
import { getAccessToken, setAccessToken } from "./accessToken";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
});

const refreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    const { exp } = jwtDecode<{ exp: number }>(token);
    if (Date.now() >= exp * 1000) {
      return false;
    }

    return true;
  },
  fetchAccessToken: async () => {
    return fetch("http://localhost:5000/refresh-token", {
      method: "post",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => setAccessToken(accessToken),
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `bearer ${token}`,
      },
    };
  }
  return {
    headers,
  };
});

const client = new ApolloClient({
  // uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
  link: refreshLink.concat(authLink.concat(httpLink)),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
