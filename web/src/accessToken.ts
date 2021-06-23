let accessToken = "";

export const setAccessToken = (token: string) => {
  console.log(token);
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};
