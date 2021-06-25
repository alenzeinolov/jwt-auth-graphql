import { Response } from "express";

const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("jid", token, {
    path: "/refresh-token",
    httpOnly: true,
  });
};

export default sendRefreshToken;
