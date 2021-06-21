import { gql, useQuery } from "@apollo/client";
import React from "react";

const App: React.FC = () => {
  const { loading, data } = useQuery(gql`
    {
      hello
    }
  `);

  if (loading) {
    return <div>loading...</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default App;
