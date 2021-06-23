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
import { getAccessToken } from "./accessToken";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
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
  credentials: "include",
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
