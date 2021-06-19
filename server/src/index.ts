import "reflect-metadata";
// import { createConnection } from "typeorm";
// import { User } from "./entity/User";
import express from "express";
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

  app.get("/", (_, res) => res.end("test"));
  app.get("/refresh-token", async (req, res) => {
    const refreshToken = req.cookies["jid"];
    if (!refreshToken) {
      return res.json({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.error(err.message);
      return res.json({ ok: false, accessToken: "" });
    }

    const user = await User.findOne(payload.userId);
    if (!user) {
      return res.json({ ok: false, accessToken: "" });
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

  apolloServer.applyMiddleware({ app });

  app.listen(5000, () => {
    console.log("Listening at http://localhost:5000");
  });
};

main();
