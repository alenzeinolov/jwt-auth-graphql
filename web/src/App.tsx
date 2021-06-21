import React from "react";
import { useHelloQuery } from "./generated/graphql";

const App: React.FC = () => {
  const { loading, data } = useHelloQuery();

  if (loading) {
    return <div>loading...</div>;
  }

  return <div>{data?.hello}</div>;
};

export default App;
