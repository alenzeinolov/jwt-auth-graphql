import { Response } from "express";

const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
  });
};

export default sendRefreshToken;
