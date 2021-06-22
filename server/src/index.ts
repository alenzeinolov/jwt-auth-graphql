import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./auth";
import sendRefreshToken from "./sendRefreshToken";

const main = async () => {
  await createConnection();

  const app = express();

  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.get("/", (_, res) => res.end("Testing endpoint"));

  app.get("/refresh-token", async (req, res) => {
    const refreshToken = req.cookies["jid"];
    const errorResponse = { ok: false, accessToken: "" };

    if (!refreshToken) {
      return res.json(errorResponse);
    }

    let payload: any = null;
    try {
      payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.error(err.message);
      return res.json(errorResponse);
    }

    const user = await User.findOne(payload.userId);
    if (!user) {
      return res.json(errorResponse);
    }

    if (payload.tokenVersion !== user.tokenVersion) {
      return res.json(errorResponse);
    }

    sendRefreshToken(res, createRefreshToken(user));
    return res.json({ ok: true, accessToken: createAccessToken(user) });
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(5000, () => {
    console.log("Listening at http://localhost:5000");
  });
};

main();
