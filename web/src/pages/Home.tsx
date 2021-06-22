import React from "react";
import { useUsersQuery } from "../generated/graphql";

const Home: React.FC = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: "network-only" });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Home;
