import React, { useState } from "react";
import { useEffect } from "react";
import { setAccessToken } from "./accessToken";
import Routes from "./Routes";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      const res = await fetch("http://localhost:5000/refresh-token", {
        method: "post",
        credentials: "include",
      });
      const { accessToken } = await res.json();
      setAccessToken(accessToken);
      setLoading(false);
    };
    refreshToken();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Routes />;
};

export default App;
